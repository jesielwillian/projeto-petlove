import crypto from "node:crypto";

const COOKIE = process.env.ADMIN_COOKIE_NAME || "petlove_admin";
const DAY = 24 * 60 * 60 * 1000;

function json(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  res.end(JSON.stringify(body));
}
function fail(res, status, error) {
  return json(res, status, { error });
}
function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}
function scrypt(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}
function equal(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
function cookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || "")
      .split(";")
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => {
        const i = x.indexOf("=");
        return i < 0
          ? [x, ""]
          : [x.slice(0, i), decodeURIComponent(x.slice(i + 1))];
      }),
  );
}
async function body(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}
function config() {
  const url = String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "";
  if (!url || !key)
    throw new Error(
      "Configure SUPABASE_URL e SUPABASE_SECRET_KEY nas variáveis da Vercel.",
    );
  return { url, key };
}
async function db(table, { method = "GET", query = "", data, prefer } = {}) {
  const { url, key } = config();
  const response = await fetch(
    `${url}/rest/v1/${table}${query ? `?${query}` : ""}`,
    {
      method,
      headers: {
        apikey: key,
        ...(key.startsWith("sb_secret_")
          ? {}
          : { Authorization: `Bearer ${key}` }),
        "Content-Type": "application/json",
        ...(prefer ? { Prefer: prefer } : {}),
      },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
    },
  );
  const raw = await response.text();
  let parsed = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = raw;
  }
  if (!response.ok) {
    const message =
      parsed?.message ||
      parsed?.hint ||
      parsed?.error ||
      `Falha Supabase (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return parsed;
}
async function ensureAdmin(email, password) {
  const rows = await db("admins", {
    query: `select=id,email,password_hash&email=eq.${encodeURIComponent(email)}&limit=1`,
  });
  if (rows?.length) return rows[0];
  const configuredEmail = String(process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const configuredPassword = String(process.env.ADMIN_PASSWORD || "");
  if (
    !configuredEmail ||
    !configuredPassword ||
    email !== configuredEmail ||
    !equal(password, configuredPassword)
  )
    return null;
  const salt = crypto.randomBytes(16).toString("hex");
  const password_hash = `${salt}:${scrypt(password, salt)}`;
  const inserted = await db("admins", {
    method: "POST",
    query: "select=id,email,password_hash",
    data: { email, password_hash },
    prefer: "return=representation",
  });
  return inserted?.[0] || null;
}
async function authenticate(req) {
  const token = cookies(req)[COOKIE];
  if (!token) return null;
  const sessions = await db("admin_sessions", {
    query: `select=admin_id,expires_at&token_hash=eq.${hash(token)}&limit=1`,
  });
  const session = sessions?.[0];
  if (!session || Date.parse(session.expires_at) <= Date.now()) {
    if (session)
      await db("admin_sessions", {
        method: "DELETE",
        query: `token_hash=eq.${hash(token)}`,
      });
    return null;
  }
  const admins = await db("admins", {
    query: `select=id,email&id=eq.${session.admin_id}&limit=1`,
  });
  return admins?.[0] || null;
}
const orderShape = (o) => ({
  ...o,
  customer:
    typeof o.customer === "string" ? JSON.parse(o.customer) : o.customer,
  address: typeof o.address === "string" ? JSON.parse(o.address) : o.address,
  items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
});

function normalizeProduct(input) {
  const name = String(input.name || "").trim();
  const cat = String(input.cat || "").trim();
  const pet = String(input.pet || "").trim();
  const img = String(input.img || "").trim();
  const price = Number(input.price);
  const old = input.old === "" || input.old == null ? null : Number(input.old);
  const stock = input.stock === "" || input.stock == null ? null : Number(input.stock);
  if (!name || !cat || !pet || !img || !Number.isFinite(price) || price < 0)
    throw Object.assign(new Error("Preencha nome, categoria, público, imagem e um preço válido."), { status: 400 });
  if (old !== null && (!Number.isFinite(old) || old < 0))
    throw Object.assign(new Error("Preço anterior inválido."), { status: 400 });
  if (stock !== null && (!Number.isInteger(stock) || stock < 0))
    throw Object.assign(new Error("Estoque deve ser um número inteiro não negativo."), { status: 400 });
  return {
    name, cat, pet, price, old, stock,
    sku: String(input.sku || "").trim() || null,
    description: String(input.desc || input.description || ""),
    tag: String(input.tag || "").trim() || null,
    img,
    specs: input.specs && typeof input.specs === "object" ? input.specs : {},
    featured: Boolean(input.featured),
    active: input.active !== false,
  };
}

export default async function handler(req, res) {
  const path =
    new URL(req.url || "/", "https://vercel.invalid").pathname.replace(
      /^\/api/,
      "",
    ) || "/";
  const method = String(req.method || "GET").toUpperCase();
  try {
    if (path === "/health" && method === "GET")
      return json(res, 200, { ok: true, backend: "supabase" });
    // Rotas públicas dos formulários: gravam no Supabase sem exigir sessão admin.
    if (path === "/contact" && method === "POST") {
      const input = await body(req);
      const name = String(input.name || "").trim();
      const email = String(input.email || "")
        .trim()
        .toLowerCase();
      const subject = String(input.subject || "Contato pelo site").trim();
      const message = String(input.message || "").trim();
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message)
        return fail(res, 400, "Preencha nome, e-mail válido e mensagem.");
      if (
        name.length > 120 ||
        email.length > 254 ||
        subject.length > 180 ||
        message.length > 5000
      )
        return fail(res, 400, "Algum campo ultrapassou o limite permitido.");
      const saved = await db("contacts", {
        method: "POST",
        query: "select=id,created_at",
        data: { name, email, subject, message },
        prefer: "return=representation",
      });
      return json(res, 201, { ok: true, contact: saved?.[0] || null });
    }
    if (path === "/newsletter" && method === "POST") {
      const input = await body(req);
      const email = String(input.email || "")
        .trim()
        .toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
        return fail(res, 400, "Informe um e-mail válido.");
      await db("subscribers", {
        method: "POST",
        query: "on_conflict=email",
        data: { email },
        prefer: "resolution=ignore-duplicates,return=minimal",
      });
      return json(res, 201, { ok: true, message: "Inscrição registrada." });
    }
    if (path === "/bookings" && method === "POST") {
      const input = await body(req);
      const booking = {
        name: String(input.name || "").trim(),
        email: String(input.email || "")
          .trim()
          .toLowerCase(),
        phone: String(input.phone || "").trim(),
        pet: String(input.pet || "").trim(),
        service: String(input.service || "").trim(),
        date: String(input.date || "").trim(),
        slot: String(input.slot || "").trim(),
        status: "requested",
      };
      if (
        !booking.name ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email) ||
        !booking.phone ||
        !booking.pet ||
        !booking.service ||
        !/^\d{4}-\d{2}-\d{2}$/.test(booking.date) ||
        !/^\d{2}:\d{2}$/.test(booking.slot)
      )
        return fail(
          res,
          400,
          "Confira os dados e escolha uma data e horário válidos.",
        );
      const saved = await db("bookings", {
        method: "POST",
        query: "select=*",
        data: booking,
        prefer: "return=representation",
      });
      return json(res, 201, { ok: true, booking: saved?.[0] || null });
    }
    if (path === "/admin/login" && method === "POST") {
      const input = await body(req);
      const email = String(input.email || "")
        .trim()
        .toLowerCase();
      const password = String(input.password || "");
      if (!email || !password) return fail(res, 400, "Informe e-mail e senha.");
      const admin = await ensureAdmin(email, password);
      if (!admin)
        return fail(
          res,
          401,
          "E-mail ou senha inválidos. Confira ADMIN_EMAIL e ADMIN_PASSWORD na Vercel.",
        );
      const [salt, stored] = String(admin.password_hash || "").split(":");
      if (!salt || !stored || !equal(scrypt(password, salt), stored))
        return fail(res, 401, "E-mail ou senha inválidos.");
      const token = crypto.randomBytes(32).toString("base64url");
      const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      await db("admin_sessions", {
        method: "POST",
        data: {
          token_hash: hash(token),
          admin_id: admin.id,
          expires_at: expires,
        },
        prefer: "return=minimal",
      });
      return json(
        res,
        200,
        { ok: true, admin: { email: admin.email } },
        {
          "Set-Cookie": `${COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200; Secure`,
        },
      );
    }
    if (path === "/admin/logout" && method === "POST") {
      const token = cookies(req)[COOKIE];
      if (token)
        await db("admin_sessions", {
          method: "DELETE",
          query: `token_hash=eq.${hash(token)}`,
        });
      return json(
        res,
        200,
        { ok: true },
        {
          "Set-Cookie": `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0; Secure`,
        },
      );
    }
    if (!path.startsWith("/admin/"))
      return fail(res, 404, "Rota não encontrada.");
    const admin = await authenticate(req);
    if (!admin)
      return fail(
        res,
        401,
        "Sessão administrativa necessária. Entre novamente.",
      );

    if (path === "/admin/me" && method === "GET")
      return json(res, 200, { admin: { email: admin.email } });
    if (path === "/admin/dashboard" && method === "GET") {
      const orders = (
        (await db("orders", {
          query: "select=*&order=created_at.desc&limit=1000",
        })) || []
      ).map(orderShape);
      const paid = orders.filter((o) => o.payment_status === "paid");
      const customers = new Set(
        orders.map((o) => o.customer?.email).filter(Boolean),
      );
      const daily = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - (6 - i));
        const key = d.toISOString().slice(0, 10);
        const dayOrders = orders.filter(
          (o) => String(o.created_at || "").slice(0, 10) === key,
        );
        return {
          day: key,
          orders: dayOrders.length,
          revenue: dayOrders
            .filter((o) => o.payment_status === "paid")
            .reduce((n, o) => n + Number(o.total || 0), 0),
        };
      });
      return json(res, 200, {
        stats: {
          orders: orders.length,
          pending: orders.filter((o) => o.payment_status === "pending").length,
          processing: orders.filter((o) =>
            ["received", "processing"].includes(o.fulfillment_status),
          ).length,
          customers: customers.size,
          revenue: paid.reduce((n, o) => n + Number(o.total || 0), 0),
        },
        recent: orders.slice(0, 8),
        daily,
      });
    }
    if (path === "/admin/products" && method === "GET") {
      const products = await db("products", {
        query: "select=*&order=featured.desc,id.desc",
      });
      return json(res, 200, {
        products: (products || []).map((p) => ({
          ...p,
          desc: p.description,
          specs: p.specs || {},
          featured: Boolean(p.featured),
          active: Boolean(p.active),
        })),
      });
    }
    if (path === "/admin/products" && method === "POST") {
      const input = await body(req);
      const product = normalizeProduct(input);
      const saved = await db("products", {
        method: "POST",
        query: "select=*",
        data: product,
        prefer: "return=representation",
      });
      return json(res, 201, { product: saved?.[0] || null });
    }
    const productMatch = path.match(/^\/admin\/products\/(\d+)$/);
    if (productMatch && method === "PATCH") {
      const input = await body(req);
      const product = normalizeProduct(input);
      const saved = await db("products", {
        method: "PATCH",
        query: `id=eq.${productMatch[1]}&select=*`,
        data: { ...product, updated_at: new Date().toISOString() },
        prefer: "return=representation",
      });
      if (!saved?.length) return fail(res, 404, "Produto não encontrado.");
      return json(res, 200, { product: saved[0] });
    }
    if (productMatch && method === "DELETE") {
      await db("products", {
        method: "DELETE",
        query: `id=eq.${productMatch[1]}`,
      });
      return json(res, 200, { ok: true });
    }
    if (path === "/admin/orders" && method === "GET") {
      const u = new URL(req.url, "https://vercel.invalid");
      const q = (u.searchParams.get("q") || "").toLowerCase();
      const status = u.searchParams.get("status") || "";
      const archive = u.searchParams.get("archive") || "active";
      let orders = (
        (await db("orders", {
          query: "select=*&order=created_at.desc&limit=1000",
        })) || []
      ).map(orderShape);
      orders = orders.filter(
        (o) =>
          archive === "all" ||
          (archive === "archived" ? Boolean(o.archived_at) : !o.archived_at),
      );
      if (q)
        orders = orders.filter((o) =>
          `${o.code} ${o.customer?.name || ""} ${o.customer?.email || ""}`
            .toLowerCase()
            .includes(q),
        );
      if (status)
        orders = orders.filter(
          (o) => o.fulfillment_status === status || o.payment_status === status,
        );
      for (const key of ["from", "to"]) {
        const value = u.searchParams.get(key);
        if (value)
          orders = orders.filter((o) =>
            key === "from"
              ? String(o.created_at) >= value
              : String(o.created_at).slice(0, 10) <= value,
          );
      }
      return json(res, 200, { orders });
    }
    if (path === "/admin/bookings" && method === "GET")
      return json(res, 200, {
        bookings:
          (await db("bookings", {
            query: "select=*&order=date.desc,slot.desc&limit=300",
          })) || [],
      });
    const bookingMatch = path.match(/^\/admin\/bookings\/(\d+)$/);
    if (bookingMatch && method === "PATCH") {
      const input = await body(req);
      const status = String(input.status || "");
      if (!["requested", "confirmed", "completed", "cancelled"].includes(status))
        return fail(res, 400, "Status de agendamento inválido.");
      const saved = await db("bookings", {
        method: "PATCH",
        query: `id=eq.${bookingMatch[1]}&select=*`,
        data: { status },
        prefer: "return=representation",
      });
      if (!saved?.length) return fail(res, 404, "Agendamento não encontrado.");
      return json(res, 200, { booking: saved[0] });
    }
    if (bookingMatch && method === "DELETE") {
      const deleted = await db("bookings", {
        method: "DELETE",
        query: `id=eq.${bookingMatch[1]}&select=id`,
        prefer: "return=representation",
      });
      if (!deleted?.length) return fail(res, 404, "Agendamento não encontrado.");
      return json(res, 200, { ok: true });
    }
    if (path === "/admin/contacts" && method === "GET") {
      const [contacts, subscribers] = await Promise.all([
        db("contacts", { query: "select=*&order=created_at.desc&limit=300" }),
        db("subscribers", {
          query: "select=*&order=created_at.desc&limit=300",
        }),
      ]);
      return json(res, 200, {
        contacts: contacts || [],
        subscribers: subscribers || [],
      });
    }
    return fail(
      res,
      501,
      "Esta ação de edição não está habilitada nesta versão de protótipo. A visualização do painel está disponível.",
    );
  } catch (error) {
    console.error("PetLove API:", error);
    return fail(
      res,
      error.status || 500,
      error.message || "Erro interno da API.",
    );
  }
}

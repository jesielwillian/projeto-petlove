(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const money = (n) =>
    Number(n || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  const date = (v) => (v ? new Date(v).toLocaleDateString("pt-BR") : "—");
  const dateTime = (v) => (v ? new Date(v).toLocaleString("pt-BR") : "—");
  const esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const labels = {
    received: "Recebido",
    processing: "Em separação",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
    pending: "Pendente",
    paid: "Pago",
    failed: "Falhou",
    refunded: "Reembolsado",
    requested: "Solicitado",
    confirmed: "Confirmado",
    completed: "Concluído",
  };
  const state = { orders: [], products: [], current: null };
  let toastTimer;

  function enhanceSelects(root = document) {
    $$("select:not([data-customized])", root).forEach((select) => {
      select.dataset.customized = "true";
      const wrap = document.createElement("div");
      wrap.className = "select-pro";
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "select-pro-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      const menu = document.createElement("div");
      menu.className = "select-pro-menu";
      menu.setAttribute("role", "listbox");
      const sync = () => {
        const opt = select.options[select.selectedIndex];
        trigger.innerHTML = `<span>${esc(opt?.textContent || "Selecione")}</span><i class="fa-solid fa-chevron-down"></i>`;
        [...menu.children].forEach((item, i) =>
          item.classList.toggle(
            "selected",
            select.options[i]?.value === select.value,
          ),
        );
      };
      [...select.options].forEach((opt) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "select-pro-option";
        item.textContent = opt.textContent;
        item.setAttribute("role", "option");
        item.setAttribute("aria-selected", String(opt.selected));
        item.addEventListener("click", () => {
          select.value = opt.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          sync();
          wrap.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
        });
        menu.append(item);
      });
      select.insertAdjacentElement("afterend", wrap);
      wrap.append(trigger, menu);
      wrap.append(select);
      select.classList.add("select-pro-native");
      trigger.addEventListener("click", () => {
        const open = wrap.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(open));
        $$(".select-pro.open").forEach((other) => {
          if (other !== wrap) {
            other.classList.remove("open");
            $(".select-pro-trigger", other)?.setAttribute(
              "aria-expanded",
              "false",
            );
          }
        });
      });
      select.addEventListener("change", sync);
      sync();
    });
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select-pro"))
      $$(".select-pro.open").forEach((x) => {
        x.classList.remove("open");
        $(".select-pro-trigger", x)?.setAttribute("aria-expanded", "false");
      });
  });

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }
  async function api(path, options = {}) {
    const r = await fetch("/api" + path, {
      credentials: "same-origin",
      cache: "no-store",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || "Falha ao comunicar com o servidor.");
    return d;
  }
  function pill(status) {
    return `<span class="pill ${esc(status)}">${esc(labels[status] || status || "—")}</span>`;
  }
  function showApp(email) {
    $("#login-view").classList.add("hidden");
    $("#app").classList.remove("hidden");
    $("#admin-email").textContent = email || "Administrador";
    $("#today").textContent = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "full",
    }).format(new Date());
    loadDashboard();
  }
  function showLogin() {
    $("#app").classList.add("hidden");
    $("#login-view").classList.remove("hidden");
  }
  function navigate(page) {
    $$(".page").forEach((x) => x.classList.add("hidden"));
    $("#page-" + page)?.classList.remove("hidden");
    $$(".nav-item").forEach((x) =>
      x.classList.toggle("active", x.dataset.page === page),
    );
    const names = {
      overview: "Visão geral",
      orders: "Pedidos",
      bookings: "Agendamentos",
      contacts: "Mensagens",
      products: "Produtos",
    };
    $("#page-title").textContent = names[page];
    $("#page-crumb").textContent = names[page].toUpperCase();
    if (page === "orders") loadOrders();
    if (page === "bookings") loadBookings();
    if (page === "contacts") loadContacts();
    if (page === "products") loadProducts();
  }
  async function loadDashboard() {
    try {
      const d = await api("/admin/dashboard");
      const s = d.stats;
      $("#stat-revenue").textContent = money(s.revenue);
      $("#stat-orders").textContent = s.orders;
      $("#stat-pending").textContent = s.pending;
      $("#stat-customers").textContent = s.customers;
      $("#nav-orders").textContent = s.orders;
      renderRecent(d.recent);
      renderChart(d.daily);
    } catch (e) {
      toast(e.message);
    }
  }
  function renderRecent(rows) {
    $("#recent-orders").innerHTML = rows.length
      ? rows
          .map(
            (o) =>
              `<tr><td><span class="order-code">${esc(o.code)}</span></td><td><div class="customer-cell"><b>${esc(o.customer.name)}</b><small>${esc(o.customer.email)}</small></div></td><td>${date(o.created_at)}</td><td class="money">${money(o.total)}</td><td>${pill(o.payment_status)}</td><td>${pill(o.fulfillment_status)}</td></tr>`,
          )
          .join("")
      : '<tr><td colspan="6" class="empty">Nenhum pedido registrado ainda.</td></tr>';
  }
  function renderChart(rows) {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - 6 + i);
      return d.toISOString().slice(0, 10);
    });
    const data = days.map(
      (day) =>
        rows.find((x) => x.day === day) || { day, orders: 0, revenue: 0 },
    );
    const max = Math.max(1, ...data.map((x) => x.orders));
    $("#chart").innerHTML = data
      .map(
        (x) =>
          `<div class="bar-col"><em>${x.orders}</em><div class="bar" style="height:${Math.max(3, (x.orders / max) * 125)}px" title="${x.orders} pedido(s) · ${money(x.revenue)}"></div><small>${new Date(x.day + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}</small></div>`,
      )
      .join("");
  }
  async function loadOrders() {
    const refresh = $("#refresh-orders");
    if (refresh) refresh.disabled = true;
    try {
      const params = new URLSearchParams({
        q: $("#order-search").value.trim(),
        status: $("#order-filter").value,
        archive: $("#order-archive-filter").value,
        from: $("#order-date-from").value,
        to: $("#order-date-to").value,
      });
      const d = await api(`/admin/orders?${params}`);
      state.orders = d.orders;
      $("#orders-table").innerHTML = d.orders.length
        ? d.orders
            .map(
              (o) =>
                `<tr><td><span class="order-code">${esc(o.code)}</span>${o.archived_at ? '<small class="muted">Arquivado</small>' : ""}</td><td><div class="customer-cell"><b>${esc(o.customer.name)}</b><small>${esc(o.customer.email)}</small></div></td><td>${date(o.created_at)}</td><td>${o.items.reduce((n, x) => n + x.quantity, 0)} item(ns)</td><td class="money">${money(o.total)}</td><td>${pill(o.payment_status)}</td><td>${pill(o.fulfillment_status)}</td><td class="order-actions"><button class="text-button" data-order="${esc(o.code)}"><i class="fa-regular fa-eye"></i> Detalhes</button><button class="text-button" data-archive-order="${esc(o.code)}" data-archived="${o.archived_at ? "true" : "false"}"><i class="fa-solid fa-box-archive"></i> ${o.archived_at ? "Restaurar" : "Arquivar"}</button><button class="text-button danger-text" data-delete-order="${esc(o.code)}"><i class="fa-regular fa-trash-can"></i> Excluir</button></td></tr>`,
            )
            .join("")
        : '<tr><td colspan="8" class="empty">Nenhum pedido encontrado com esses filtros.</td></tr>';
      enhanceSelects($("#orders-table"));
    } catch (e) {
      toast(e.message);
    } finally {
      if (refresh) refresh.disabled = false;
    }
  }
  function orderDetail(o) {
    state.current = o;
    const addr = o.address;
    $("#order-detail").innerHTML =
      `<div class="detail-head"><span class="eyebrow">DETALHES DA COMPRA</span><h2>Pedido ${esc(o.code)}</h2><div>${pill(o.payment_status)}　${pill(o.fulfillment_status)} <small style="color:#98a49c">· ${dateTime(o.created_at)}</small></div></div><div class="detail-grid"><div class="detail-block"><h4>CLIENTE</h4><p><b>${esc(o.customer.name)}</b><br>${esc(o.customer.email)}<br>${esc(o.customer.phone)}${o.customer.cpf ? "<br>CPF: " + esc(o.customer.cpf) : ""}</p></div><div class="detail-block"><h4>ENDEREÇO DE ENTREGA</h4><p>${esc(addr.street)}, ${esc(addr.number)} ${esc(addr.comp || "")}<br>${esc(addr.district)} · ${esc(addr.city)}<br>CEP ${esc(addr.cep)}</p></div></div><div class="detail-block"><h4>ITENS DO PEDIDO</h4><table class="detail-items"><tbody>${o.items.map((i) => `<tr><td>${esc(i.name)} × ${i.quantity}</td><td style="text-align:right">${money(i.lineTotal)}</td></tr>`).join("")}<tr><td>Subtotal</td><td style="text-align:right">${money(o.subtotal)}</td></tr><tr><td>Descontos</td><td style="text-align:right">− ${money(o.discount)}</td></tr><tr><td>Frete</td><td style="text-align:right">${money(o.shipping)}</td></tr><tr><td><b>Total</b></td><td style="text-align:right"><b>${money(o.total)}</b></td></tr></tbody></table></div><div class="detail-block"><h4>ATUALIZAR PEDIDO</h4><div class="edit-grid"><div class="field"><label for="edit-fulfillment">STATUS DA ENTREGA</label><select id="edit-fulfillment">${[
        ["received", "Recebido"],
        ["processing", "Em separação"],
        ["shipped", "Enviado"],
        ["delivered", "Entregue"],
        ["cancelled", "Cancelado"],
      ]
        .map(
          ([v, l]) =>
            `<option value="${v}" ${o.fulfillment_status === v ? "selected" : ""}>${l}</option>`,
        )
        .join(
          "",
        )}</select></div><div class="field"><label for="edit-payment">STATUS DO PAGAMENTO</label><select id="edit-payment">${[
        ["pending", "Pendente"],
        ["paid", "Pago"],
        ["failed", "Falhou"],
        ["refunded", "Reembolsado"],
      ]
        .map(
          ([v, l]) =>
            `<option value="${v}" ${o.payment_status === v ? "selected" : ""}>${l}</option>`,
        )
        .join(
          "",
        )}</select></div><div class="field" style="grid-column:1/-1"><label for="edit-tracking">CÓDIGO DE RASTREIO</label><input id="edit-tracking" value="${esc(o.tracking_code || "")}" placeholder="Informe o código da transportadora"></div></div><div class="edit-actions"><button id="save-order" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Salvar alterações</button></div></div>`;
    $("#order-dialog").showModal();
    enhanceSelects($("#order-detail"));
    $("#save-order").onclick = saveOrder;
  }
  async function saveOrder() {
    const o = state.current;
    const btn = $("#save-order");
    btn.disabled = true;
    try {
      await api(`/admin/orders/${encodeURIComponent(o.code)}`, {
        method: "PATCH",
        body: JSON.stringify({
          fulfillmentStatus: $("#edit-fulfillment").value,
          paymentStatus: $("#edit-payment").value,
          trackingCode: $("#edit-tracking").value,
        }),
      });
      $("#order-dialog").close();
      toast("Pedido atualizado e rastreamento sincronizado.");
      loadOrders();
      loadDashboard();
    } catch (e) {
      toast(e.message);
    } finally {
      btn.disabled = false;
    }
  }
  async function loadBookings() {
    const refresh = $("#refresh-bookings");
    if (refresh) refresh.disabled = true;
    try {
      const d = await api("/admin/bookings");
      $("#bookings-table").innerHTML = d.bookings.length
        ? d.bookings
            .map(
              (b) =>
                `<tr><td><div class="customer-cell"><b>${esc(b.name)}</b><small>${esc(b.email)} · ${esc(b.phone)}</small></div></td><td>${esc(b.pet)}</td><td>${esc(b.service)}</td><td>${date(b.date)}</td><td>${esc(b.slot)}</td><td>${pill(b.status)}</td><td class="booking-actions"><div class="booking-action-group"><select data-booking="${b.id}" aria-label="Status do agendamento"><option value="requested" ${b.status === "requested" ? "selected" : ""}>Solicitado</option><option value="confirmed" ${b.status === "confirmed" ? "selected" : ""}>Confirmado</option><option value="completed" ${b.status === "completed" ? "selected" : ""}>Concluído</option><option value="cancelled" ${b.status === "cancelled" ? "selected" : ""}>Cancelado</option></select><button type="button" class="text-button danger-text booking-delete-button" data-delete-booking="${b.id}" aria-label="Excluir agendamento de ${esc(b.name)}" title="Excluir agendamento"><i class="fa-regular fa-trash-can" aria-hidden="true"></i></button></div></td></tr>`,
            )
            .join("")
        : '<tr><td colspan="7" class="empty">Nenhum agendamento encontrado.</td></tr>';
      enhanceSelects($("#bookings-table"));
    } catch (e) {
      toast(e.message);
    } finally {
      if (refresh) refresh.disabled = false;
    }
  }
  async function loadContacts() {
    try {
      const d = await api("/admin/contacts");
      const contacts = (d.contacts || []).map((c) => ({
        kind: "contact",
        date: c.created_at,
        html: `<article class="message"><div><span class="message-origin">Formulário do site</span><h4>${esc(c.subject || "Contato pelo site")}</h4><small>${esc(c.name)} · ${esc(c.email)} · ${dateTime(c.created_at)}</small><p>${esc(c.message)}</p></div><a href="mailto:${encodeURIComponent(c.email)}?subject=${encodeURIComponent("Re: " + (c.subject || "Contato"))}"><i class="fa-solid fa-reply" aria-hidden="true"></i> Responder</a></article>`,
      }));
      const subscribers = (d.subscribers || []).map((c) => ({
        kind: "newsletter",
        date: c.created_at,
        html: `<article class="message message-newsletter"><div><span class="message-origin">Inscrição na newsletter</span><h4>Novo inscrito na newsletter</h4><small>${esc(c.email)} · ${dateTime(c.created_at)}</small><p>Este endereço de e-mail solicitou receber novidades e ofertas da PetLove.</p></div><a href="mailto:${encodeURIComponent(c.email)}?subject=${encodeURIComponent("Boas-vindas à newsletter PetLove")}"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Enviar e-mail</a></article>`,
      }));
      const all = [...contacts, ...subscribers].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      $("#contacts-list").innerHTML = all.length
        ? all.map((x) => x.html).join("")
        : '<div class="empty">Nenhuma mensagem ou inscrição recebida.</div>';
    } catch (e) {
      toast(e.message);
    }
  }
  const categoryNames = {
    brinquedos: "Brinquedos",
    caes: "Cães",
    gatos: "Gatos",
    alimentacao: "Alimentação",
    cuidados: "Cuidados",
  };
  async function loadProducts() {
    const refresh = $("#refresh-products");
    if (refresh) refresh.disabled = true;
    try {
      const d = await api("/admin/products");
      state.products = d.products;
      $("#product-count").textContent = d.products.length;
      $("#product-active-count").textContent = d.products.filter(
        (p) => p.active,
      ).length;
      $("#product-low-count").textContent = d.products.filter(
        (p) => p.active && p.stock !== null && p.stock <= 5,
      ).length;
      renderProducts();
    } catch (e) {
      toast(e.message);
    } finally {
      if (refresh) refresh.disabled = false;
    }
  }
  function renderProducts() {
    const q = $("#product-search").value.trim().toLowerCase(),
      filter = $("#product-status-filter").value;
    const rows = state.products.filter(
      (p) =>
        (!q || `${p.name} ${p.sku || ""}`.toLowerCase().includes(q)) &&
        (filter === "all" ||
          (filter === "active" && p.active) ||
          (filter === "inactive" && !p.active) ||
          (filter === "low" && p.stock !== null && p.stock <= 5)),
    );
    $("#products-grid").innerHTML = rows.length
      ? rows
          .map(
            (p) =>
              `<article class="product-admin-card"><div class="product-admin-image"><img src="/assets/images/produtos/${encodeURIComponent(p.img)}" alt="${esc(p.name)}" loading="lazy"><span class="product-state ${p.active ? "is-active" : "is-inactive"}">${p.active ? "Ativo" : "Inativo"}</span>${p.featured ? '<span class="product-featured-tag"><i class="fa-solid fa-star"></i> Destaque</span>' : ""}</div><div class="product-admin-body"><div class="product-admin-meta"><span>${esc(categoryNames[p.cat] || p.cat)}</span><span>${esc(p.sku || "Sem SKU")}</span></div><h3>${esc(p.name)}</h3><div class="product-admin-price">${money(p.price)} ${p.old ? `<del>${money(p.old)}</del>` : ""}</div><div class="product-admin-stock"><span><i class="fa-solid fa-boxes-stacked"></i> ${p.stock === null ? "Estoque não controlado" : `${p.stock} em estoque`}</span><span>${p.stock !== null && p.stock <= 5 ? '<b class="stock-low">Estoque baixo</b>' : p.stock === null ? '<b class="stock-ok">Sem controle</b>' : '<b class="stock-ok">Disponível</b>'}</span></div><div class="product-admin-actions"><button class="btn btn-soft" data-edit-product="${p.id}"><i class="fa-solid fa-pen"></i> Editar</button><button class="product-remove" data-delete-product="${p.id}" aria-label="Excluir ${esc(p.name)}"><i class="fa-regular fa-trash-can"></i></button></div></div></article>`,
          )
          .join("")
      : '<div class="empty product-empty">Nenhum produto encontrado. Ajuste os filtros ou cadastre um novo produto.</div>';
  }
  function openProductDialog(product = null) {
    const f = $("#product-form");
    f.reset();
    $("#product-id").value = product?.id || "";
    $("#product-dialog-title").textContent = product
      ? "Editar produto"
      : "Adicionar produto";
    $("#product-img").value = product?.img || "cama-pet.webp";
    $("#product-image-preview").src =
      `/assets/images/produtos/${encodeURIComponent(product?.img || "cama-pet.webp")}`;
    $("#product-name").value = product?.name || "";
    $("#product-category").value = product?.cat || "brinquedos";
    $("#product-pet").value = product?.pet || "cao";
    $("#product-price").value = product?.price ?? "";
    $("#product-old").value = product?.old ?? "";
    $("#product-stock").value = product?.stock ?? "";
    $("#product-sku").value = product?.sku || "";
    $("#product-description").value = product?.desc || "";
    $("#product-tag").value = product?.tag || "";
    $("#product-specs").value = JSON.stringify(product?.specs || {}, null, 0);
    $("#product-featured").checked = Boolean(product?.featured);
    $("#product-active").checked = product ? Boolean(product.active) : true;
    $("#product-form-error").textContent = "";
    $("#product-dialog").showModal();
  }
  async function saveProduct(e) {
    e.preventDefault();
    const btn = $("#save-product");
    btn.disabled = true;
    $("#product-form-error").textContent = "";
    let specs;
    try {
      specs = JSON.parse($("#product-specs").value || "{}");
    } catch {
      $("#product-form-error").textContent =
        "As especificações precisam estar em JSON válido.";
      btn.disabled = false;
      return;
    }
    const payload = {
      name: $("#product-name").value.trim(),
      cat: $("#product-category").value,
      pet: $("#product-pet").value,
      price: $("#product-price").value,
      old: $("#product-old").value,
      stock: $("#product-stock").value,
      sku: $("#product-sku").value.trim(),
      desc: $("#product-description").value,
      tag: $("#product-tag").value,
      img: $("#product-img").value,
      specs,
      featured: $("#product-featured").checked,
      active: $("#product-active").checked,
    };
    try {
      const id = $("#product-id").value;
      await api(id ? `/admin/products/${id}` : "/admin/products", {
        method: id ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      $("#product-dialog").close();
      toast(
        id
          ? "Produto atualizado e vitrine sincronizada."
          : "Produto cadastrado e publicado no catálogo.",
      );
      await loadProducts();
    } catch (err) {
      $("#product-form-error").textContent = err.message;
    } finally {
      btn.disabled = false;
    }
  }
  async function uploadProductImage(file) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast("Escolha uma imagem JPG, PNG ou WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast("A imagem deve ter no máximo 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const input = $("#product-image-file");
      input.disabled = true;
      try {
        const result = await api("/admin/products/upload", {
          method: "POST",
          body: JSON.stringify({ dataUrl: reader.result }),
        });
        $("#product-img").value = result.img;
        $("#product-image-preview").src = result.url;
        toast("Imagem enviada. Salve o produto para publicar.");
      } catch (e) {
        toast(e.message);
      } finally {
        input.disabled = false;
      }
    };
    reader.readAsDataURL(file);
  }

  $("#toggle-password").addEventListener("click", () => {
    const input = $("#admin-password-input"),
      button = $("#toggle-password"),
      icon = button.querySelector("i"),
      visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.setAttribute(
      "aria-label",
      visible ? "Ocultar senha" : "Mostrar senha",
    );
    button.setAttribute("aria-pressed", String(visible));
    icon.className = visible ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
  });
  $("#login-year").textContent = new Date().getFullYear();
  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const btn = e.currentTarget.querySelector('button[type="submit"]');
    btn.disabled = true;
    $("#login-error").textContent = "";
    try {
      const d = await api("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          email: f.get("email"),
          password: f.get("password"),
        }),
      });
      showApp(d.admin.email);
    } catch (err) {
      $("#login-error").textContent = err.message;
    } finally {
      btn.disabled = false;
    }
  });
  $("#logout").onclick = async () => {
    try {
      await api("/admin/logout", { method: "POST", body: "{}" });
    } finally {
      showLogin();
    }
  };
  $("#nav").addEventListener("click", (e) => {
    const b = e.target.closest("[data-page]");
    if (b) navigate(b.dataset.page);
  });
  document.addEventListener("click", async (e) => {
    const go = e.target.closest("[data-go]");
    if (go) navigate(go.dataset.go);
    const detail = e.target.closest("[data-order]");
    if (detail) {
      const o =
        state.orders.find((x) => x.code === detail.dataset.order) || null;
      if (o) orderDetail(o);
    }
    const archive = e.target.closest("[data-archive-order]");
    if (archive) {
      const code = archive.dataset.archiveOrder,
        archived = archive.dataset.archived === "true";
      if (
        !confirm(
          archived
            ? `Restaurar o pedido ${code} para a lista ativa?`
            : `Arquivar o pedido ${code}? Ele continuará salvo e poderá ser restaurado.`,
        )
      )
        return;
      archive.disabled = true;
      try {
        await api(`/admin/orders/${encodeURIComponent(code)}/archive`, {
          method: "PATCH",
          body: JSON.stringify({ archived: !archived }),
        });
        toast(archived ? "Pedido restaurado." : "Pedido arquivado.");
        await loadOrders();
        loadDashboard();
      } catch (err) {
        toast(err.message);
      } finally {
        archive.disabled = false;
      }
    }
    const remove = e.target.closest("[data-delete-order]");
    if (remove) {
      const code = remove.dataset.deleteOrder;
      if (
        !confirm(
          `ATENÇÃO: excluir o pedido ${code} permanentemente? O pedido e seu histórico de atualizações serão apagados. Essa ação não pode ser desfeita.`,
        )
      )
        return;
      remove.disabled = true;
      try {
        await api(`/admin/orders/${encodeURIComponent(code)}`, {
          method: "DELETE",
        });
        toast("Pedido excluído permanentemente.");
        await loadOrders();
        loadDashboard();
      } catch (err) {
        toast(err.message);
      } finally {
        remove.disabled = false;
      }
    }
  });
  $("#order-search").addEventListener("input", () => {
    clearTimeout(window.__orderSearchTimer);
    window.__orderSearchTimer = setTimeout(loadOrders, 280);
  });
  $("#order-filter").onchange = loadOrders;
  $("#order-archive-filter").onchange = loadOrders;
  $("#order-date-from").onchange = loadOrders;
  $("#order-date-to").onchange = loadOrders;
  $("#refresh-orders").onclick = loadOrders;
  $("#refresh-bookings").onclick = loadBookings;
  $("#refresh-contacts").onclick = loadContacts;
  $("#add-product").onclick = () => openProductDialog();
  $("#refresh-products").onclick = loadProducts;
  $("#product-search").addEventListener("input", renderProducts);
  $("#product-status-filter").onchange = renderProducts;
  $("#product-form").addEventListener("submit", saveProduct);
  $("#product-image-file").addEventListener("change", (e) =>
    uploadProductImage(e.target.files?.[0]),
  );
  $("#cancel-product").onclick = () => $("#product-dialog").close();
  $("#product-dialog").addEventListener("click", (e) => {
    if (e.target === $("#product-dialog")) $("#product-dialog").close();
  });
  $("#products-grid").addEventListener("click", async (e) => {
    const edit = e.target.closest("[data-edit-product]");
    if (edit) {
      const p = state.products.find(
        (x) => x.id === Number(edit.dataset.editProduct),
      );
      if (p) openProductDialog(p);
      return;
    }
    const remove = e.target.closest("[data-delete-product]");
    if (remove) {
      const p = state.products.find(
        (x) => x.id === Number(remove.dataset.deleteProduct),
      );
      if (!p) return;
      if (
        !confirm(
          `Excluir o produto "${p.name}" permanentemente? Os pedidos já realizados não serão alterados.`,
        )
      )
        return;
      remove.disabled = true;
      try {
        await api(`/admin/products/${p.id}`, { method: "DELETE" });
        toast("Produto excluído do catálogo.");
        await loadProducts();
      } catch (err) {
        toast(err.message);
        remove.disabled = false;
      }
    }
  });
  $("#bookings-table").addEventListener("change", async (e) => {
    const sel = e.target.closest("[data-booking]");
    if (!sel) return;
    try {
      await api(`/admin/bookings/${sel.dataset.booking}`, {
        method: "PATCH",
        body: JSON.stringify({ status: sel.value }),
      });
      toast("Agendamento atualizado.");
      loadBookings();
    } catch (err) {
      toast(err.message);
    }
  });
  $("#bookings-table").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-delete-booking]");
    if (!btn) return;
    const id = btn.dataset.deleteBooking;
    if (
      !confirm(
        "Excluir este agendamento permanentemente? Essa ação não pode ser desfeita.",
      )
    )
      return;
    btn.disabled = true;
    try {
      await api(`/admin/bookings/${id}`, { method: "DELETE" });
      toast("Agendamento excluído permanentemente.");
      await loadBookings();
    } catch (err) {
      toast(err.message);
      btn.disabled = false;
    }
  });
  $("#order-dialog").addEventListener("click", (e) => {
    if (e.target === $("#order-dialog")) $("#order-dialog").close();
  });
  // O formulário de login já começa visível no HTML. Assim, um erro ao carregar
  // a API não deixa a rota /admin em branco.
  enhanceSelects(document);
  api("/admin/me")
    .then((d) => showApp(d.admin.email))
    .catch(() => {
      showLogin();
      $("#login-error").textContent =
        "Sessão não validada. Entre com seu e-mail e senha administrativos.";
    });
})();

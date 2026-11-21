/* 01. catálogo e configurações */
const IMG = "assets/images/produtos/";
let PRODUCTS = [
  {
    id: 1,
    name: "Corda Mordedora Duo",
    cat: "brinquedos",
    pet: "cao",
    price: 39.9,
    old: 49.9,
    rating: 4.8,
    reviews: 212,
    img: "brinquedo-corda.webp",
    tag: "Top",
    desc: "Corda de algodão trançado com dupla textura que ajuda na limpeza dos dentes e gasta energia de forma saudável.",
    specs: {
      Material: "Algodão natural",
      Porte: "Médio/Grande",
      Peso: "180 g",
      Garantia: "30 dias",
    },
  },
  {
    id: 2,
    name: "Caminha Nuvem Cozy",
    cat: "caes",
    pet: "cao",
    price: 149.9,
    old: 189.9,
    rating: 4.9,
    reviews: 540,
    img: "cama-pet.webp",
    tag: "Mais vendido",
    desc: "Pelúcia ortopédica antiestresse com bordas elevadas e base antiderrapante. Lavável na máquina.",
    specs: {
      Material: "Pelúcia + espuma",
      Tamanho: "60 cm",
      Lavável: "Sim",
      Garantia: "90 dias",
    },
  },
  {
    id: 3,
    name: "Comedouro Duo Natural",
    cat: "alimentacao",
    pet: "ambos",
    price: 69.9,
    rating: 4.7,
    reviews: 133,
    img: "comedouro-duplo.webp",
    desc: "Base em bambu com duas tigelas em inox elevadas, melhorando a postura durante as refeições.",
    specs: {
      Material: "Bambu + inox",
      Capacidade: "2 x 400 ml",
      Altura: "10 cm",
      Garantia: "1 ano",
    },
  },
  {
    id: 4,
    name: "Kit Banho PetCare",
    cat: "cuidados",
    pet: "ambos",
    price: 54.9,
    old: 64.9,
    rating: 4.6,
    reviews: 98,
    img: "kit-banho-cheirinho-bom.webp",
    desc: "Shampoo, condicionador e colônia hipoalergênicos com pH balanceado e fragrância suave.",
    specs: {
      Itens: "3 produtos",
      Volume: "3 x 250 ml",
      Hipoalergênico: "Sim",
      Vegano: "Sim",
    },
  },
  {
    id: 5,
    name: "Arranhador Gatitude",
    cat: "gatos",
    pet: "gato",
    price: 89.9,
    rating: 4.8,
    reviews: 301,
    img: "arranhador-gato.webp",
    tag: "Novo",
    desc: "Arranhador em sisal com plataforma e bolinha pendurada. Protege seus móveis e diverte o gato.",
    specs: {
      Material: "Sisal + MDF",
      Altura: "45 cm",
      Montagem: "Fácil",
      Garantia: "6 meses",
    },
  },
  {
    id: 6,
    name: "Bolinha Vai e Volta",
    cat: "brinquedos",
    pet: "cao",
    price: 24.9,
    rating: 4.5,
    reviews: 87,
    img: "bola-interativa-roxa.webp",
    desc: "Bolinha de borracha atóxica com quique imprevisível para brincadeiras de buscar.",
    specs: {
      Material: "Borracha atóxica",
      Diâmetro: "6,5 cm",
      Flutua: "Sim",
      Garantia: "30 dias",
    },
  },
  {
    id: 7,
    name: "Petiscos Croc Croc",
    cat: "alimentacao",
    pet: "cao",
    price: 32.9,
    old: 39.9,
    rating: 4.9,
    reviews: 612,
    img: "petiscos-pet.webp",
    tag: "Oferta",
    desc: "Petiscos assados, sem corantes, ricos em proteína. Ótimos para adestramento.",
    specs: {
      Peso: "250 g",
      Sabor: "Frango",
      Corantes: "Não",
      Validade: "12 meses",
    },
  },
  {
    id: 8,
    name: "Coleira Passeio Feliz",
    cat: "caes",
    pet: "cao",
    price: 59.9,
    rating: 4.7,
    reviews: 156,
    img: "coleira-azul.webp",
    desc: "Coleira acolchoada com faixa refletiva e fecho de segurança. Pronta para AirTag/rastreador.",
    specs: {
      Material: "Nylon acolchoado",
      Refletiva: "Sim",
      Ajuste: "30–50 cm",
      Garantia: "6 meses",
    },
  },
  {
    id: 9,
    name: "Varinha Caça-Penas",
    cat: "gatos",
    pet: "gato",
    price: 29.9,
    rating: 4.6,
    reviews: 121,
    img: "varinha-caca-penas.webp",
    desc: "Varinha flexível com penas naturais e guizo, estimula o instinto caçador.",
    specs: {
      Comprimento: "80 cm",
      Refil: "Incluso",
      Material: "Fibra + penas",
      Garantia: "30 dias",
    },
  },
  {
    id: 10,
    name: "Escova Pelo Leve",
    cat: "cuidados",
    pet: "ambos",
    price: 44.9,
    rating: 4.8,
    reviews: 244,
    img: "escova-pet.webp",
    desc: "Escova autolimpante com cerdas retráteis: remove o pelo morto num clique.",
    specs: {
      Tipo: "Autolimpante",
      Cerdas: "Inox com pontas",
      Pelagem: "Todas",
      Garantia: "1 ano",
    },
  },
  {
    id: 11,
    name: "Bolsa Passeio Leve",
    cat: "gatos",
    pet: "gato",
    price: 169.9,
    old: 199.9,
    rating: 4.7,
    reviews: 76,
    img: "bolsa-transporte-pet.webp",
    desc: "Bolsa transportadora ventilada, aprovada para cabine de avião, com alça ergonômica.",
    specs: {
      Peso_max: "8 kg",
      Ventilação: "4 lados",
      Aviação: "Aprovada",
      Garantia: "1 ano",
    },
  },
  {
    id: 12,
    name: "Tapete Rotina Limpa",
    cat: "cuidados",
    pet: "cao",
    price: 79.9,
    rating: 4.5,
    reviews: 190,
    img: "tapete-rotina-limpa.webp",
    desc: "Tapete higiênico lavável com 5 camadas de absorção e base impermeável.",
    specs: {
      Tamanho: "70 x 80 cm",
      Camadas: "5",
      Lavável: "300 lavagens",
      Garantia: "6 meses",
    },
  },
];
const CATS = {
  brinquedos: "Brinquedos",
  caes: "Cães",
  gatos: "Gatos",
  alimentacao: "Alimentação",
  cuidados: "Cuidados",
};
const COUPONS = {
  PETLOVE10: { type: "pct", v: 10, label: "10% off" },
  BEMVINDO: { type: "val", v: 20, label: "R$ 20 off" },
  FRETEZERO: { type: "ship", v: 0, label: "Frete grátis" },
};
const FREE_SHIP = 149;
/* 02. armazenamento e estado da aplicação */
const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];
const brl = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const store = {
  get: (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
const byId = (id) => PRODUCTS.find((p) => p.id == id);
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const Rating = {
  all: () => store.get("pl_ratings", {}),
  list: (id) => Rating.all()[id] || [],
  summary: (p) => {
    const own = Rating.list(p.id);
    const total = p.reviews + own.length;
    const avg =
      (p.rating * p.reviews + own.reduce((a, x) => a + x.value, 0)) /
      Math.max(1, total);
    return { avg, count: total, own };
  },
  add(id, value) {
    const all = Rating.all(),
      list = all[id] || [];
    const existing = list.findIndex((x) => x.key === "local");
    const entry = { key: "local", value: +value, date: Date.now() };
    if (existing >= 0) list[existing] = entry;
    else list.push(entry);
    all[id] = list;
    store.set("pl_ratings", all);
  },
};
function ratingStars(p, compact = false) {
  const r = Rating.summary(p),
    chosen = r.own[0]?.value || 0;
  return `<div class="rating-widget ${compact ? "compact" : ""}" aria-label="Avaliação média ${r.avg.toFixed(1)} de 5"><span class="rate-input" role="group" aria-label="Avaliar ${p.name}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-rate-product="${p.id}" data-rate="${n}" aria-label="${n} estrela${n > 1 ? "s" : ""}" class="${n <= (chosen || Math.round(r.avg)) ? "selected" : ""}">★</button>`).join("")}</span><span class="rating-meta"><b>${r.avg.toFixed(1)}</b><span class="rating-count">(${r.count} avaliações)</span></span><span class="rate-hint">${chosen ? "Sua nota foi registrada" : "Avalie este produto"}</span></div>`;
}

/* Carrinho e favoritos */
const Cart = {
  items: () => store.get("pl_cart", []),
  save(i) {
    store.set("pl_cart", i);
    updateBadges();
    renderMini();
  },
  add(id, q = 1) {
    const i = Cart.items();
    const f = i.find((x) => x.id == id);
    f ? (f.q += q) : i.push({ id: +id, q });
    Cart.save(i);
    toast(`${byId(id).name} adicionado ao carrinho`, "fa-bag-shopping");
  },
  setQ(id, q) {
    let i = Cart.items();
    i =
      q <= 0
        ? i.filter((x) => x.id != id)
        : i.map((x) => (x.id == id ? { ...x, q } : x));
    Cart.save(i);
  },
  clear() {
    Cart.save([]);
  },
  count: () => Cart.items().reduce((a, b) => a + b.q, 0),
  subtotal: () => Cart.items().reduce((a, b) => a + byId(b.id).price * b.q, 0),
  totals() {
    const sub = Cart.subtotal();
    const c = store.get("pl_coupon", null);
    const cp = c && COUPONS[c];
    let disc = 0,
      ship = sub === 0 ? 0 : sub >= FREE_SHIP ? 0 : store.get("pl_ship", 19.9);
    if (cp) {
      if (cp.type === "pct") disc = (sub * cp.v) / 100;
      if (cp.type === "val") disc = Math.min(cp.v, sub);
      if (cp.type === "ship") ship = 0;
    }
    const pay = store.get("pl_pay", "pix");
    const pixDisc = pay === "pix" ? (sub - disc) * 0.05 : 0;
    return {
      sub,
      disc,
      ship,
      pixDisc,
      total: Math.max(0, sub - disc - pixDisc + ship),
      coupon: cp ? c : null,
    };
  },
};
window.PetLoveCart = Cart;

const Fav = {
  items: () => store.get("pl_fav", []),
  toggle(id) {
    let f = Fav.items();
    const on = f.includes(id);
    f = on ? f.filter((x) => x !== id) : [...f, id];
    store.set("pl_fav", f);
    updateBadges();
    toast(on ? "Removido dos favoritos" : "Salvo nos favoritos", "fa-heart");
    return !on;
  },
  has: (id) => Fav.items().includes(id),
};

/* 03. layout compartilhado: cabeçalho, rodapé e widgets */
function layout() {
  const page = document.body.dataset.page || "";
  const L = (h, t) =>
    `<a href="${h}" class="${page === h.split(".")[0] ? "active" : ""}">${t}</a>`;
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
 <div class="announce"><i class="fa-solid fa-bolt" aria-hidden="true"></i> FRETE GRÁTIS ACIMA DE R$ 149 · USE <b>PETLOVE10</b> E GANHE 10% OFF · 5% EXTRA NO PIX</div>
 <header class="header"><div class="container">
  <a href="index.html" class="logo"><span class="logo-mark"><i class="fa-solid fa-paw"></i></span><span class="logo-word">Pet<b>Love</b></span></a>
  <nav class="nav" id="nav">${L("index.html", "Início")}${L("produtos.html", "Loja")}${L("servicos.html", "Serviços")}${L("sobre.html", "Nossa história")}${L("rastreio.html", "Rastrear")}${L("contato.html", "Contato")}</nav>
  <div class="h-actions">
   <button class="icon-btn" data-open-search aria-label="Buscar"><i class="fa-solid fa-magnifying-glass"></i></button>
   <a class="icon-btn" href="produtos.html?fav=1" aria-label="Favoritos"><i class="fa-regular fa-heart"></i><span class="badge" id="fav-badge"></span></a>
   <button class="icon-btn" data-open-cart aria-label="Carrinho"><i class="fa-solid fa-bag-shopping"></i><span class="badge" id="cart-badge"></span></button>
   <button class="icon-btn menu-btn" id="menu-btn" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
  </div></div></header>`,
  );
  if (page !== "checkout")
    document.body.insertAdjacentHTML(
      "beforeend",
      `
 <footer class="footer"><div class="container">
  <div class="footer-grid">
   <div><a href="index.html" class="logo"><span class="logo-mark"><i class="fa-solid fa-paw"></i></span><span class="logo-word">Pet<b>Love</b></span></a>
    <p style="color:var(--muted);margin-top:1rem;max-width:320px">Tecnologia e carinho para a vida do seu pet. Produtos selecionados, serviços inteligentes e entrega rápida.</p>
    <div class="socials"><a class="icon-btn" href="#"><i class="fa-brands fa-instagram"></i></a><a class="icon-btn" href="#"><i class="fa-brands fa-tiktok"></i></a><a class="icon-btn" href="#"><i class="fa-brands fa-whatsapp"></i></a><a class="icon-btn" href="#"><i class="fa-brands fa-youtube"></i></a></div></div>
   <div><h5>Loja</h5><ul><li><a href="produtos.html?cat=caes">Cães</a></li><li><a href="produtos.html?cat=gatos">Gatos</a></li><li><a href="produtos.html?cat=brinquedos">Brinquedos</a></li><li><a href="produtos.html?cat=cuidados">Cuidados</a></li></ul></div>
   <div><h5>PetLove</h5><ul><li><a href="sobre.html">Nossa história</a></li><li><a href="servicos.html">Serviços</a></li><li><a href="servicos.html#clube">Clube PetLove+</a></li><li><a href="contato.html">Contato</a></li></ul></div>
   <div><h5>Ajuda</h5><ul><li><a href="rastreio.html">Rastrear pedido</a></li><li><a href="contato.html#faq">Perguntas frequentes</a></li><li><a href="#">Trocas e devoluções</a></li><li><a href="#">Privacidade</a></li></ul></div>
  </div>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} PetLove · Feito com <i class="fa-solid fa-heart" aria-hidden="true"></i> para pets</span><span class="mono"><i class="fa-brands fa-cc-visa"></i> <i class="fa-brands fa-cc-mastercard"></i> <i class="fa-brands fa-pix"></i> · Site seguro SSL</span></div>
 </div></footer>`,
    );
  document.body.insertAdjacentHTML(
    "beforeend",
    `
 <div class="overlay" id="overlay"></div>
 <aside class="drawer" id="drawer"><div class="drawer-head"><strong><i class="fa-solid fa-bag-shopping" style="color:var(--primary)"></i> Seu carrinho</strong><button class="icon-btn" data-close><i class="fa-solid fa-xmark"></i></button></div>
  <div class="drawer-body" id="mini-body"></div>
  <div class="drawer-foot" id="mini-foot"></div></aside>
 <div class="search-modal" id="search"><div class="search-box"><input id="search-input" placeholder="Buscar produtos, categorias…" autocomplete="off"><div class="search-results" id="search-results"></div></div></div>
 <div class="toasts" id="toasts"></div>
 <button class="chat-fab" id="chat-fab" aria-label="Assistente"><i class="fa-solid fa-robot"></i></button>
 <div class="chat" id="chat"><div class="chat-head"><span class="logo-mark"><i class="fa-solid fa-robot"></i></span><div><strong>PetBot</strong><br><small>● online · assistente virtual</small></div></div>
  <div class="chat-body" id="chat-body"><div class="msg">Oi! <i class="fa-solid fa-paw" aria-hidden="true"></i> Sou o PetBot. Posso ajudar com produtos, frete, cupons ou serviços.</div></div>
  <div class="chat-quick"><span class="chip" data-q="cupom">Cupons</span><span class="chip" data-q="frete">Frete</span><span class="chip" data-q="gato">Pra gato</span><span class="chip" data-q="banho">Banho</span></div>
  <form id="chat-form"><input placeholder="Digite sua dúvida…"><button><i class="fa-solid fa-paper-plane"></i></button></form></div>`,
  );
}

/* 04. componentes e renderização */
function updateBadges() {
  const c = $("#cart-badge"),
    f = $("#fav-badge");
  if (c) c.textContent = Cart.count() || "";
  if (f) f.textContent = Fav.items().length || "";
}
function toast(msg, icon = "fa-check", type = "success") {
  const host = $("#toasts");
  if (!host) return;
  const raw = String(msg ?? "");
  const failed =
    type === "error" ||
    /circle-xmark|triangle-exclamation|circle-exclamation|fa-times/i.test(
      icon,
    ) ||
    /erro|inválid|não foi|não consegui|falha|indisponível|configure/i.test(raw);
  const title = failed ? "Não foi possível concluir" : "Tudo certo!";
  const card = document.createElement("div");
  card.className = `toast toast-card ${failed ? "toast-error" : "toast-success"}`;
  card.setAttribute("role", failed ? "alert" : "status");
  card.setAttribute("aria-live", failed ? "assertive" : "polite");
  const symbol = document.createElement("span");
  symbol.className = "toast-symbol";
  symbol.innerHTML = `<i class="fa-solid ${failed ? "fa-circle-exclamation" : icon}" aria-hidden="true"></i>`;
  const copy = document.createElement("span");
  copy.className = "toast-copy";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const description = document.createElement("span");
  description.textContent = raw;
  copy.append(heading, description);
  const close = document.createElement("button");
  close.type = "button";
  close.className = "toast-close";
  close.setAttribute("aria-label", "Fechar aviso");
  close.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
  close.addEventListener("click", () => card.remove());
  card.append(symbol, copy, close);
  host.append(card);
  window.setTimeout(() => card.remove(), failed ? 5200 : 3800);
}
function openPanel(el) {
  $("#overlay").classList.add("show");
  el.classList.add("show");
}
function closePanels() {
  $$(".overlay,.drawer,.search-modal").forEach((e) =>
    e.classList.remove("show"),
  );
}

function renderMini() {
  const b = $("#mini-body");
  if (!b) return;
  const items = Cart.items();
  if (!items.length) {
    b.innerHTML = `<div class="empty"><i class="fa-solid fa-box-open"></i><p>Seu carrinho está vazio.</p></div>`;
    $("#mini-foot").innerHTML =
      `<a class="btn btn-primary btn-block" href="produtos.html">Explorar a loja</a>`;
    return;
  }
  b.innerHTML = items
    .map((i) => {
      const p = byId(i.id);
      return `<div class="mini-item"><img src="${IMG + p.img}" alt=""><div><div>${p.name}</div><small class="mono" style="color:var(--muted)">${i.q} × ${brl(p.price)}</small></div><button class="icon-btn" data-rm="${p.id}"><i class="fa-solid fa-trash"></i></button></div>`;
    })
    .join("");
  const s = Cart.subtotal(),
    pct = Math.min(100, (s / FREE_SHIP) * 100);
  $("#mini-foot").innerHTML =
    `<small style="color:var(--muted)">${s >= FREE_SHIP ? `<i class="fa-solid fa-gift" aria-hidden="true"></i> Você ganhou frete grátis!` : `Faltam <b style="color:var(--primary)">${brl(FREE_SHIP - s)}</b> para frete grátis`}</small><div class="progress"><i style="width:${pct}%"></i></div>
 <div class="sum-row total"><span>Subtotal</span><span>${brl(s)}</span></div><div style="display:grid;gap:.5rem;margin-top:.8rem"><a class="btn btn-primary btn-block" href="checkout.html">Finalizar compra <i class="fa-solid fa-arrow-right"></i></a><a class="btn btn-block" href="carrinho.html">Ver carrinho</a></div>`;
}

function productCard(p) {
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  return `<article class="p-card reveal"><div class="p-media"><a href="produto.html?id=${p.id}"><img src="${IMG + p.img}" alt="${p.name}" loading="lazy"></a>
 ${off ? `<span class="p-tag sale">-${off}%</span>` : p.tag ? `<span class="p-tag">${p.tag}</span>` : ""}
 <button class="p-fav ${Fav.has(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="Favoritar"><i class="fa-${Fav.has(p.id) ? "solid" : "regular"} fa-heart"></i></button></div>
 <div class="p-body"><span class="p-cat">${CATS[p.cat]}</span><a href="produto.html?id=${p.id}" class="p-name">${p.name}</a>
 ${ratingStars(p, true)}
 <div class="price"><strong>${brl(p.price)}</strong>${p.old ? `<s>${brl(p.old)}</s>` : ""}</div><span class="pix"><i class="fa-brands fa-pix"></i> ${brl(p.price * 0.95)} no PIX</span>
 <div class="p-actions"><button class="btn btn-primary" data-add="${p.id}"><i class="fa-solid fa-plus"></i> Adicionar</button></div></div></article>`;
}

/* 05. eventos globais */
function bindGlobal() {
  document.addEventListener("click", (e) => {
    const rate = e.target.closest("[data-rate-product]");
    if (rate) {
      const id = +rate.dataset.rateProduct,
        p = byId(id);
      Rating.add(id, +rate.dataset.rate);
      const wrap = rate.closest(".rating-widget");
      if (wrap)
        wrap.outerHTML = ratingStars(p, wrap.classList.contains("compact"));
      toast("Obrigado pela avaliação!", "fa-star");
      return;
    }
    const t = e.target.closest(
      "[data-add],[data-fav],[data-open-cart],[data-open-search],[data-close],[data-rm],#overlay,#menu-btn,#chat-fab,[data-q]",
    );
    if (!t) return;
    if (t.dataset.add) {
      Cart.add(t.dataset.add, +(t.dataset.qty || 1));
      if (!document.body.dataset.noDrawer) {
        renderMini();
        openPanel($("#drawer"));
      }
    } else if (t.dataset.fav) {
      const on = Fav.toggle(+t.dataset.fav);
      t.classList.toggle("on", on);
      t.innerHTML = `<i class="fa-${on ? "solid" : "regular"} fa-heart"></i>`;
    } else if (t.hasAttribute("data-open-cart")) {
      renderMini();
      openPanel($("#drawer"));
    } else if (t.hasAttribute("data-open-search")) {
      openPanel($("#search"));
      setTimeout(() => $("#search-input").focus(), 50);
      search("");
    } else if (t.dataset.rm) {
      Cart.setQ(+t.dataset.rm, 0);
      document.dispatchEvent(new Event("cart:changed"));
    } else if (t.id === "overlay" || t.hasAttribute("data-close"))
      closePanels();
    else if (t.id === "menu-btn") {
      const nav = $("#nav"),
        open = nav.classList.toggle("open");
      t.setAttribute("aria-expanded", String(open));
      t.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      t.querySelector("i").className =
        `fa-solid ${open ? "fa-xmark" : "fa-bars"}`;
    } else if (t.id === "chat-fab") $("#chat").classList.toggle("show");
    else if (t.dataset.q) botReply(t.textContent, t.dataset.q);
  });
  document.addEventListener("click", (e) => {
    const nav = $("#nav"),
      btn = $("#menu-btn");
    if (
      nav?.classList.contains("open") &&
      !e.target.closest("#nav") &&
      !e.target.closest("#menu-btn")
    ) {
      nav.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
      btn?.setAttribute("aria-label", "Abrir menu");
      const icon = btn?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    }
    if (e.target.closest("#nav a")) {
      nav?.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
      btn?.setAttribute("aria-label", "Abrir menu");
      const icon = btn?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const nav = $("#nav"),
        btn = $("#menu-btn");
      nav?.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
      btn?.setAttribute("aria-label", "Abrir menu");
      const icon = btn?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
      closePanels();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openPanel($("#search"));
      $("#search-input").focus();
      search("");
    }
  });
  $("#search-input").addEventListener("input", (e) => search(e.target.value));
  $("#chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const i = $("input", e.target);
    if (i.value.trim()) botReply(i.value, i.value);
    i.value = "";
  });
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
          io.unobserve(x.target);
        }
      }),
    { threshold: 0.1 },
  );
  const obs = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  obs();
  new MutationObserver(obs).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
/* 06. busca e assistente virtual */
function search(q) {
  q = q.toLowerCase().trim();
  const r = PRODUCTS.filter(
    (p) => !q || (p.name + CATS[p.cat] + p.desc).toLowerCase().includes(q),
  ).slice(0, 6);
  $("#search-results").innerHTML = r.length
    ? r
        .map(
          (p) =>
            `<a href="produto.html?id=${p.id}"><img src="${IMG + p.img}" alt=""><div><div>${p.name}</div><small class="mono" style="color:var(--primary)">${brl(p.price)}</small></div></a>`,
        )
        .join("")
    : `<p style="padding:1rem;color:var(--muted)">Nada encontrado para "${q}".</p>`;
}
function botReply(text, key) {
  const b = $("#chat-body");
  b.insertAdjacentHTML(
    "beforeend",
    `<div class="msg me">${text.replace(/</g, "&lt;")}</div>`,
  );
  const k = key.toLowerCase();
  let r = `Hmm, não entendi <i class="fa-solid fa-circle-question" aria-hidden="true"></i>. Tente perguntar sobre cupons, frete, produtos para gato/cão ou banho.`;
  if (k.includes("cupom") || k.includes("desconto"))
    r =
      "Cupons ativos: <b>PETLOVE10</b> (10% off), <b>BEMVINDO</b> (R$ 20 off) e <b>FRETEZERO</b> (frete grátis). E ainda 5% extra no PIX!";
  else if (k.includes("frete") || k.includes("entrega"))
    r = `Frete grátis acima de ${brl(FREE_SHIP)}. Entregas expressas em até 24h nas capitais. Calcule no carrinho com seu CEP.`;
  else if (k.includes("gato"))
    r = `Para gatos recomendo o <a href="produto.html?id=5" style="color:var(--primary)">Arranhador Gatitude</a> e a <a href="produto.html?id=9" style="color:var(--primary)">Varinha Caça-Penas</a> <i class="fa-solid fa-cat" aria-hidden="true"></i>`;
  else if (k.includes("cão") || k.includes("cao") || k.includes("cachorro"))
    r = `Os favoritos dos dogs: <a href="produto.html?id=2" style="color:var(--primary)">Caminha Nuvem</a> e <a href="produto.html?id=7" style="color:var(--primary)">Petiscos Croc Croc</a> <i class="fa-solid fa-dog" aria-hidden="true"></i>`;
  else if (k.includes("banho") || k.includes("serviço") || k.includes("agend"))
    r = `Agende banho, tosa ou consulta na página de <a href="servicos.html#agendar" style="color:var(--primary)">Serviços</a>.`;
  else if (k.includes("pedido") || k.includes("rastre"))
    r = `Acompanhe em <a href="rastreio.html" style="color:var(--primary)">Rastrear pedido</a> com o código que enviamos.`;
  setTimeout(() => {
    b.insertAdjacentHTML("beforeend", `<div class="msg">${r}</div>`);
    b.scrollTop = b.scrollHeight;
  }, 500);
  b.scrollTop = b.scrollHeight;
}

/* 07. páginas e fluxos de compra */
const Pages = {
  index() {
    $("#featured").innerHTML = PRODUCTS.filter(
      (p) => p.featured || [2, 7, 5, 10].includes(p.id),
    )
      .map(productCard)
      .join("");
    const deals = PRODUCTS.filter((p) => p.old);
    $("#deals").innerHTML = deals.slice(0, 4).map(productCard).join("");
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => {
      let d = Math.max(0, end - new Date());
      const h = Math.floor(d / 36e5),
        m = Math.floor((d % 36e5) / 6e4),
        s = Math.floor((d % 6e4) / 1e3);
      $("#cd").innerHTML = [
        ["h", h],
        ["min", m],
        ["seg", s],
      ]
        .map(
          ([l, v]) =>
            `<div><b>${String(v).padStart(2, "0")}</b><small>${l}</small></div>`,
        )
        .join("");
    };
    tick();
    setInterval(tick, 1000);
    $$("[data-count]").forEach((el) => {
      const to = +el.dataset.count;
      let n = 0;
      const st = to / 60;
      const iv = setInterval(() => {
        n += st;
        if (n >= to) {
          n = to;
          clearInterval(iv);
        }
        el.textContent =
          Math.round(n).toLocaleString("pt-BR") + (el.dataset.suffix || "");
      }, 20);
    });
    // quiz
    const Q = [
      {
        q: "Qual é o seu pet?",
        o: [
          ['<i class="fa-solid fa-dog" aria-hidden="true"></i> Cão', "cao"],
          ['<i class="fa-solid fa-cat" aria-hidden="true"></i> Gato', "gato"],
        ],
      },
      {
        q: "Qual o maior desafio hoje?",
        o: [
          [
            '<i class="fa-solid fa-bolt" aria-hidden="true"></i> Muita energia',
            "brinquedos",
          ],
          [
            '<i class="fa-solid fa-moon" aria-hidden="true"></i> Conforto e descanso',
            "conforto",
          ],
          [
            '<i class="fa-solid fa-bath" aria-hidden="true"></i> Higiene e pelos',
            "cuidados",
          ],
          [
            '<i class="fa-solid fa-bone" aria-hidden="true"></i> Alimentação',
            "alimentacao",
          ],
        ],
      },
    ];
    let step = 0,
      ans = [];
    const box = $("#quiz");
    const draw = () => {
      if (step < Q.length) {
        box.innerHTML = `<span class="mono" style="color:var(--muted)">PASSO ${step + 1}/${Q.length}</span><h3 style="margin-top:.4rem">${Q[step].q}</h3><div class="quiz-opts">${Q[step].o.map(([t, v]) => `<button data-v="${v}">${t}</button>`).join("")}</div>`;
        $$("button", box).forEach(
          (b) =>
            (b.onclick = () => {
              ans.push(b.dataset.v);
              step++;
              draw();
            }),
        );
      } else {
        const [pet, need] = ans;
        let r = PRODUCTS.filter(
          (p) =>
            (p.pet === pet || p.pet === "ambos") &&
            (need === "conforto"
              ? [2, 11, 3].includes(p.id)
              : p.cat === need ||
                (need === "brinquedos" && p.cat === "brinquedos")),
        );
        if (r.length < 2)
          r = PRODUCTS.filter((p) => p.pet === pet || p.pet === "ambos").slice(
            0,
            3,
          );
        box.innerHTML = `<span class="mono" style="color:var(--primary)">✓ ANÁLISE CONCLUÍDA</span><h3 style="margin:.4rem 0 1rem">Recomendado para seu pet:</h3>${r
          .slice(0, 3)
          .map(
            (p) =>
              `<div class="mini-item"><img src="${IMG + p.img}" alt=""><div><a href="produto.html?id=${p.id}">${p.name}</a><br><small class="mono" style="color:var(--primary)">${brl(p.price)}</small></div><button class="icon-btn" data-add="${p.id}"><i class="fa-solid fa-plus"></i></button></div>`,
          )
          .join(
            "",
          )}<button class="btn btn-ghost" style="margin-top:1rem" id="quiz-r"><i class="fa-solid fa-rotate"></i> Refazer</button>`;
        $("#quiz-r").onclick = () => {
          step = 0;
          ans = [];
          draw();
        };
      }
    };
    draw();
  },
  produtos() {
    const qs = new URLSearchParams(location.search);
    const st = {
      cat: qs.get("cat") || "all",
      pet: "all",
      max: 200,
      sort: "rel",
      q: "",
      fav: qs.has("fav"),
    };
    $("#cat-chips").innerHTML = [["all", "Todos"], ...Object.entries(CATS)]
      .map(
        ([k, v]) =>
          `<span class="chip ${st.cat === k ? "active" : ""}" data-c="${k}">${v}</span>`,
      )
      .join("");
    const draw = () => {
      let l = PRODUCTS.filter(
        (p) =>
          (st.cat === "all" || p.cat === st.cat) &&
          (st.pet === "all" || p.pet === st.pet || p.pet === "ambos") &&
          p.price <= st.max &&
          p.name.toLowerCase().includes(st.q) &&
          (!st.fav || Fav.has(p.id)),
      );
      ({
        low: () => l.sort((a, b) => a.price - b.price),
        high: () => l.sort((a, b) => b.price - a.price),
        rating: () =>
          l.sort((a, b) => Rating.summary(b).avg - Rating.summary(a).avg),
        pop: () =>
          l.sort((a, b) => Rating.summary(b).count - Rating.summary(a).count),
      })[st.sort]?.();
      $("#count").textContent =
        `${l.length} produto${l.length !== 1 ? "s" : ""}${st.fav ? " favoritos" : ""}`;
      $("#grid").innerHTML = l.length
        ? l.map(productCard).join("")
        : `<div class="empty" style="grid-column:1/-1"><i class="fa-solid fa-magnifying-glass"></i><p>${st.fav ? "Você ainda não favoritou nada." : "Nenhum produto com esses filtros."}</p></div>`;
    };
    $("#cat-chips").onclick = (e) => {
      const c = e.target.closest("[data-c]");
      if (!c) return;
      st.cat = c.dataset.c;
      $$("#cat-chips .chip").forEach((x) =>
        x.classList.toggle("active", x === c),
      );
      draw();
    };
    $("#pet-chips").onclick = (e) => {
      const c = e.target.closest("[data-p]");
      if (!c) return;
      st.pet = c.dataset.p;
      $$("#pet-chips .chip").forEach((x) =>
        x.classList.toggle("active", x === c),
      );
      draw();
    };
    $("#max").oninput = (e) => {
      st.max = +e.target.value;
      $("#max-l").textContent = brl(st.max);
      draw();
    };
    const sortRoot = $("#sortSelect"),
      sortTrigger = $("#sortTrigger"),
      sortMenu = $("#sortMenu"),
      sortLabel = $("#sortLabel");
    const sortNames = {
      rel: "Relevância",
      pop: "Mais vendidos",
      rating: "Melhor avaliados",
      low: "Menor preço",
      high: "Maior preço",
    };
    const closeSort = () => {
      sortMenu.hidden = true;
      sortTrigger.setAttribute("aria-expanded", "false");
    };
    sortTrigger.onclick = () => {
      const opening = sortMenu.hidden;
      sortMenu.hidden = !opening;
      sortTrigger.setAttribute("aria-expanded", String(opening));
    };
    sortMenu.onclick = (e) => {
      const option = e.target.closest("[data-sort]");
      if (!option) return;
      st.sort = option.dataset.sort;
      sortLabel.textContent = sortNames[st.sort];
      sortMenu
        .querySelectorAll("[role=option]")
        .forEach((item) =>
          item.setAttribute("aria-selected", String(item === option)),
        );
      closeSort();
      draw();
    };
    document.addEventListener("click", (e) => {
      if (sortRoot && !sortRoot.contains(e.target)) closeSort();
    });
    sortTrigger.onkeydown = (e) => {
      if (e.key === "Escape") closeSort();
    };
    $("#q").oninput = (e) => {
      st.q = e.target.value.toLowerCase();
      draw();
    };
    $("#fav-only").checked = st.fav;
    $("#fav-only").onchange = (e) => {
      st.fav = e.target.checked;
      draw();
    };
    draw();
  },
  produto() {
    const p =
      byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
    let q = 1;
    document.title = `${p.name} | PetLove`;
    $("#crumb").textContent = p.name;
    $("#pd-img").src = IMG + p.img;
    $("#pd-img").alt = p.name;
    $("#pd-info").innerHTML =
      `<span class="p-cat">${CATS[p.cat]}</span><h1 style="font-size:clamp(2rem,4vw,3rem);margin:.4rem 0">${p.name}</h1>
  ${ratingStars(p)}
  <div class="price" style="margin:1.4rem 0 .3rem"><strong style="font-size:2.2rem">${brl(p.price)}</strong>${p.old ? `<s>${brl(p.old)}</s>` : ""}</div>
  <div class="pix"><i class="fa-brands fa-pix"></i> ${brl(p.price * 0.95)} no PIX (5% off) · ou 3x de ${brl(p.price / 3)} sem juros</div>
  <p style="color:var(--muted);margin:1.4rem 0">${p.desc}</p>
  <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center"><div class="qty"><button id="qm">−</button><span id="qv">1</span><button id="qp">+</button></div>
  <button class="btn btn-primary" id="add-btn" data-add="${p.id}" data-qty="1"><i class="fa-solid fa-bag-shopping"></i> Adicionar ao carrinho</button>
  <button class="icon-btn p-fav ${Fav.has(p.id) ? "on" : ""}" style="position:static" data-fav="${p.id}"><i class="fa-${Fav.has(p.id) ? "solid" : "regular"} fa-heart"></i></button></div>
  <div class="card" style="margin-top:1.4rem;padding:1.1rem"><label class="field">Calcular frete<div class="inline-form"><input class="input" id="cep" placeholder="00000-000" maxlength="9"><button class="btn" id="cep-btn">Calcular</button></div></label><div id="cep-r" style="margin-top:.6rem;font-size:.9rem"></div></div>
  <div class="grid g3" style="margin-top:1.4rem;font-size:.82rem;color:var(--muted)"><span><i class="fa-solid fa-truck-fast" style="color:var(--cyan)"></i> Entrega em 24h</span><span><i class="fa-solid fa-rotate-left" style="color:var(--cyan)"></i> 30 dias para troca</span><span><i class="fa-solid fa-shield-halved" style="color:var(--cyan)"></i> Compra segura</span></div>`;
    const set = () => {
      $("#qv").textContent = q;
      $("#add-btn").dataset.qty = q;
    };
    $("#qm").onclick = () => {
      q = Math.max(1, q - 1);
      set();
    };
    $("#qp").onclick = () => {
      q++;
      set();
    };
    bindCep($("#cep"), $("#cep-btn"), $("#cep-r"));
    $("#tab-desc").innerHTML =
      `<p style="color:var(--muted)">${p.desc} Selecionado e testado pela nossa equipe de especialistas com pets reais antes de entrar no catálogo.</p>`;
    $("#tab-spec").innerHTML = `<div class="spec">${Object.entries(p.specs)
      .map(([k, v]) => `<div><b>${k.replace("_", " ")}</b>${v}</div>`)
      .join("")}</div>`;
    const drawReviews = () => {
      const own = Rating.list(p.id);
      $("#tab-rev").innerHTML =
        `<div class="review-summary card"><div><span class="review-average">${Rating.summary(p).avg.toFixed(1)}</span><div class="stars">${stars(Rating.summary(p).avg)}</div><small>${Rating.summary(p).count} avaliações</small></div><div><b>O que achou deste produto?</b><p style="color:var(--muted);margin:.35rem 0 0">Sua opinião ajuda outros tutores a escolher melhor.</p></div></div><form class="review-form card" id="review-form"><b>Deixe sua avaliação</b><div class="review-picker" role="group" aria-label="Escolha sua nota">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-review-star="${n}" aria-label="${n} estrelas">★</button>`).join("")}</div><input type="hidden" id="review-value"><textarea class="input" id="review-text" rows="3" placeholder="Conte como foi sua experiência (opcional)"></textarea><button class="btn btn-primary" type="submit">Enviar avaliação <i class="fa-solid fa-arrow-right"></i></button></form>${[
          ["Ana P.", 5, "Meu pet amou! Chegou super rápido."],
          ["Lucas M.", 5, "Qualidade excelente, vale cada centavo."],
          ["Bia R.", 4, "Muito bom, recomendo."],
        ]
          .map(
            ([n, r, t]) =>
              `<div class="card review-item"><div class="stars">${stars(r)}</div><p>${t}</p><small>${n} · compra verificada ✓</small></div>`,
          )
          .join(
            "",
          )}${own.map((x) => `<div class="card review-item"><div class="stars">${stars(x.value)}</div><p>${x.text || "Avaliação enviada por você."}</p><small>Sua avaliação · salva neste dispositivo</small></div>`).join("")}`;
      let chosen = own[0]?.value || 0;
      const paint = () =>
        $$("[data-review-star]").forEach((b) =>
          b.classList.toggle("active", +b.dataset.reviewStar <= chosen),
        );
      $$("[data-review-star]").forEach(
        (b) =>
          (b.onclick = () => {
            chosen = +b.dataset.reviewStar;
            $("#review-value").value = chosen;
            paint();
          }),
      );
      paint();
      $("#review-form").onsubmit = (e) => {
        e.preventDefault();
        if (!chosen)
          return toast("Escolha uma quantidade de estrelas", "fa-star");
        const all = Rating.all(),
          list = all[p.id] || [];
        const previous = list.find((x) => x.key === "local");
        Rating.add(p.id, chosen);
        const obj = Rating.all();
        const fresh = obj[p.id] || [];
        const entry = fresh.find((x) => x.key === "local");
        if (entry) entry.text = $("#review-text").value;
        obj[p.id] = fresh;
        store.set("pl_ratings", obj);
        drawReviews();
        $("#pd-info .rating-widget").outerHTML = ratingStars(p);
        toast(
          previous
            ? "Sua avaliação foi atualizada!"
            : "Avaliação enviada com sucesso!",
          "fa-star",
        );
      };
    };
    drawReviews();
    $$(".tabs button").forEach(
      (b) =>
        (b.onclick = () => {
          $$(".tabs button").forEach((x) =>
            x.classList.toggle("active", x === b),
          );
          $$(".tab-pane").forEach(
            (x) => (x.style.display = x.id === b.dataset.t ? "block" : "none"),
          );
        }),
    );
    $("#related").innerHTML = PRODUCTS.filter(
      (x) => x.id !== p.id && (x.cat === p.cat || x.pet === p.pet),
    )
      .slice(0, 4)
      .map(productCard)
      .join("");
    const rv = store.get("pl_recent", []).filter((x) => x !== p.id);
    store.set("pl_recent", [p.id, ...rv].slice(0, 8));
  },
  carrinho() {
    const draw = () => {
      const items = Cart.items(),
        t = Cart.totals();
      if (!items.length) {
        $("#cart-list").innerHTML =
          `<div class="empty card"><i class="fa-solid fa-box-open"></i><h3>Seu carrinho está vazio</h3><p>Que tal dar uma olhada nos mais vendidos?</p><a class="btn btn-primary" style="margin-top:1rem" href="produtos.html">Ir para a loja</a></div>`;
        $("#summary").style.display = "none";
        return;
      }
      $("#summary").style.display = "";
      $("#cart-list").innerHTML =
        items
          .map((i) => {
            const p = byId(i.id);
            return `<div class="cart-item"><img src="${IMG + p.img}" alt=""><div><span class="p-cat">${CATS[p.cat]}</span><a href="produto.html?id=${p.id}" style="display:block;font-weight:600">${p.name}</a><small class="mono" style="color:var(--muted)">${brl(p.price)} un.</small><div style="display:flex;gap:.6rem;margin-top:.5rem;align-items:center"><div class="qty"><button data-dec="${p.id}">−</button><span>${i.q}</span><button data-inc="${p.id}">+</button></div><button class="chip" data-rm="${p.id}"><i class="fa-solid fa-trash"></i> Remover</button></div></div><strong class="mono">${brl(p.price * i.q)}</strong></div>`;
          })
          .join("") +
        `<button class="btn btn-ghost" id="clear"><i class="fa-solid fa-broom"></i> Esvaziar carrinho</button>`;
      const pct = Math.min(100, (t.sub / FREE_SHIP) * 100);
      $("#ship-progress").innerHTML =
        `<small style="color:var(--muted)">${t.sub >= FREE_SHIP ? `<i class="fa-solid fa-gift" aria-hidden="true"></i> Frete grátis desbloqueado!` : `Faltam <b style="color:var(--primary)">${brl(FREE_SHIP - t.sub)}</b> para frete grátis`}</small><div class="progress"><i style="width:${pct}%"></i></div>`;
      $("#sum-rows").innerHTML = sumRows(t);
      $("#clear").onclick = () => {
        Cart.clear();
        draw();
      };
      $("#upsell").innerHTML = PRODUCTS.filter(
        (p) => !items.some((i) => i.id === p.id),
      )
        .sort((a, b) => a.price - b.price)
        .slice(0, 4)
        .map(productCard)
        .join("");
    };
    $("#cart-list").addEventListener("click", (e) => {
      const t = e.target.closest("[data-inc],[data-dec]");
      if (!t) return;
      const id = +(t.dataset.inc || t.dataset.dec);
      const it = Cart.items().find((x) => x.id === id);
      Cart.setQ(id, it.q + (t.dataset.inc ? 1 : -1));
      draw();
    });
    document.addEventListener("cart:changed", draw);
    document.body.dataset.noDrawer = "1";
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-add]")) setTimeout(draw, 0);
    });
    bindCoupon(draw);
    bindCep($("#cep"), $("#cep-btn"), $("#cep-r"), draw);
    draw();
  },
  checkout() {
    if (!Cart.items().length) {
      $("#co-main").innerHTML =
        `<div class="empty card"><i class="fa-solid fa-cart-shopping"></i><h3>Nada para finalizar</h3><p>Adicione produtos ao carrinho primeiro.</p><a class="btn btn-primary" style="margin-top:1rem" href="produtos.html">Ir para a loja</a></div>`;
      $("#co-side").remove();
      return;
    }
    let step = 0;
    const steps = $$(".step"),
      panes = $$(".pane");
    const go = (n) => {
      step = n;
      steps.forEach((s, i) => {
        s.classList.toggle("active", i === n);
        s.classList.toggle("done", i < n);
      });
      panes.forEach((p, i) => p.classList.toggle("active", i === n));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const side = () => {
      const t = Cart.totals();
      $("#co-items").innerHTML = Cart.items()
        .map((i) => {
          const p = byId(i.id);
          return `<div class="mini-item"><img src="${IMG + p.img}" alt=""><div>${p.name}<br><small class="mono" style="color:var(--muted)">${i.q}×</small></div><span class="mono">${brl(p.price * i.q)}</span></div>`;
        })
        .join("");
      $("#co-sum").innerHTML = sumRows(t);
    };
    side();
    const valid = (pane) => {
      let ok = true;
      $$("[required]:not(:disabled)", pane).forEach((i) => {
        const bad =
          !i.value.trim() ||
          (i.pattern && !new RegExp("^" + i.pattern + "$").test(i.value));
        i.style.borderColor = bad ? "var(--danger)" : "";
        if (bad) ok = false;
      });
      if (!ok)
        toast("Preencha os campos destacados", "fa-triangle-exclamation");
      return ok;
    };
    $$("[data-next]").forEach(
      (b) =>
        (b.onclick = () => {
          if (valid(panes[step])) go(step + 1);
        }),
    );
    $$("[data-prev]").forEach((b) => (b.onclick = () => go(step - 1)));
    // masks
    const mask = (el, f) =>
      el &&
      el.addEventListener(
        "input",
        () => (el.value = f(el.value.replace(/\D/g, ""))),
      );
    mask($("[name=cpf]"), (v) =>
      v
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
    );
    mask($("[name=cep]"), (v) => v.slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"));
    mask($("#cc-num"), (v) => v.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "));
    mask($("#cc-exp"), (v) => v.slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2"));
    mask($("#cc-cvv"), (v) => v.slice(0, 4));
    $("[name=cep]").addEventListener("blur", async (e) => {
      const c = e.target.value.replace(/\D/g, "");
      if (c.length !== 8) return;
      try {
        const r = await (
          await fetch(`https://viacep.com.br/ws/${c}/json/`)
        ).json();
        if (!r.erro) {
          $("[name=street]").value = r.logradouro;
          $("[name=district]").value = r.bairro;
          $("[name=city]").value = `${r.localidade} - ${r.uf}`;
          toast("Endereço preenchido automaticamente", "fa-location-dot");
          $("[name=number]").focus();
        }
      } catch {}
    });
    // A seleção do meio de pagamento e a finalização real são controladas por backend.js.
  },
  servicos() {
    const f = $("#book-form");
    const d = $("[name=date]", f);
    // Campo de data digitável (DD/MM/AAAA), sem abrir calendário nativo no celular.
    d.setAttribute("inputmode", "numeric");
    d.setAttribute("placeholder", "DD/MM/AAAA");
    d.setAttribute("maxlength", "10");
    d.setAttribute("pattern", "\\d{2}/\\d{2}/\\d{4}");
    d.addEventListener("input", () => {
      const digits = d.value.replace(/\D/g, "").slice(0, 8);
      d.value = digits
        .replace(/^(\d{2})(\d)/, "$1/$2")
        .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");
    });
    const parseBookingDate = (value) => {
      const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
      if (!match) return null;
      const day = Number(match[1]), month = Number(match[2]), year = Number(match[3]);
      const date = new Date(year, month - 1, day);
      if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
      date.setHours(0, 0, 0, 0);
      return date;
    };
    const slots = [
      "09:00",
      "10:00",
      "11:00",
      "13:30",
      "14:30",
      "15:30",
      "16:30",
      "17:30",
    ];
    d.onchange = () => {
      const selectedDate = parseBookingDate(d.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!selectedDate || selectedDate < today) {
        $("#slots").innerHTML = '<small style="color:var(--muted)">Digite uma data válida a partir de hoje (DD/MM/AAAA)</small>';
        return;
      }
      const seed = selectedDate.getDate();
      $("#slots").innerHTML = slots
        .map((s, i) => {
          const off = (seed + i) % 3 === 0;
          return `<span class="chip ${off ? "" : ""}" ${off ? 'style="opacity:.35;pointer-events:none;text-decoration:line-through"' : ""} data-slot="${s}">${s}</span>`;
        })
        .join("");
    };
    $("#slots").onclick = (e) => {
      const c = e.target.closest("[data-slot]");
      if (!c) return;
      $$("#slots .chip").forEach((x) => x.classList.toggle("active", x === c));
      f.dataset.slot = c.dataset.slot;
    };
    $$("[data-svc]").forEach(
      (b) =>
        (b.onclick = () => {
          $("[name=service]", f).value = b.dataset.svc;
          location.hash = "agendar";
        }),
    );
    $$("[data-plan]").forEach(
      (b) =>
        (b.onclick = () =>
          toast(
            `Plano ${b.dataset.plan} selecionado — em breve no checkout!`,
            "fa-crown",
          )),
    );
  },
  sobre() {
    $$("[data-count]").forEach((el) => {
      const io = new IntersectionObserver(([x]) => {
        if (!x.isIntersecting) return;
        io.disconnect();
        const to = +el.dataset.count;
        let n = 0;
        const iv = setInterval(() => {
          n += to / 50;
          if (n >= to) {
            n = to;
            clearInterval(iv);
          }
          el.textContent =
            Math.round(n).toLocaleString("pt-BR") + (el.dataset.suffix || "");
        }, 25);
      });
      io.observe(el);
    });
  },
  contato() {},
  rastreio() {
    const last = store.get("pl_last_order", null);
    const qs = new URLSearchParams(location.search).get("code");
    if (qs || last) $("#code").value = qs || last.code;
    const run = () => {
      const c = $("#code").value.trim().toUpperCase();
      if (!/^PL\d{4,}$/.test(c)) {
        $("#track").innerHTML =
          `<p style="color:var(--danger)">Código inválido. Use o formato PL12345678.</p>`;
        return;
      }
      const n = (parseInt(c.slice(-2)) % 4) + 1;
      const S = [
        ["fa-receipt", "Pedido recebido"],
        ["fa-box", "Separado"],
        ["fa-truck-fast", "Em rota"],
        ["fa-house-circle-check", "Entregue"],
      ];
      $("#track").innerHTML =
        `<div class="card"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem"><div><small class="mono" style="color:var(--muted)">PEDIDO</small><h3 class="mono" style="color:var(--primary)">${c}</h3></div><div><small class="mono" style="color:var(--muted)">PREVISÃO</small><h3>${new Date(Date.now() + 864e5 * (4 - n)).toLocaleDateString("pt-BR")}</h3></div></div>
   <div class="track-line">${S.map(([i, t], k) => `<div class="track-step ${k < n ? "done" : ""}"><i class="fa-solid ${i}"></i>${t}</div>`).join("")}</div>
   <div style="font-size:.9rem;color:var(--muted)">${S.slice(0, n)
     .reverse()
     .map(
       ([, t], k) =>
         `<div style="padding:.5rem 0;border-top:1px solid var(--line)"><span class="mono" style="color:var(--cyan)">${new Date(Date.now() - k * 36e5 * 5).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span> — ${t}</div>`,
     )
     .join("")}</div></div>`;
    };
    $("#track-form").onsubmit = (e) => {
      e.preventDefault();
      run();
    };
    if ($("#code").value) run();
  },
};
/* 08. utilitários de formulário */
function sumRows(t) {
  return `<div class="sum-row"><span>Subtotal</span><span>${brl(t.sub)}</span></div>
 ${t.disc ? `<div class="sum-row" style="color:var(--primary)"><span>Cupom ${t.coupon}</span><span>− ${brl(t.disc)}</span></div>` : ""}
 ${t.pixDisc ? `<div class="sum-row" style="color:var(--primary)"><span>5% off PIX</span><span>− ${brl(t.pixDisc)}</span></div>` : ""}
 <div class="sum-row"><span>Frete</span><span>${t.ship ? brl(t.ship) : "Grátis"}</span></div><div class="sum-row total"><span>Total</span><span>${brl(t.total)}</span></div>`;
}
function bindCoupon(cb) {
  const f = $("#coupon-form");
  if (!f) return;
  const show = () => {
    const c = store.get("pl_coupon", null);
    $("#coupon-msg").innerHTML = c
      ? `<span style="color:var(--primary)">✓ ${c} aplicado (${COUPONS[c].label})</span> <a href="#" id="rm-c" style="color:var(--muted)">remover</a>`
      : `<small style="color:var(--muted)">Experimente: PETLOVE10, BEMVINDO, FRETEZERO</small>`;
    const r = $("#rm-c");
    if (r)
      r.onclick = (e) => {
        e.preventDefault();
        store.set("pl_coupon", null);
        show();
        cb();
      };
  };
  f.onsubmit = (e) => {
    e.preventDefault();
    const v = $("input", f).value.trim().toUpperCase();
    if (COUPONS[v]) {
      store.set("pl_coupon", v);
      toast("Cupom aplicado!", "fa-ticket");
      f.reset();
    } else toast("Cupom inválido", "fa-circle-xmark");
    show();
    cb();
  };
  show();
}
function bindCep(inp, btn, out, cb) {
  if (!inp) return;
  inp.oninput = () =>
    (inp.value = inp.value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2"));
  btn.onclick = async (e) => {
    e.preventDefault();
    const c = inp.value.replace(/\D/g, "");
    if (c.length !== 8) {
      out.innerHTML = `<span style="color:var(--danger)">CEP inválido</span>`;
      return;
    }
    out.textContent = "Calculando…";
    let city = "";
    try {
      const r = await (
        await fetch(`https://viacep.com.br/ws/${c}/json/`)
      ).json();
      if (!r.erro) city = `${r.localidade}/${r.uf}`;
    } catch {}
    const base = +c[0] < 4 ? 14.9 : 22.9;
    store.set("pl_ship", base);
    out.innerHTML = `${city ? `<b>${city}</b><br>` : ""}<i class="fa-solid fa-truck" aria-hidden="true"></i> Padrão (3-5 dias): ${brl(base)}<br><i class="fa-solid fa-bolt" aria-hidden="true"></i> Expresso (24h): ${brl(base + 15)}<br><small style="color:var(--primary)">Grátis acima de ${brl(FREE_SHIP)}</small>`;
    cb && cb();
  };
}
function confetti() {
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:300";
  document.body.append(c);
  const x = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  const cols = ["#b6ff3b", "#38e1ff", "#ff5fa2", "#ffb547"];
  const ps = Array.from({ length: 160 }, () => ({
    x: Math.random() * c.width,
    y: -20 - Math.random() * c.height,
    s: 4 + Math.random() * 6,
    v: 2 + Math.random() * 4,
    c: cols[Math.floor(Math.random() * 4)],
    r: Math.random() * 6,
  }));
  let f = 0;
  (function a() {
    x.clearRect(0, 0, c.width, c.height);
    ps.forEach((p) => {
      p.y += p.v;
      p.r += 0.1;
      x.fillStyle = p.c;
      x.save();
      x.translate(p.x, p.y);
      x.rotate(p.r);
      x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      x.restore();
    });
    if (++f < 200) requestAnimationFrame(a);
    else c.remove();
  })();
}

/* 09. seletores personalizados */
function initCustomSelects() {
  const refresh = (select, trigger, menu) => {
    const option = select.options[select.selectedIndex];
    trigger.querySelector(".custom-select-value").textContent =
      option?.textContent || "Selecione";
    menu.querySelectorAll("[role=option]").forEach((item, index) => {
      const selected = select.options[index] === option;
      item.setAttribute("aria-selected", String(selected));
      item.classList.toggle("is-selected", selected);
    });
  };
  document
    .querySelectorAll("select:not([data-customized])")
    .forEach((select) => {
      select.dataset.customized = "true";
      const wrap = document.createElement("div");
      wrap.className = "custom-select";
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      trigger.innerHTML =
        '<span class="custom-select-value"></span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
      const menu = document.createElement("div");
      menu.className = "custom-select-menu";
      menu.hidden = true;
      menu.setAttribute("role", "listbox");
      [...select.options].forEach((option, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "custom-select-option";
        item.setAttribute("role", "option");
        item.textContent = option.textContent;
        item.disabled = option.disabled;
        item.addEventListener("click", () => {
          select.selectedIndex = index;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          refresh(select, trigger, menu);
          menu.hidden = true;
          trigger.setAttribute("aria-expanded", "false");
        });
        menu.append(item);
      });
      select.parentNode.insertBefore(wrap, select);
      wrap.append(trigger, menu, select);
      select.classList.add("custom-select-native");
      trigger.addEventListener("click", () => {
        const open = trigger.getAttribute("aria-expanded") === "true";
        document
          .querySelectorAll(".custom-select-menu")
          .forEach((m) => (m.hidden = true));
        document
          .querySelectorAll(".custom-select-trigger")
          .forEach((b) => b.setAttribute("aria-expanded", "false"));
        menu.hidden = open;
        trigger.setAttribute("aria-expanded", String(!open));
      });
      select.addEventListener("change", () => refresh(select, trigger, menu));
      const form = select.closest("form");
      if (form)
        form.addEventListener("reset", () =>
          requestAnimationFrame(() => refresh(select, trigger, menu)),
        );
      refresh(select, trigger, menu);
    });
  if (!document.documentElement.dataset.selectDismiss) {
    document.documentElement.dataset.selectDismiss = "true";
    document.addEventListener("click", (event) => {
      if (event.target.closest(".custom-select")) return;
      document
        .querySelectorAll(".custom-select-menu")
        .forEach((menu) => (menu.hidden = true));
      document
        .querySelectorAll(".custom-select-trigger")
        .forEach((button) => button.setAttribute("aria-expanded", "false"));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document
          .querySelectorAll(".custom-select-menu")
          .forEach((menu) => (menu.hidden = true));
        document
          .querySelectorAll(".custom-select-trigger")
          .forEach((button) => button.setAttribute("aria-expanded", "false"));
      }
    });
  }
}

function initPhoneMasks() {
  document
    .querySelectorAll('input[name="phone"], input[data-mask="phone"]')
    .forEach((input) => {
      if (input.dataset.phoneMaskReady === "true") return;
      input.dataset.phoneMaskReady = "true";
      const formatPhone = () => {
        const digits = input.value.replace(/\D/g, "").slice(0, 11);
        if (!digits) {
          input.value = "";
          return;
        }
        if (digits.length <= 10) {
          input.value = digits
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
        } else {
          input.value = digits
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
        }
      };
      input.addEventListener("input", formatPhone);
      input.addEventListener("paste", () => requestAnimationFrame(formatPhone));
      if (input.value) formatPhone();
    });
}

/* 9.5 preenchimento automático dos dados do cliente */
function initCustomerAutofill() {
  const KEY = "petlove_customer_profile_v1";
  const formSelectors = ["#co-form", "#book-form", "#contact-form"];
  const allowed = new Set([
    "name",
    "email",
    "phone",
    "pet",
    "cep",
    "number",
    "street",
    "district",
    "city",
    "comp",
    "service",
    "size",
  ]);
  const readProfile = () => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  };
  const writeProfile = (form) => {
    const profile = readProfile();
    new FormData(form).forEach((value, key) => {
      if (allowed.has(key) && String(value).trim())
        profile[key] = String(value).trim();
    });
    try {
      localStorage.setItem(KEY, JSON.stringify(profile));
    } catch {}
  };
  const saved = readProfile();
  formSelectors.forEach((selector) => {
    const form = document.querySelector(selector);
    if (!form) return;
    form.querySelectorAll("[name]").forEach((field) => {
      if (!allowed.has(field.name)) return;
      if (!field.value && saved[field.name] && field.type !== "date")
        field.value = saved[field.name];
    });
    const consent = document.createElement("label");
    consent.className = "full";
    consent.style.cssText =
      "display:flex;align-items:flex-start;gap:.6rem;margin-top:1rem;color:var(--muted);font-size:.88rem;line-height:1.45;cursor:pointer";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Object.keys(saved).length > 0;
    checkbox.style.cssText =
      "margin-top:.2rem;accent-color:var(--primary);flex:0 0 auto";
    const copy = document.createElement("span");
    copy.textContent =
      "Salvar meus dados neste dispositivo para preencher automaticamente nas próximas visitas. Não salvamos dados de pagamento.";
    consent.append(checkbox, copy);
    const actions = document.createElement("div");
    actions.className = "full";
    actions.style.cssText =
      "display:flex;justify-content:flex-end;margin-top:.35rem";
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "btn btn-soft";
    clear.style.cssText = "padding:.45rem .7rem;font-size:.78rem";
    clear.textContent = "Apagar dados salvos neste dispositivo";
    clear.addEventListener("click", () => {
      try {
        localStorage.removeItem(KEY);
      } catch {}
      checkbox.checked = false;
      form.querySelectorAll("[name]").forEach((field) => {
        if (allowed.has(field.name)) field.value = "";
      });
      if (typeof toast === "function")
        toast("Dados salvos apagados deste dispositivo", "fa-trash");
    });
    actions.append(clear);
    const anchor = form.querySelector(
      "button[type=submit], button:not([type])",
    );
    if (anchor?.parentNode) {
      anchor.parentNode.insertBefore(consent, anchor);
      anchor.parentNode.insertBefore(actions, anchor);
    } else form.append(consent, actions);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) writeProfile(form);
      else {
        try {
          localStorage.removeItem(KEY);
        } catch {}
      }
    });
    form.addEventListener("input", () => {
      if (checkbox.checked) writeProfile(form);
    });
    form.addEventListener("change", () => {
      if (checkbox.checked) writeProfile(form);
    });
    form.addEventListener("submit", () => {
      if (checkbox.checked) writeProfile(form);
    });
  });
}

/* 10. inicialização */
document.addEventListener("DOMContentLoaded", async () => {
  // O catálogo persistido no servidor é a fonte principal; a lista local serve como fallback offline.
  try {
    const response = await fetch("/api/products", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.products) && data.products.length) {
        PRODUCTS = data.products.map((p) => ({
          ...p,
          desc: p.desc || p.description || "",
          specs: p.specs || {},
        }));
      }
    }
  } catch (error) {
    console.warn("Catálogo remoto indisponível; usando catálogo local.", error);
  }
  layout();
  bindGlobal();
  initCustomerAutofill();
  updateBadges();
  renderMini();
  Pages[document.body.dataset.page]?.();
  initCustomSelects();
  initPhoneMasks();
});

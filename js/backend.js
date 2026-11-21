/* Integração PetLove API. O servidor recalcula preços, descontos e totais. */
(() => {
  const API = "/api";
  const request = async (path, options = {}) => {
    const response = await fetch(API + path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.error || "Não foi possível concluir a operação.");
    return data;
  };
  const formData = (form) => Object.fromEntries(new FormData(form).entries());
  const escapeHtml = (value) =>
    String(value ?? "").replace(
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

  document.addEventListener("DOMContentLoaded", () => {
    // PetBot: usa IA no servidor quando OPENAI_API_KEY estiver configurada.
    window.botReply = async (message) => {
      const body = document.querySelector("#chat-body");
      if (!body) return;
      const user = document.createElement("div");
      user.className = "msg me";
      user.textContent = message;
      body.append(user);
      const waiting = document.createElement("div");
      waiting.className = "msg";
      waiting.textContent = "PetBot está digitando…";
      body.append(waiting);
      body.scrollTop = body.scrollHeight;
      try {
        const data = await request("/bot", {
          method: "POST",
          body: JSON.stringify({ message }),
        });
        waiting.textContent = data.reply;
      } catch {
        waiting.textContent =
          "Não consegui responder agora. Tente novamente em instantes.";
      }
      body.scrollTop = body.scrollHeight;
    };

    // Formulário de contato persistido no banco.
    const contact = document.querySelector("#contact-form");
    if (contact)
      contact.onsubmit = async (e) => {
        e.preventDefault();
        const data = formData(contact);
        const payload = {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        };
        const submit = contact.querySelector(
          "button[type=submit],button:not([type])",
        );
        if (submit) submit.disabled = true;
        try {
          await request("/contact", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          contact.reset();
          window.toast?.(
            "Sua mensagem foi recebida pela equipe PetLove.",
            "fa-paper-plane",
          );
        } catch (err) {
          window.toast?.(err.message, "fa-circle-xmark");
        } finally {
          if (submit) submit.disabled = false;
        }
      };

    const newsletter = document.querySelector("#news-form");
    if (newsletter)
      newsletter.onsubmit = async (e) => {
        e.preventDefault();
        const email = newsletter.querySelector(
          "input[type=email],input",
        )?.value;
        const submit = newsletter.querySelector(
          "button[type=submit],button:not([type])",
        );
        if (submit) submit.disabled = true;
        try {
          await request("/newsletter", {
            method: "POST",
            body: JSON.stringify({ email }),
          });
          newsletter.reset();
          window.toast?.(
            "Seu e-mail foi cadastrado na newsletter PetLove.",
            "fa-envelope",
          );
        } catch (err) {
          window.toast?.(err.message, "fa-circle-xmark");
        } finally {
          if (submit) submit.disabled = false;
        }
      };

    // Agendamento: horário é validado no servidor para evitar dupla reserva.
    const booking = document.querySelector("#book-form");
    if (booking)
      booking.onsubmit = async (e) => {
        e.preventDefault();
        if (!booking.dataset.slot) {
          window.toast?.("Escolha um horário.", "fa-clock");
          return;
        }
        const d = formData(booking);
        // A API recebe a data normalizada em ISO, embora o usuário digite DD/MM/AAAA.
        const dateParts = String(d.date || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!dateParts) {
          window.toast?.("Informe a data no formato DD/MM/AAAA.", "fa-calendar-xmark");
          return;
        }
        const parsedDate = new Date(Number(dateParts[3]), Number(dateParts[2]) - 1, Number(dateParts[1]));
        if (parsedDate.getFullYear() !== Number(dateParts[3]) || parsedDate.getMonth() !== Number(dateParts[2]) - 1 || parsedDate.getDate() !== Number(dateParts[1])) {
          window.toast?.("Informe uma data válida.", "fa-calendar-xmark");
          return;
        }
        d.date = `${dateParts[3]}-${dateParts[2]}-${dateParts[1]}`;
        d.slot = booking.dataset.slot;
        try {
          await request("/bookings", {
            method: "POST",
            body: JSON.stringify(d),
          });
          const result = document.querySelector("#book-result");
          if (result)
            result.innerHTML =
              '<div class="card"><b>Solicitação registrada!</b><p>A equipe PetLove confirmará o horário por contato.</p></div>';
          booking.reset();
          delete booking.dataset.slot;
          document.querySelector("#slots").innerHTML = "";
          window.toast?.(
            "Solicitação de agendamento enviada! A equipe PetLove confirmará o horário.",
            "fa-calendar-check",
          );
        } catch (err) {
          window.toast?.(err.message, "fa-circle-xmark");
        }
      };

    // Cupom validado na API; só então o cálculo visual local é atualizado.
    document.querySelectorAll("#coupon-form").forEach(
      (form) =>
        (form.onsubmit = async (e) => {
          e.preventDefault();
          const input = form.querySelector("input");
          const code = input.value.trim().toUpperCase();
          try {
            await request("/coupons/validate", {
              method: "POST",
              body: JSON.stringify({ code }),
            });
            localStorage.setItem("pl_coupon", JSON.stringify(code));
            input.value = "";
            window.toast?.("Cupom validado e aplicado.", "fa-ticket");
            location.reload();
          } catch (err) {
            const msg = document.querySelector("#coupon-msg");
            if (msg) msg.textContent = err.message;
          }
        }),
    );

    // Cotação de frete por CEP; preço e modalidade enviados ao backend.
    const cepBtn = document.querySelector("#cep-btn");
    if (cepBtn)
      cepBtn.onclick = async (e) => {
        e.preventDefault();
        const cep = document.querySelector("#cep")?.value || "";
        const subtotal = window.PetLoveCart?.subtotal?.() || 0;
        const out = document.querySelector("#cep-r");
        try {
          const data = await request("/shipping/quote", {
            method: "POST",
            body: JSON.stringify({ cep, subtotal }),
          });
          const standard = data.options.find((o) => o.id === "standard");
          if (standard) {
            localStorage.setItem("pl_ship", JSON.stringify(standard.price));
            document.dispatchEvent(new Event("cart:changed"));
          }
          out.innerHTML =
            data.options
              .map(
                (o) =>
                  `<div><b>${escapeHtml(o.name)}</b> · ${escapeHtml(o.days)} · ${o.price === 0 ? "Grátis" : Number(o.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>`,
              )
              .join("") + `<small>${escapeHtml(data.notice)}</small>`;
        } catch (err) {
          out.textContent = err.message;
        }
      };

    // Seleção do meio de pagamento: o cartão inteiro responde ao clique e ao teclado.
    const payOptions = [...document.querySelectorAll(".pay-opt")];
    const setPaymentMethod = (method) => {
      payOptions.forEach((option) => {
        const selected = option.dataset.pay === method;
        option.classList.toggle("active", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      document.querySelectorAll("[data-paypane]").forEach((pane) => {
        pane.style.display = pane.dataset.paypane === method ? "flex" : "none";
      });
      try {
        localStorage.setItem("pl_pay", method);
      } catch {}
    };
    payOptions.forEach((option) => {
      option.addEventListener("click", () =>
        setPaymentMethod(option.dataset.pay),
      );
      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setPaymentMethod(option.dataset.pay);
        }
      });
    });
    let initialPayment = "pix";
    try {
      const saved = localStorage.getItem("pl_pay");
      if (["pix", "card", "boleto"].includes(saved)) initialPayment = saved;
    } catch {}
    setPaymentMethod(initialPayment);

    // Checkout: checkout hospedado do Mercado Pago. Dados de cartão nunca passam pela loja.
    const finish = document.querySelector("#finish");
    if (finish) {
      const cardBox = document.querySelector("#cc-box");
      if (cardBox) {
        cardBox.innerHTML =
          "<p>O pagamento com cartão é realizado em ambiente seguro do Mercado Pago após confirmar o pedido. Os dados do cartão não são armazenados pela PetLove.</p>";
      }
      finish.onclick = async () => {
        const form = document.querySelector("#co-form");
        const panes = document.querySelectorAll(".pane");
        const required = [
          ...panes[0].querySelectorAll("[required]"),
          ...panes[1].querySelectorAll("[required]"),
        ];
        for (const el of required) {
          if (!el.value.trim() || !el.checkValidity()) {
            el.reportValidity();
            el.focus();
            return;
          }
        }
        const data = formData(form);
        const pay =
          document.querySelector(".pay-opt.active")?.dataset.pay || "pix";
        const ship = document.querySelector("input[name=ship]:checked");
        const shipping =
          ship && Number(ship.value) > 25 ? "express" : "standard";
        let coupon = null;
        try {
          coupon = JSON.parse(localStorage.getItem("pl_coupon") || "null");
        } catch {}
        const payload = {
          customer: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            cpf: data.cpf,
            pet: data.pet,
          },
          address: {
            cep: data.cep,
            street: data.street,
            number: data.number,
            district: data.district,
            city: data.city,
            comp: data.comp,
          },
          items: (window.PetLoveCart?.items?.() || []).map((item) => ({
            id: Number(item.id),
            q: Number(item.q),
          })),
          coupon,
          shipping,
          paymentMethod: pay,
        };
        finish.disabled = true;
        finish.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Conectando ao Mercado Pago…';
        try {
          const result = await request("/orders", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          if (!result.checkoutUrl || !result.paymentConfigured) {
            throw new Error(
              "O pagamento ainda não está configurado. Entre em contato com a PetLove; nenhum pagamento foi realizado.",
            );
          }
          localStorage.setItem(
            "pl_last_order",
            JSON.stringify({
              code: result.order.code,
              total: result.order.total,
              date: Date.now(),
              name: data.name,
            }),
          );
          window.PetLoveCart?.clear?.();
          location.assign(result.checkoutUrl);
          return;
        } catch (err) {
          window.toast?.(err.message, "fa-circle-xmark");
          finish.disabled = false;
          finish.innerHTML =
            '<i class="fa-brands fa-mercado-pago" aria-hidden="true"></i> Pagar com Mercado Pago';
        }
      };
    }

    // Rastreamento consulta pedidos reais persistidos no servidor.
    const trackForm = document.querySelector("#track-form");
    if (trackForm)
      trackForm.onsubmit = async (e) => {
        e.preventDefault();
        const code = document.querySelector("#code").value.trim().toUpperCase();
        const target = document.querySelector("#track");
        target.textContent = "Consultando pedido…";
        try {
          const data = await request(
            `/orders/${encodeURIComponent(code)}/tracking`,
          );
          target.innerHTML = `<div class="card"><h3>Pedido ${escapeHtml(data.code)}</h3><p>Status do pagamento: <b>${escapeHtml(data.paymentStatus)}</b></p><div class="track-line">${data.events.map((ev) => `<div class="track-step done"><i class="fa-solid fa-circle-check"></i>${escapeHtml(ev.description)}<small>${new Date(ev.date).toLocaleString("pt-BR")}</small></div>`).join("")}</div></div>`;
        } catch (err) {
          target.textContent = err.message;
        }
      };
  });
})();

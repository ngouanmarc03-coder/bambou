/* =========================================================
   BAMBOU — Réservation de table + menu à l'avance
   Envoi via Netlify Forms : chaque demande arrive dans
   l'espace Netlify (Forms) et par e-mail si activé.
   ========================================================= */
(() => {
  const D = window.BAMBOU;
  const $ = (s) => document.querySelector(s);
  const form = $("#resaForm");
  if (!form) return;
  const euro = (n) => n.toFixed(2).replace(".", ",") + " €";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const R = D.reservation;

  /* Date : à partir d'aujourd'hui, jusqu'à 60 jours */
  const date = $("#rDate");
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = new Date();
  date.min = iso(today);
  date.max = iso(new Date(today.getTime() + R.joursMax * 864e5));

  /* Créneaux horaires (modifiables dans js/data.js) */
  const heure = $("#rHeure");
  const toMin = (s) => { const [a, b] = s.split(":").map(Number); return a * 60 + b; };
  const dateField = date.closest(".field");
  const dateMsg = document.createElement("small");
  dateMsg.className = "field__msg"; dateMsg.hidden = true;
  dateField.append(dateMsg);
  const fillSlots = () => {
    const day = date.value ? new Date(date.value + "T12:00").getDay() : null;
    const hours = day === null ? null : D.infos.horaires[day];
    dateMsg.hidden = true; dateField.classList.remove("is-error");
    if (day !== null && !hours) {
      dateMsg.textContent = "Nous sommes fermés ce jour-là (dimanche). Choisissez une autre date.";
      dateMsg.hidden = false; dateField.classList.add("is-error");
      date.value = "";
      heure.innerHTML = `<option value="">Choisissez d'abord une date</option>`;
      return;
    }
    const isToday = date.value === iso(new Date());
    const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes() + 30;
    heure.innerHTML = `<option value="">Choisir…</option>` + R.creneaux
      .filter((h) => !hours || (toMin(h) >= toMin(hours[0]) && toMin(h) <= toMin(hours[1]) - 45))
      .filter((h) => !isToday || toMin(h) >= nowMin)
      .map((h) => `<option value="${h}">${h.replace(":", "h")}</option>`).join("");
    if (heure.options.length === 1) heure.innerHTML = `<option value="">Plus de créneau ce jour-là</option>`;
  };
  fillSlots();
  date.addEventListener("change", () => { fillSlots(); recap(); });

  /* Nombre de personnes */
  const pers = $("#rPers");
  document.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => {
    pers.value = Math.min(20, Math.max(1, (+pers.value || 1) + +b.dataset.step));
    recap();
  }));

  /* Choix des plats */
  const basket = new Map(); // index -> quantité
  const cats = D.categories;
  let cat = cats[0].id;
  const renderTabs = () => {
    $("#pTabs").innerHTML = cats.map((c) => `<button type="button" class="chip${c.id === cat ? " is-active" : ""}" data-pc="${c.id}"><svg class="ico"><use href="#i-${c.icone}"/></svg> ${esc(c.nom)}</button>`).join("");
  };
  const renderList = () => {
    $("#pList").innerHTML = D.plats.map((p, i) => ({ p, i })).filter(({ p }) => p.cat === cat).map(({ p, i }) => {
      const q = basket.get(i) || 0;
      return `<div class="pick${q ? " is-on" : ""}">
        <img src="images/${p.img}.webp" alt="" loading="lazy">
        <div class="pick__txt"><b>${esc(p.nom)}</b><span>${euro(p.prix)}</span></div>
        <div class="stepper stepper--sm">
          <button type="button" data-q="${i}" data-d="-1" aria-label="Retirer ${esc(p.nom)}"${q ? "" : " disabled"}>−</button>
          <output>${q}</output>
          <button type="button" data-q="${i}" data-d="1" aria-label="Ajouter ${esc(p.nom)}">+</button>
        </div></div>`;
    }).join("");
  };
  const renderBasket = () => {
    const items = [...basket].filter(([, q]) => q > 0);
    const total = items.reduce((s, [i, q]) => s + D.plats[i].prix * q, 0);
    $("#basketList").innerHTML = items.length
      ? items.map(([i, q]) => `<li><span>${q} × ${esc(D.plats[i].nom)}</span><b>${euro(D.plats[i].prix * q)}</b></li>`).join("")
      : `<li class="basket__empty">Aucun plat sélectionné pour le moment.</li>`;
    $("#basketTotal").textContent = euro(total);
    $("#rPre").value = items.map(([i, q]) => `${q} x ${D.plats[i].nom} (${euro(D.plats[i].prix * q)})`).join("\n");
    $("#rTotal").value = items.length ? euro(total) : "";
    $("#sPlats").textContent = items.length ? `${items.reduce((s, [, q]) => s + q, 0)} plat(s)` : "Aucun";
    $("#sTotal").textContent = euro(total);
    const bk = $("#basket"); bk.classList.remove("bump"); void bk.offsetWidth; bk.classList.add("bump");
  };
  renderTabs(); renderList();
  $("#pTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-pc]"); if (!b) return; cat = b.dataset.pc; renderTabs(); renderList(); });
  $("#pList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-q]"); if (!b) return;
    const i = +b.dataset.q;
    basket.set(i, Math.max(0, Math.min(20, (basket.get(i) || 0) + +b.dataset.d)));
    renderList(); renderBasket();
  });

  /* Récapitulatif en direct */
  function recap() {
    $("#sDate").textContent = date.value ? new Date(date.value + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "À choisir";
    $("#sHeure").textContent = heure.value ? heure.value.replace(":", "h") : "À choisir";
    $("#sPers").textContent = pers.value;
    $("#sPlace").textContent = (form.querySelector("[name=placement]:checked") || {}).value || "";
    $("#groupNote").hidden = +pers.value <= 8;
  }
  form.addEventListener("input", recap);
  form.addEventListener("change", recap);
  recap();

  /* Vérification avant envoi */
  form.addEventListener("submit", (e) => {
    let ok = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const bad = f.type === "checkbox" ? !f.checked : !f.value || !f.checkValidity();
      (f.closest(".field, .check") || f).classList.toggle("is-error", bad);
      if (bad) ok = false;
    });
    $("#formError").hidden = ok;
    if (!ok) {
      e.preventDefault();
      form.querySelector(".is-error").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    try {
      sessionStorage.setItem("bambou-resa", JSON.stringify({
        date: $("#sDate").textContent, heure: $("#sHeure").textContent, personnes: pers.value,
        place: $("#sPlace").textContent, plats: $("#rPre").value, total: $("#rTotal").value,
      }));
    } catch (err) {}
  });
})();

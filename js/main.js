/* =========================================================
   BAMBOU — Interactions et effets (toutes les pages)
   Chaque bloc ne s'active que si la page contient l'élément.
   ========================================================= */
(() => {
  const D = window.BAMBOU;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const on = (sel, fn) => { const el = $(sel); if (el) fn(el); };
  const euro = (n) => (n === 0 ? "Offerte" : n.toFixed(2).replace(".", ",") + " €");
  const img = (name) => `images/${name}.webp`;
  const PRODUCT_CATS = ["boissons", "bieres"];
  const TAGS = { halal: "Halal", vege: "Végétarien", epice: "Épicé", promo: "1 acheté = 1 offert", mer: "Fruits de mer" };
  const catOf = (id) => D.categories.find((c) => c.id === id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tagHtml = (tags = []) => tags.filter((t) => t !== "populaire").map((t) => `<span class="tag tag--${t}">${TAGS[t]}</span>`).join("");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const root = document.documentElement;

  /* ---------- Liens dynamiques ---------- */
  $$(".js-deliveroo").forEach((a) => { a.href = D.infos.deliveroo; a.target = "_blank"; a.rel = "noopener"; });
  $$(".js-maps").forEach((a) => (a.href = D.infos.maps));
  $$(".js-count").forEach((el) => (el.textContent = D.plats.length));

  /* ---------- Thème jour / nuit ---------- */
  try { const t = localStorage.getItem("bambou-theme"); if (t) root.dataset.theme = t; } catch (e) {}
  on("#themeToggle", (b) => b.addEventListener("click", () => {
    root.classList.add("theme-anim");
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("bambou-theme", root.dataset.theme); } catch (e) {}
    setTimeout(() => root.classList.toggle("theme-anim", false), 700);
  }));

  /* ---------- Transition entre les pages (rideau vert) ---------- */
  const curtain = $("#pageCurtain");
  const arrived = sessionStorage.getItem("bambou-nav") === "1";
  sessionStorage.removeItem("bambou-nav");
  if (curtain) {
    if (arrived && !reduce) { curtain.classList.add("is-covering"); requestAnimationFrame(() => setTimeout(() => curtain.classList.add("is-leaving"), 60)); }
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || reduce || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const href = a.getAttribute("href") || "";
      if (!/^[\w-]+\.html(#.*)?$/.test(href) || href.split("#")[0] === location.pathname.split("/").pop()) return;
      e.preventDefault();
      curtain.classList.remove("is-leaving", "is-covering");
      curtain.classList.add("is-entering");
      sessionStorage.setItem("bambou-nav", "1");
      setTimeout(() => (location.href = href), 550);
    });
    window.addEventListener("pageshow", (e) => { if (e.persisted) curtain.className = "page-curtain"; });
  }

  /* ---------- Écran de chargement (accueil seulement) ---------- */
  on("#loader", (l) => {
    if (arrived) l.classList.add("is-done");
    const hide = () => l.classList.add("is-done");
    window.addEventListener("load", () => setTimeout(hide, 400));
    setTimeout(hide, 2500);
  });

  /* ---------- En-tête et menu mobile ---------- */
  const header = $("#header"), mbar = $(".mobile-bar");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", scrollY > 40 || !$(".hero, .page-hero"));
    if (mbar) mbar.classList.toggle("is-visible", scrollY > innerHeight * 0.4);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  on("#burger", (burger) => {
    const nav = $("#nav");
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  });

  /* ---------- Titre lettre par lettre ---------- */
  $$(".split").forEach((el) => {
    el.innerHTML = [...el.textContent].map((c, i) => `<span class="ch" style="animation-delay:${0.5 + i * 0.07}s">${c === " " ? "&nbsp;" : c}</span>`).join("");
  });
  /* ---------- Ouvert / fermé, calculé depuis les horaires ---------- */
  const H = D.infos.horaires;
  const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const fmt = (s) => s.replace(":", "h");
  function openState(now = new Date()) {
    const today = H[now.getDay()], min = now.getHours() * 60 + now.getMinutes();
    if (today && min >= toMin(today[0]) && min < toMin(today[1])) {
      const left = toMin(today[1]) - min;
      return { open: true, text: left <= 30 ? `Ouvert · ferme bientôt (${fmt(today[1])})` : `Ouvert · jusqu'à ${fmt(today[1])}` };
    }
    if (today && min < toMin(today[0])) return { open: false, text: `Fermé · ouvre à ${fmt(today[0])}` };
    for (let i = 1; i <= 7; i++) {
      const d = (now.getDay() + i) % 7;
      if (H[d]) return { open: false, text: `Fermé · ouvre ${i === 1 ? "demain" : JOURS[d]} à ${fmt(H[d][0])}` };
    }
    return { open: false, text: "Fermé" };
  }
  window.BAMBOU.openState = openState;
  on("#openStatus", (el) => {
    const s = openState();
    el.textContent = s.text;
    el.previousElementSibling && el.previousElementSibling.classList.toggle("dot--closed", !s.open);
  });
  on("#hoursTable", (tb) => {
    const order = [1, 2, 3, 4, 5, 6, 0], now = new Date().getDay();
    tb.innerHTML = order.map((d) => `<tr${d === now ? ' class="is-today"' : ""}><td>${JOURS[d][0].toUpperCase() + JOURS[d].slice(1)}${d === now ? " <em>aujourd'hui</em>" : ""}</td><td>${H[d] ? `${fmt(H[d][0])} – ${fmt(H[d][1])}` : "Fermé"}</td></tr>`).join("");
  });

  /* ---------- Bande défilante de plats ---------- */
  on("#marqueeA", (A) => {
    const list = D.plats.filter((p, i, arr) => !PRODUCT_CATS.includes(p.cat) && arr.findIndex((q) => q.img === p.img) === i);
    const pill = (p) => `<div class="marquee__item"><img src="${img(p.img)}" alt="" loading="lazy">${esc(p.nom)} <b>${euro(p.prix)}</b></div>`;
    const half = Math.ceil(list.length / 2);
    const a = list.slice(0, half).map(pill).join(""), b = list.slice(half).map(pill).join("");
    A.innerHTML = a + a;
    $("#marqueeB").innerHTML = b + b;
  });

  /* ---------- Offre 1 acheté = 1 offert ---------- */
  on("#offerPlates", (el) => {
    el.innerHTML = D.plats.filter((p) => (p.tags || []).includes("promo")).map((p) => `
      <div class="plate" data-dish="${D.plats.indexOf(p)}"><div class="plate__img"><img src="${img(p.img)}" alt="${esc(p.nom)}" loading="lazy"></div>
      <p>${esc(p.nom)}</p><span>${euro(p.prix)}</span></div>`).join("");
  });

  /* ---------- Coups de cœur ---------- */
  on("#favoris", (el) => {
    const names = ["Poisson sel et poivre", "3 sushis saumon + 8 California avocat saumon", "Roll tempura crevette, avocat", "Menu Viande"];
    el.innerHTML = names.map((n) => D.plats.find((p) => p.nom === n)).filter(Boolean).map((p, i) => `
      <article class="fav reveal" tabindex="0" data-dish="${D.plats.indexOf(p)}">
        <img src="${img(p.img)}" alt="${esc(p.nom)}" loading="lazy">
        <span class="fav__rank">${i + 1}</span>
        <div class="fav__body"><p class="fav__cat">${esc(catOf(p.cat).nom)}</p><h3>${esc(p.nom)}</h3><span class="price">${euro(p.prix)}</span></div>
      </article>`).join("");
  });

  /* ---------- Aperçu des catégories (accueil) ---------- */
  on("#catPreview", (el) => {
    el.innerHTML = D.categories.map((c) => {
      const items = D.plats.filter((p) => p.cat === c.id);
      const min = Math.min(...items.map((p) => p.prix));
      return `<a class="cat-card reveal" href="carte.html#${c.id}">
        <div class="cat-card__media"><img src="${img(c.cover || items[0].img)}" alt="" loading="lazy"></div>
        <div class="cat-card__body"><span class="cat-card__ico"><svg class="ico"><use href="#i-${c.icone}"/></svg></span><h3>${esc(c.nom)}</h3>
        <p>${items.length} choix · dès ${euro(min)}</p></div>
        <svg class="ico cat-card__arrow"><use href="#i-arrow"/></svg></a>`;
    }).join("");
  });

  /* ---------- Galerie (page restaurant) ---------- */
  on("#gallery", (el) => {
    const picks = ["poisson-sel-poivre", "inari-poulet-caramel", "roll-avocat-thon-saumon", "gyoza-poulet", "salade-soja-crevettes", "bobun-boeuf", "crevettes-sel-poivre", "poulet-curry-coco", "nouilles-sautees-legumes", "perles-de-coco"];
    el.innerHTML = picks.map((k) => {
      const p = D.plats.find((x) => x.img === k);
      return `<button class="gallery__item reveal" data-dish="${D.plats.indexOf(p)}" aria-label="${esc(p.nom)}"><img src="${img(k)}" alt="${esc(p.nom)}" loading="lazy"></button>`;
    }).join("");
  });

  /* ---------- La carte complète ---------- */
  on("#grid", (grid) => {
    const hash = location.hash.slice(1);
    let current = catOf(hash) ? hash : D.categories[0].id, sub = "all", query = "";
    const count = (id) => D.plats.filter((p) => p.cat === id).length;
    $("#tabs").innerHTML = `<span class="tab-indicator"></span>` + D.categories.map((c) =>
      `<button class="tab${c.id === current ? " is-active" : ""}" role="tab" data-cat="${c.id}"><svg class="ico"><use href="#i-${c.icone}"/></svg>${esc(c.nom)} <small>${count(c.id)}</small></button>`).join("");
    on("#sauces", (s) => (s.innerHTML = D.sauces.map((x) => `<li><b>${esc(x.nom)}</b><em>${euro(x.prix)}</em></li>`).join("")));

    const indicator = $(".tab-indicator");
    const moveIndicator = () => {
      const a = $(".tab.is-active"); if (!a) return;
      indicator.style.left = a.offsetLeft + "px"; indicator.style.width = a.offsetWidth + "px";
    };

    function render() {
      const q = query.trim().toLowerCase();
      let list;
      if (q) {
        list = D.plats.filter((p) => (p.nom + " " + (p.desc || "") + " " + catOf(p.cat).nom).toLowerCase().includes(q));
        $("#catIntro").innerHTML = `<span class="big"><svg class="ico"><use href="#i-search"/></svg></span><div><h3>Résultats</h3><p>${list.length} plat(s) trouvé(s) pour « ${esc(query)} », toutes catégories confondues.</p></div>`;
        $("#subtabs").hidden = true;
      } else {
        const c = catOf(current);
        list = D.plats.filter((p) => p.cat === current && (sub === "all" || !p.sub || p.sub === sub));
        $("#catIntro").innerHTML = `<span class="big"><svg class="ico"><use href="#i-${c.icone}"/></svg></span><div><h3>${esc(c.nom)}</h3><p>${esc(c.intro)}</p></div>`;
        $("#subtabs").hidden = current !== "plats";
      }
      $("#empty").hidden = list.length > 0;
      grid.innerHTML = list.map((p, i) => {
        const promo = (p.tags || []).includes("promo");
        return `<button class="dish" data-dish="${D.plats.indexOf(p)}" style="animation-delay:${Math.min(i, 12) * 45}ms">
          <div class="dish__media${PRODUCT_CATS.includes(p.cat) ? " is-product" : ""}">
            <img src="${img(p.img)}" alt="${esc(p.nom)}" loading="lazy">
            ${promo ? `<span class="dish__badge">1 acheté = 1 offert</span>` : ""}
          </div>
          <div class="dish__body">
            <h3>${esc(p.nom)}</h3>
            <p>${esc(p.desc || "")}</p>
            <div class="dish__tags">${tagHtml(p.tags)}</div>
            <div class="dish__foot"><span class="price">${euro(p.prix)}</span><span class="add" aria-hidden="true">+</span></div>
          </div>
        </button>`;
      }).join("");
      window.dispatchEvent(new Event("bambou:render"));
    }

    let swapTimer;
    function swap() {
      clearTimeout(swapTimer);
      grid.classList.add("is-leaving");
      swapTimer = setTimeout(() => {
        grid.classList.toggle("is-leaving", false);
        render();
        const intro = $("#catIntro");
        intro.classList.toggle("is-swap", false); void intro.offsetWidth; intro.classList.add("is-swap");
      }, 260);
    }

    render();
    addEventListener("load", moveIndicator);
    addEventListener("resize", moveIndicator);
    setTimeout(moveIndicator, 80);
    if (hash && catOf(hash)) setTimeout(() => $(".tab.is-active").scrollIntoView({ inline: "center", block: "nearest" }), 100);

    $("#tabs").addEventListener("click", (e) => {
      const b = e.target.closest(".tab"); if (!b) return;
      current = b.dataset.cat; sub = "all"; query = ""; $("#search").value = "";
      $$(".tab").forEach((t) => t.classList.toggle("is-active", t === b));
      $$("#subtabs .chip").forEach((c) => c.classList.toggle("is-active", c.dataset.sub === "all"));
      history.replaceState(null, "", "#" + current);
      b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      moveIndicator();
      swap();
      const top = $("#catIntro").getBoundingClientRect().top + scrollY - 200;
      if (scrollY > top + 100) scrollTo({ top, behavior: "smooth" });
    });
    $("#subtabs").addEventListener("click", (e) => {
      const c = e.target.closest(".chip"); if (!c) return;
      sub = c.dataset.sub;
      $$("#subtabs .chip").forEach((x) => x.classList.toggle("is-active", x === c));
      swap();
    });
    $("#search").addEventListener("input", (e) => { query = e.target.value; render(); });
  });

  /* ---------- Fenêtre détail d'un plat ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  const openModal = (m) => { lastFocus = document.activeElement; m.hidden = false; document.body.style.overflow = "hidden"; $(".modal__close", m).focus(); };
  const closeModal = (m) => { m.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
  function openDish(i) {
    const p = D.plats[i];
    $("#mImg").src = img(p.img); $("#mImg").alt = p.nom;
    $(".modal__media", modal).classList.toggle("is-product", PRODUCT_CATS.includes(p.cat));
    $("#mCat").textContent = catOf(p.cat).nom;
    $("#mTitle").textContent = p.nom;
    $("#mDesc").textContent = p.desc || "";
    $("#mTags").innerHTML = tagHtml(p.tags);
    $("#mPrice").textContent = euro(p.prix);
    $("#mHint").textContent = `Le bouton ouvre notre page Deliveroo dans un nouvel onglet. Deliveroo vous demande d'abord votre adresse de livraison, puis vous retrouvez ce plat dans la catégorie « ${catOf(p.cat).nom} ».`;
    openModal(modal);
  }
  document.addEventListener("click", (e) => {
    const d = e.target.closest("[data-dish]");
    if (d) return openDish(+d.dataset.dish);
    if (e.target.closest("[data-close]")) closeModal(e.target.closest(".modal"));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".modal:not([hidden])").forEach(closeModal);
    if (e.key === "Enter" && e.target.matches(".fav, .plate")) openDish(+e.target.dataset.dish);
  });
  on("#openPoster", (b) => b.addEventListener("click", () => openModal($("#poster"))));

  /* ---------- Carte des boissons de la brasserie ---------- */
  on("#menuCard", (el) => {
    const B = D.brasserie;
    const list = (rows) => `<ul>${rows.map(([n, p]) => `<li><span>${esc(n)}</span><b>${esc(p)}</b></li>`).join("")}</ul>`;
    el.innerHTML = `
      <div class="menu-card__title"><strong>BAMBOU</strong><span>BRASSERIE · CARTE DES BOISSONS</span></div>
      <div class="menu-card__cols">
        <div><h4>Boissons chaudes</h4>${list(B.chaudes)}<h4>Bières pression</h4>${list(B.pressions)}<h4>Bières bouteille</h4>${list(B.bouteilles)}</div>
        <div><h4>Boissons fraîches</h4>${list(B.fraiches)}<h4>Vin</h4>${list(B.vin)}</div>
      </div>`;
  });

  /* ---------- Cookies & carte Google Maps ----------
     La carte Google dépose des cookies : elle n'est chargée
     qu'après accord explicite du visiteur. */
  const KEY = "bambou-consent";
  const getC = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const setC = (v) => { try { localStorage.setItem(KEY, v); } catch (e) {} };
  const banner = $("#cookies"), map = $("#map"), gate = $("#mapGate");
  const loadMap = () => { if (!map || map.src) return; map.src = D.infos.mapsEmbed; map.hidden = false; gate.hidden = true; };
  const applyConsent = () => {
    const c = getC();
    banner.hidden = !!c;
    if (c === "all") loadMap();
    on("#consentState", (el) => (el.textContent = c === "all" ? "Vous avez accepté la carte Google Maps." : c === "necessary" ? "Vous avez refusé les cookies Google Maps." : "Vous n'avez pas encore fait de choix."));
  };
  $("#cookiesAccept").addEventListener("click", () => { setC("all"); applyConsent(); });
  $("#cookiesRefuse").addEventListener("click", () => { setC("necessary"); applyConsent(); });
  on("#mapAccept", (b) => b.addEventListener("click", () => { setC("all"); applyConsent(); }));
  $$(".js-cookie-settings").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault(); try { localStorage.removeItem(KEY); } catch (err) {}
    banner.hidden = false; on("#consentState", (el) => (el.textContent = "Faites votre choix dans la bannière en bas de l'écran."));
  }));
  applyConsent();

  /* ---------- FAQ : une seule question ouverte à la fois ---------- */
  $$(".faq details").forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) $$(".faq details").forEach((o) => o !== d && (o.open = false));
  }));

  /* =========================================================
     PIED DE PAGE ANIMÉ
     ========================================================= */
  on("#footer", (footer) => {
    // Apparition : bambous qui poussent, colonnes, soulignés
    const fio = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { footer.classList.add("is-in"); fio.disconnect(); }
    }, { threshold: 0.08 });
    fio.observe(footer);

    // Statut ouvert / fermé et heure en direct
    const status = $("#fStatus"), clock = $("#fClock"), box = $(".f-status");
    const tickClock = () => {
      const d = new Date(), s = openState(d);
      clock.textContent = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      status.textContent = s.text;
      box.classList.toggle("is-closed", !s.open);
    };
    tickClock(); setInterval(tickClock, 30000);

    // Grand « BAMBOU » qui se remplit au défilement
    const giant = $("#fGiant");
    const fill = () => {
      const r = giant.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + 160)));
      giant.style.setProperty("--fill", (k * 100).toFixed(1) + "%");
    };
    addEventListener("scroll", fill, { passive: true }); fill();

    // Feuilles qui montent
    if (!reduce) {
      const leaves = $("#fLeaves");
      setInterval(() => {
        if (document.hidden || !footer.classList.contains("is-in")) return;
        const r = footer.getBoundingClientRect();
        if (r.top > innerHeight || r.bottom < 0) return;
        const l = document.createElement("span"), dur = 8 + Math.random() * 6;
        l.className = "f-leaf";
        l.style.left = Math.random() * 100 + "%";
        l.style.animationDuration = dur + "s";
        l.style.setProperty("--dx", Math.random() * 160 - 80 + "px");
        l.style.scale = 0.5 + Math.random() * 0.9;
        leaves.append(l);
        setTimeout(() => l.remove(), dur * 1000);
      }, 700);
    }
  });

  // Bouton retour en haut avec anneau de progression
  on("#fTop", (btn) => {
    const ring = $("#fRing");
    const upd = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const k = max > 0 ? scrollY / max : 0;
      ring.style.strokeDashoffset = 132 * (1 - k);
      btn.classList.toggle("is-visible", scrollY > innerHeight * 0.8);
    };
    addEventListener("scroll", upd, { passive: true }); upd();
    btn.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  });

  /* =========================================================
     EFFETS VISUELS
     ========================================================= */

  /* Barre de progression */
  on("#progress", (bar) => addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  }, { passive: true }));

  /* Titres mot par mot */
  $$("h2:not(.no-words), .page-hero h1").forEach((h) => {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w.trim()) return frag.append(w);
          const o = document.createElement("span"); o.className = "w";
          const i = document.createElement("span"); i.textContent = w;
          o.append(i); frag.append(o);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
    });
    walk(h);
    $$(".w > span", h).forEach((s, i) => (s.style.transitionDelay = `${i * 80}ms`));
    h.classList.add("words");
  });

  /* Apparitions au défilement */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  const observeAll = () => $$(".reveal:not(.is-in), .words:not(.is-in), .curtain:not(.is-in), .section__head:not(.is-in)").forEach((el, i) => {
    if (el.classList.contains("reveal") && !el.style.transitionDelay) el.style.transitionDelay = `${(i % 4) * 90}ms`;
    io.observe(el);
  });
  observeAll();

  /* Compteurs animés */
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count || D.plats.length;
    const cio = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      cio.disconnect();
      const t0 = performance.now();
      const tick = (t) => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    cio.observe(el);
  });

  /* Parallaxe */
  const para = $$("[data-parallax]");
  if (!reduce && para.length) addEventListener("scroll", () => para.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    el.style.translate = `0 ${(r.top + r.height / 2 - innerHeight / 2) * -(+el.dataset.parallax)}px`;
  }), { passive: true });

  /* Fond du hero qui descend moins vite */
  on(".hero__bg, .page-hero__bg", (bg) => { if (!reduce) addEventListener("scroll", () => { if (scrollY < innerHeight) bg.style.translate = `0 ${scrollY * 0.3}px`; }, { passive: true }); });

  /* Feuilles de bambou qui tombent */
  on("#petals", (petals) => {
    if (reduce) return;
    setInterval(() => {
      if (document.hidden || scrollY > innerHeight) return;
      const p = document.createElement("span");
      const dur = 7 + Math.random() * 6;
      p.className = "petal";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = dur + "s";
      p.style.setProperty("--dx", Math.random() * 200 - 100 + "px");
      p.style.scale = 0.6 + Math.random() * 0.8;
      petals.append(p);
      setTimeout(() => p.remove(), dur * 1000);
    }, 900);
  });

  if (fine && !reduce) {
    document.body.classList.add("has-cursor");

    /* Curseur personnalisé */
    const cur = $("#cursor"), dot = $("#cursorDot");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
    (function loop() { cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => {
      const view = e.target.closest(".dish, .fav, .plate, .cat-card, .gallery__item");
      const hover = e.target.closest("a, button, input, summary, .chip");
      cur.classList.toggle("is-view", !!view);
      cur.classList.toggle("is-hover", !view && !!hover);
    });

    /* Lueur et plats qui suivent la souris dans le hero */
    on(".hero", (hero) => {
      const glow = $("#glow"), dishes = $$(".hero__dishes img");
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        if (glow) { glow.style.left = e.clientX - r.left + "px"; glow.style.top = e.clientY - r.top + "px"; }
        const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
        dishes.forEach((d, i) => { const k = (i + 1) * 12; d.style.translate = `${x * k}px ${y * k}px`; });
      });
    });

    /* Boutons aimantés */
    $$(".btn--lg, .btn--primary, .theme-toggle").forEach((b) => {
      b.classList.add("magnetic");
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
      });
      b.addEventListener("mouseleave", () => (b.style.translate = ""));
    });

    /* Cartes en 3D avec reflet */
    const tilt = (el) => {
      if (el.dataset.tilt) return;
      el.dataset.tilt = 1; el.classList.add("tilt");
      const shine = document.createElement("span"); shine.className = "tilt__shine"; el.append(shine);
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-6px)`;
        el.style.setProperty("--mx", x * 100 + "%"); el.style.setProperty("--my", y * 100 + "%");
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    };
    const applyTilt = () => $$(".dish, .fav, .u-card, .p-item, .cat-card, .step").forEach(tilt);
    applyTilt();
    addEventListener("bambou:render", applyTilt);
  }
})();

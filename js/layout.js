/* =========================================================
   BAMBOU — Éléments communs à toutes les pages
   (en-tête, pied de page, cookies, fenêtres, icônes)
   Modifier ici = modifié sur tout le site.
   ========================================================= */
(() => {
  const page = document.body.dataset.page || "";
  const I = window.BAMBOU.infos;

  const PAGES = [
    { id: "accueil", href: "index.html", nom: "Accueil" },
    { id: "carte", href: "carte.html", nom: "La carte" },
    { id: "brasserie", href: "brasserie.html", nom: "Brasserie & bar" },
    { id: "restaurant", href: "restaurant.html", nom: "Le restaurant" },
    { id: "commander", href: "commander.html", nom: "Commander" },
    { id: "reserver", href: "reserver.html", nom: "Réserver" },
    { id: "contact", href: "contact.html", nom: "Infos & contact" },
  ];

  const sprite = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="bamboo" viewBox="0 0 64 64">
      <g fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round">
        <path d="M26 60V6"/><path d="M38 60V14"/>
        <path d="M22 22h8M22 40h8M34 30h8M34 48h8"/>
        <path d="M26 22c-8-2-14-8-16-16 8 1 14 6 16 16zM38 30c7-3 12-9 14-17-8 2-13 8-14 17z" fill="currentColor" stroke="none"/>
      </g>
    </symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.3 2-.8 1.3L11 13V7h2z"/></symbol>
    <symbol id="i-bike" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm14 6a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM15 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-1.2 2.3L11 10l2.5 2.5V18h-2v-4.6L8.2 10.2a1.5 1.5 0 0 1 0-2.1l3.5-3.5 2.6 2.1L17 9h3v2h-4z"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></symbol>
    <symbol id="i-bag" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M5 8h14l-1 13H6L5 8zM9 8V6a3 3 0 0 1 6 0v2"/></symbol>
    ${Object.entries({
      check: "M5 12l4 4 10-10",
      shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6zM9 12l2 2 4-4",
      flame: "M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 3 0-2 0-4 0-6z",
      bowl: "M3 11h18a9 9 0 0 1-18 0zM8 7c0-1 1-2 0-3M12 7c0-1 1-2 0-3M16 7c0-1 1-2 0-3",
      chopsticks: "M4 21L19 3M9 21L21 7M5 14h14a7 7 0 0 1-14 0z",
      fish: "M2 12c3-4 7-6 11-6 4 0 7 3 9 6-2 3-5 6-9 6-4 0-8-2-11-6zM2 12l-1-3M2 12l-1 3M16 11h.01",
      dumpling: "M3 16c0-5 4-9 9-9s9 4 9 9H3zM7 12l1 2M12 10v3M17 12l-1 2",
      cup: "M7 6h10l-1.5 15h-7L7 6zM6 10h12M13 6l2-4",
      beer: "M6 8h9v13H6zM15 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M6 8a3 3 0 0 1 3-3 3 3 0 0 1 5 1 2 2 0 0 1 1 2M9 12v5M12 12v5",
      dessert: "M8 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 20h20",
      calendar: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4",
      users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M17 14c2 0 4 1.5 4 4.5",
      pen: "M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3",
      cart: "M3 4h2l2.5 11h11l2-8H6.5M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
      card: "M5 6h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM3 10h18M7 15h4",
      alert: "M12 3l10 18H2L12 3zM12 10v5M12 18h.01",
      cancel: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9l6 6M15 9l-6 6",
      rain: "M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.5-1A4 4 0 0 1 17 15H7zM9 18l-1 3M13 18l-1 3M17 18l-1 3",
      leaf: "M5 19C5 10 11 5 20 5c0 9-5 15-14 14zM5 19l8-8",
      coffee: "M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8zM16 10h2a2 2 0 0 1 0 4h-2M8 3v2M11 3v2",
      briefcase: "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM9 7V5h6v2M3 12h18",
      cake: "M4 12h16v8H4zM4 15c2 1 4 1 6 0s4-1 6 0 3 1 4 0M12 8v4M12 4.5v.5",
      home: "M4 11l8-7 8 7v9H4zM10 20v-5h4v5",
      layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
      sparkle: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
      euro: "M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9",
      chicken: "M14 4a6 6 0 0 1 6 6c0 2-1 3-2 4l-4 1-3 3a2 2 0 1 1-3 1 2 2 0 1 1 1-3l3-3 1-4c1-1 2-2 2-3z",
      cookie: "M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3zM9 10h.01M14 15h.01M9 15h.01",
    }).map(([k, d]) => `<symbol id="i-${k}" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="${d}"/></symbol>`).join("")}
    <symbol id="i-chair" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 3v10h10V3M5 13h14M7 13v8M17 13v8"/></symbol>
  </svg>`;

  const nav = PAGES.map((p) => `<a href="${p.href}"${p.id === page ? ' class="is-active" aria-current="page"' : ""}>${p.nom}</a>`).join("");

  const header = `
  <header class="header" id="header">
    <div class="header__inner">
      <a href="index.html" class="brand" aria-label="Bambou chez Zhu, accueil">
        <img src="images/lieu/logo.png" alt="" class="brand__logo" width="40" height="40">
        <span class="brand__text">BAMBOU<small>chez Zhu</small></span>
      </a>
      <nav class="nav" id="nav" aria-label="Navigation principale">${nav}</nav>
      <div class="header__actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Changer le mode jour / nuit" title="Mode jour / nuit">
          <svg class="ico ico--sun"><use href="#i-sun"/></svg>
          <svg class="ico ico--moon"><use href="#i-moon"/></svg>
        </button>
        <a class="btn btn--ghost btn--sm header__resa" href="reserver.html">Réserver</a>
        <a class="btn btn--primary btn--sm js-deliveroo" href="${I.deliveroo}" target="_blank" rel="noopener">Commander</a>
        <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  const footer = `
  <footer class="footer" id="footer">
    <!-- Bandeau défilant -->
    <div class="f-ribbon" aria-hidden="true"><div class="f-ribbon__track">${
      Array(2).fill(["Sushis", "Inari", "Wok minute", "Halal", "Rolls signature", "Brasserie", "Bar", "Livraison", "Nanterre"]
        .map((w) => `<span>${w}</span><svg viewBox="0 0 64 64"><use href="#bamboo"/></svg>`).join("")).join("")
    }</div></div>

    <!-- Bambous qui poussent -->
    <div class="f-bamboos" aria-hidden="true">
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `
      <svg class="f-stalk f-stalk--${i}" viewBox="0 0 60 400" preserveAspectRatio="xMidYMax meet">
        <path class="f-stalk__stem" d="M30 400 V20"/>
        <path class="f-stalk__nodes" d="M24 330h12M24 250h12M24 170h12M24 95h12"/>
        <path class="f-stalk__leaf" d="M30 170c-14-6-24-18-26-34 14 3 24 15 26 34z"/>
        <path class="f-stalk__leaf" d="M30 95c13-7 22-19 24-35-13 4-22 16-24 35z"/>
      </svg>`).join("")}
    </div>
    <div class="f-leaves" id="fLeaves" aria-hidden="true"></div>

    <div class="container">
      <!-- Carton d'appel -->
      <div class="f-cta f-in">
        <div>
          <p class="eyebrow">On vous attend</p>
          <h3>Une petite faim&nbsp;? <span>On s'occupe de tout.</span></h3>
        </div>
        <div class="f-cta__btns">
          <a class="btn btn--primary btn--lg" href="${I.deliveroo}" target="_blank" rel="noopener"><svg class="ico"><use href="#i-bike"/></svg> Commander</a>
          <a class="btn btn--ghost btn--lg" href="reserver.html">Réserver une table</a>
        </div>
      </div>

      <div class="footer__inner">
        <div class="footer__brand f-in">
          <img src="images/lieu/logo.png" alt="Logo Bambou chez Zhu" width="72" height="72">
          <div>
            <p><strong>BAMBOU chez Zhu</strong><br>${I.activite}</p>
            <p class="f-status"><span class="f-status__dot"></span><span id="fStatus">Lun – sam · 10h – 20h20</span> · <span id="fClock"></span></p>
          </div>
        </div>
        <div class="f-in">
          <h4>Nous trouver</h4>
          <p>${I.adresse}<br>${I.ville}<br><a href="tel:${I.telephoneLien}">09 63 45 01 12</a><br><a href="${I.maps}" target="_blank" rel="noopener">Itinéraire →</a></p>
        </div>
        <div class="f-in">
          <h4>Le site</h4>
          <ul class="f-links">${PAGES.map((p) => `<li><a href="${p.href}">${p.nom}</a></li>`).join("")}</ul>
        </div>
        <div class="f-in">
          <h4>Commander</h4>
          <ul class="f-links">
            <li><a href="${I.deliveroo}" target="_blank" rel="noopener">Livraison Deliveroo</a></li>
            <li><a href="tel:${I.telephoneLien}">À emporter : appelez-nous</a></li>
            <li><a href="reserver.html">Sur place : réservez</a></li>
            <li><a href="carte.html">Voir toute la carte</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Grand logo qui se remplit -->
    <div class="f-giant" aria-hidden="true"><span class="f-giant__outline">BAMBOU</span><span class="f-giant__fill" id="fGiant">BAMBOU</span></div>

    <button class="f-top" id="fTop" aria-label="Revenir en haut de la page">
      <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" class="f-top__track"/><circle cx="24" cy="24" r="21" class="f-top__ring" id="fRing"/></svg>
      <span>↑</span>
    </button>

    <div class="container footer__legal">
      <p>© ${new Date().getFullYear()} Bambou chez Zhu, Nanterre. Prix indicatifs : les prix en vigueur sont ceux affichés sur Deliveroo et en restaurant.</p>
      <p><a href="mentions-legales.html">Mentions légales</a> · <a href="confidentialite.html">Confidentialité & cookies</a> · <a href="#" class="js-cookie-settings">Gérer les cookies</a></p>
    </div>
  </footer>`;

  const extras = `
  <div class="page-curtain" id="pageCurtain" aria-hidden="true"><svg viewBox="0 0 64 64"><use href="#bamboo"/></svg></div>
  <div class="progress" id="progress"></div>
  <div class="cursor" id="cursor"></div><div class="cursor-dot" id="cursorDot"></div>

  <div class="mobile-bar">
    <a href="tel:${I.telephoneLien}" class="mobile-bar__call" aria-label="Appeler le restaurant"><svg class="ico"><use href="#i-phone"/></svg></a>
    <a href="${I.deliveroo}" class="btn btn--primary" target="_blank" rel="noopener"><svg class="ico"><use href="#i-bike"/></svg> Commander sur Deliveroo</a>
  </div>

  <div class="cookies" id="cookies" role="dialog" aria-live="polite" aria-label="Cookies" hidden>
    <div class="cookies__text">
      <strong class="cookies__title"><svg class="ico"><use href="#i-cookie"/></svg> Cookies et confidentialité</strong>
      <p>Ce site n'utilise aucun cookie publicitaire ni de mesure d'audience. Seule la <b>carte Google Maps</b> (page Infos & contact) peut déposer des cookies Google : elle ne s'affiche que si vous l'acceptez. <a href="confidentialite.html">En savoir plus</a></p>
    </div>
    <div class="cookies__btns">
      <button class="btn btn--ghost btn--sm" id="cookiesRefuse">Refuser</button>
      <button class="btn btn--primary btn--sm" id="cookiesAccept">Accepter</button>
    </div>
  </div>

  <div class="modal" id="modal" hidden>
    <div class="modal__backdrop" data-close></div>
    <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="mTitle">
      <button class="modal__close" data-close aria-label="Fermer"><svg class="ico"><use href="#i-close"/></svg></button>
      <div class="modal__media"><img id="mImg" alt=""></div>
      <div class="modal__body">
        <p class="eyebrow" id="mCat"></p>
        <h3 id="mTitle"></h3>
        <div class="modal__tags" id="mTags"></div>
        <p id="mDesc"></p>
        <p class="modal__hint" id="mHint"></p>
        <div class="modal__foot">
          <span class="price price--lg" id="mPrice"></span>
          <a class="btn btn--primary" href="${I.deliveroo}" target="_blank" rel="noopener"><svg class="ico"><use href="#i-bike"/></svg> Commander sur Deliveroo</a>
        </div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("afterbegin", sprite + header);
  document.body.insertAdjacentHTML("beforeend", footer + extras);
})();

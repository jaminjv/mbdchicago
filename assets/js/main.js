/* ============================================================
   Morning Breakfast Delight — behavior
   Renders content from assets/data/content.js and wires up the
   nav, hero video, review carousel and scroll reveals.
   ============================================================ */
(function () {
  "use strict";

  const D = window.MBD;
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Icons ---------------------------------------- */
  const icon = {
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 2h-3v13.2a2.7 2.7 0 11-2.2-2.6V9.5a5.9 5.9 0 105.2 5.8V9a7 7 0 004.1 1.3V7.2a4.1 4.1 0 01-4.1-4.1V2z"/></svg>',
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  const tagIcon = {
    spicy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 4c0-1 1-2 2-2s2 .8 2 2c0 1.4-1.2 2-1.2 2"/><path d="M15.4 6C13 6 5 8.6 5 15.2 5 19 7.6 21 10.4 21 15.6 21 19 15.4 19 10.6 19 8 17.6 6 15.4 6z"/></svg>',
    veg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20c0-8 5-14 16-15 1 10-4 16-12 16H4z"/><path d="M4 20c3-5 7-8 11-9.5"/></svg>',
    favorite: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"/></svg>'
  };

  const stars = (n = 5) => `<span class="stars" aria-hidden="true">${icon.star.repeat(n)}</span>`;

  /* ---------- Mobile nav ----------------------------------- */
  function initNav() {
    const nav = $(".nav");
    const burger = $(".nav__burger");
    if (!nav || !burger) return;

    const setOpen = (open) => {
      nav.dataset.open = String(open);
      burger.setAttribute("aria-expanded", String(open));
      burger.innerHTML = open ? icon.close : icon.burger;
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.innerHTML = icon.burger;
    burger.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
    $$(".nav__links a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    const mq = window.matchMedia("(min-width: 941px)");
    mq.addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Hero video -----------------------------------
     Silent by design: the source file carries no audio track and the
     element stays muted, which is also what permits autoplay.

     data-cut trims the loop without touching the file — the clip
     restarts at that many seconds instead of running to the end. */
  function initHero() {
    const video = $(".hero__media video");
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const cut = parseFloat(video.dataset.cut);
    if (cut > 0) {
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= cut) video.currentTime = 0;
      });
      video.addEventListener("seeked", () => { if (video.paused) video.play().catch(() => {}); });
    }

    const start = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    start();
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) start(); });

    // If the file is missing or undecodable, the poster carries the hero.
    video.addEventListener("error", () => { video.style.display = "none"; }, true);
  }

  /* ---------- Hours ---------------------------------------- */
  function renderHours() {
    const list = $("[data-hours]");
    if (!list) return;
    const today = new Date().getDay();
    list.innerHTML = D.business.hours.map((h) => {
      const isToday = h.idx === today;
      return `
      <li data-today="${isToday}">
        <span class="hours__day">${esc(h.day)}${isToday ? '<em>Today</em>' : ""}</span>
        <span class="hours__time">${esc(h.open)} – ${esc(h.close)}</span>
      </li>`;
    }).join("");
  }

  function renderOpenState() {
    const el = $("[data-open-state]");
    if (!el) return;
    const now = new Date();
    const today = D.business.hours.find((h) => h.idx === now.getDay());
    if (!today) return;
    const parse = (t) => {
      const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!m) return 0;
      let hh = +m[1] % 12;
      if (/PM/i.test(m[3])) hh += 12;
      return hh * 60 + +m[2];
    };
    const mins = now.getHours() * 60 + now.getMinutes();
    const open = mins >= parse(today.open) && mins < parse(today.close);
    el.dataset.open = String(open);
    el.textContent = open ? `Open now until ${today.close}` : `Opens ${today.day} at ${today.open}`;
  }

  /* ---------- Order platforms ------------------------------ */
  function renderOrdering() {
    const grid = $("[data-ordering]");
    if (!grid) return;
    grid.innerHTML = D.ordering.map((p) => {
      const art = p.logo
        ? `<img src="${esc(p.logo)}" alt="${esc(p.name)}">`
        : `<span class="order-tile__wordmark">${esc(p.wordmark || p.name)}</span>`;
      return `
        <a class="order-tile" href="${esc(p.url)}" target="_blank" rel="noopener"
           style="--brand:${esc(p.brand)};--brand-fg:${esc(p.fg)}"
           title="${esc(p.name)}${p.searchOnly ? " — opens a search on their app" : ""}">
          <span class="order-tile__face">${art}</span>
          <span class="order-tile__note">${esc(p.note)}</span>
          <span class="sr-only">Order from ${esc(p.name)}</span>
        </a>`;
    }).join("");
  }

  /* ---------- Specials ------------------------------------- */
  function renderSpecials() {
    const grid = $("[data-specials]");
    if (!grid) return;
    grid.innerHTML = D.specials.map((s, i) => `
      <article class="special ${i === 0 ? "special--hero" : ""} reveal">
        <img class="special__img" src="${esc(s.img)}" alt="${esc(s.alt || s.name)}" loading="lazy"
             onerror="this.style.display='none'">
        ${s.photoPending ? '<span class="photo-chip">Photo pending</span>' : ""}
        <div class="special__body">
          <span class="special__day">${esc(s.badge)}</span>
          <h3 class="special__name">${esc(s.name)}</h3>
          <p class="special__desc">${esc(s.desc)}</p>
          <span class="special__price">${esc(s.price)}</span>
        </div>
      </article>`).join("");
  }

  /* ---------- Chef ----------------------------------------- */
  function renderChef() {
    const host = $("[data-chef]");
    if (!host) return;
    const c = D.chef;
    host.innerHTML = `
      <figure class="chef__figure reveal">
        <img src="${esc(c.photo)}" alt="${esc(c.name)}, ${esc(c.role)} at Morning Breakfast Delight" loading="lazy">
        ${c.photoPending ? '<span class="photo-chip">Photo pending</span>' : ""}
        <div class="chef__stamp" aria-hidden="true"><b>MBD</b><small>Since day one</small></div>
      </figure>
      <div class="reveal">
        <span class="eyebrow">Meet the chef</span>
        <h2>${esc(c.name)}<br><span class="script">${esc(c.role)}</span></h2>
        <blockquote class="chef__quote">“${esc(c.quote)}”</blockquote>
        ${c.bio.map((p) => `<p class="lead" style="margin-bottom:1rem">${esc(p)}</p>`).join("")}
        <div class="chef__facts">
          ${c.facts.map((f) => `<div><b>${esc(f.value)}</b><span>${esc(f.label)}</span></div>`).join("")}
        </div>
      </div>`;
  }

  /* ---------- Reviews carousel ----------------------------- */
  function renderReviews() {
    const host = $("[data-reviews]");
    if (!host) return;
    const track = $(".reviews__track", host);
    const dots = $(".reviews__dots", host);
    if (!track) return;

    track.innerHTML = D.reviews.map((r) => `
      <figure class="review">
        ${stars(5)}
        <blockquote class="review__text">“${esc(r.text)}”</blockquote>
        <figcaption>
          <div class="review__author">${esc(r.source)}</div>
          <div class="review__meta">${esc(r.meta)}</div>
        </figcaption>
      </figure>`).join("");

    let i = 0;
    const total = D.reviews.length;

    dots.innerHTML = D.reviews.map((_, n) =>
      `<button type="button" aria-label="Show review ${n + 1} of ${total}"></button>`).join("");
    const dotEls = $$("button", dots);

    const go = (n) => {
      i = (n + total) % total;
      track.style.transform = `translateX(-${i * 100}%)`;
      dotEls.forEach((d, n2) => d.setAttribute("aria-current", String(n2 === i)));
    };

    dotEls.forEach((d, n) => d.addEventListener("click", () => { go(n); restart(); }));
    $("[data-prev]", host).addEventListener("click", () => { go(i - 1); restart(); });
    $("[data-next]", host).addEventListener("click", () => { go(i + 1); restart(); });

    let timer = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = () => { if (!reduced) timer = setInterval(() => go(i + 1), 6500); };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const restart = () => { stop(); start(); };

    host.addEventListener("mouseenter", stop);
    host.addEventListener("mouseleave", start);
    host.addEventListener("focusin", stop);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

    // Swipe on touch devices.
    let x0 = null;
    track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(dx < 0 ? i + 1 : i - 1);
      x0 = null; start();
    });

    go(0); start();
  }

  /* ---------- Rating summary ------------------------------- */
  function renderRating() {
    const host = $("[data-rating]");
    if (!host) return;
    host.innerHTML = `
      <div class="rating-hero__score">${D.business.rating}</div>
      <div>
        ${stars(5)}
        <p style="font-weight:600">${D.business.reviewCount}+ Google reviews</p>
      </div>`;
  }

  /* ---------- Socials -------------------------------------- */
  function renderSocials() {
    $$("[data-socials]").forEach((host) => {
      host.innerHTML = D.social.map((s) => {
        const live = Boolean(s.url);
        return live
          ? `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${icon[s.key]}</a>`
          : `<span class="social" aria-disabled="true" title="${esc(s.name)} — coming soon" aria-label="${esc(s.name)}, coming soon">${icon[s.key]}</span>`;
      }).join("");
    });
  }

  /* ---------- Menu rendering ------------------------------- */
  const tagClass = (t) => t === "veg" ? "tag tag--veg"
    : t === "spicy" ? "tag tag--hot"
    : t === "favorite" ? "tag tag--fav" : "tag";
  const tagLabel = (t) => t === "veg" ? "Veggie"
    : t === "spicy" ? "Spicy"
    : t === "favorite" ? "Fan favorite" : t;

  const tagChip = (t) => {
    const icon = tagIcon[t] || "";
    return `<span class="${tagClass(t)}">${icon}${esc(tagLabel(t))}</span>`;
  };

  const dishCard = (d, sectionId) => `
    <article class="dish reveal" data-dish-id="${esc(window.MBD_dishId(sectionId, d.name))}">
      <div class="dish__top">
        <h3 class="dish__name">${esc(d.name)}</h3>
        <span class="dish__price">${esc(d.price)}</span>
      </div>
      ${d.desc ? `<p class="dish__desc">${esc(d.desc)}</p>` : ""}
      ${d.tags && d.tags.length
        ? `<div class="dish__tags">${d.tags.map(tagChip).join("")}</div>`
        : ""}
    </article>`;

  const menuSection = (s) => `
    <section class="menu-section" id="${esc(s.id)}">
      <div class="wrap">
        <header class="menu-section__head">
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.blurb)}</p>
        </header>
        <div class="menu-grid">${s.items.map((d) => dishCard(d, s.id)).join("")}</div>
      </div>
    </section>`;

  function renderMenu(sections, navSel, bodySel) {
    const nav = $(navSel);
    const body = $(bodySel);
    if (!body) return;
    body.innerHTML = sections.map(menuSection).join("");
    if (nav) {
      nav.innerHTML = sections.map((s) =>
        `<li><a href="#${esc(s.id)}">${esc(s.title)}</a></li>`).join("");
      initScrollSpy(nav, sections.map((s) => s.id));
    }
  }

  function initScrollSpy(nav, ids) {
    const links = $$("a", nav);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.setAttribute("aria-current", String(a.hash === "#" + e.target.id)));
        const active = links.find((a) => a.hash === "#" + e.target.id);
        if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Catering ------------------------------------- */
  function renderCatering() {
    const facts = $("[data-cater-facts]");
    if (facts) {
      facts.innerHTML = D.catering.facts.map((f) => `
        <div class="cater-fact reveal"><b>${esc(f.value)}</b><span>${esc(f.label)}</span></div>`).join("");
    }
    $$("[data-cater-link]").forEach((a) => { a.href = D.catering.orderUrl; });
    renderMenu(D.catering.sections, "[data-cater-nav]", "[data-cater-menu]");
  }

  /* ---------- Contact blocks ------------------------------- */
  function renderContact() {
    const b = D.business;
    $$("[data-map]").forEach((f) => {
      f.innerHTML = `<iframe title="Map to ${esc(b.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=${esc(b.mapsQuery)}&output=embed"></iframe>`;
    });
    $$("[data-contact]").forEach((host) => {
      host.innerHTML = `
        <a href="https://www.google.com/maps/search/?api=1&query=${esc(b.mapsQuery)}" target="_blank" rel="noopener">
          ${icon.pin}<span>${esc(b.address)}<br><small style="opacity:.65">${esc(b.neighborhood)}</small></span></a>
        <a href="${esc(b.phoneHref)}">${icon.phone}<span>${esc(b.phone)}</span></a>`;
    });
  }

  /* ---------- Scroll reveals ------------------------------- */
  function initReveals() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e, n) => {
        if (!e.isIntersecting) return;
        setTimeout(() => e.target.classList.add("is-in"), n * 70);
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Boot ----------------------------------------- */
  function boot() {
    if (!D) return;
    initNav();
    initHero();
    renderHours();
    renderOpenState();
    renderOrdering();
    renderSpecials();
    renderChef();
    renderRating();
    renderReviews();
    renderSocials();
    renderContact();
    if ($("[data-menu]")) renderMenu(D.menu, "[data-menu-nav]", "[data-menu]");
    if ($("[data-cater-menu]")) renderCatering();
    initReveals();
    $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

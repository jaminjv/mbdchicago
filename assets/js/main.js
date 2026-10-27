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
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    calendarCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M9 15.5l2 2 4-4"/></svg>'
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

  /* "8:00 AM" -> 480, and back. */
  function toMinutes(t) {
    const m = String(t).match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return 0;
    let hh = +m[1] % 12;
    if (/PM/i.test(m[3])) hh += 12;
    return hh * 60 + +m[2];
  }
  function toClock(mins) {
    const h = Math.floor(mins / 60), m = mins % 60;
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  }

  function renderOpenState() {
    const el = $("[data-open-state]");
    if (!el) return;
    const now = new Date();
    const today = D.business.hours.find((h) => h.idx === now.getDay());
    if (!today) return;
    const mins = now.getHours() * 60 + now.getMinutes();
    const open = mins >= toMinutes(today.open) && mins < toMinutes(today.close);
    el.dataset.open = String(open);
    el.textContent = open ? `Open now until ${today.close}` : `Opens ${today.day} at ${today.open}`;
  }

  /* ---------- Order platforms ------------------------------ */
  function renderOrdering() {
    const grid = $("[data-ordering]");
    if (!grid) return;

    const tile = (p) => {
      const art = p.logo
        ? `<img src="${esc(p.logo)}" alt="${esc(p.name)}">`
        : `<span class="order-tile__wordmark">${esc(p.wordmark || p.name)}</span>`;
      if (p.opens) return `
        <button class="order-tile" type="button" data-open="${esc(p.opens)}"
                aria-haspopup="dialog" aria-label="${esc(p.name)}"
                style="--brand:${esc(p.brand)};--brand-fg:${esc(p.fg)}">
          <span class="order-tile__face">${art}</span>
          <span class="order-tile__note">${esc(p.note)}</span>
        </button>`;
      return `
        <a class="order-tile" href="${esc(p.url)}" target="_blank" rel="noopener"
           style="--brand:${esc(p.brand)};--brand-fg:${esc(p.fg)}"
           title="${esc(p.name)}${p.searchOnly ? " — opens a search on their app" : ""}">
          <span class="order-tile__face">${art}</span>
          <span class="order-tile__note">${esc(p.note)}</span>
          <span class="sr-only">${esc(p.action || "Order from")} ${esc(p.name)}</span>
        </a>`;
    };

    // A `featured` entry leads the section as a large card of its own,
    // ahead of the row of platform tiles.
    const feature = (p) => {
      const inner = `
          <span class="order-feature__icon" aria-hidden="true">${icon.calendarCheck}</span>
          <span class="order-feature__text">
            <span class="order-feature__title">${esc(p.wordmark || p.name)}</span>
            ${p.tagline ? `<span class="order-feature__tagline">${esc(p.tagline)}</span>` : ""}
          </span>
          <span class="order-feature__go" aria-hidden="true">${icon.arrowR}</span>`;
      return p.opens
        ? `<button class="order-feature" type="button" data-open="${esc(p.opens)}" aria-haspopup="dialog">${inner}</button>`
        : `<a class="order-feature" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>`;
    };

    const featured = D.ordering.filter((p) => p.featured);
    const rest = D.ordering.filter((p) => !p.featured);
    grid.innerHTML =
      featured.map(feature).join("") +
      (featured.length && rest.length ? '<p class="orders__or"><span>Or order online</span></p>' : "") +
      `<div class="orders__tiles">${rest.map(tile).join("")}</div>`;
  }

  /* ---------- Specials ------------------------------------- */
  /* Switched off in content.js: the section leaves the page along
     with every link pointing at it, so nothing scrolls to an anchor
     that is no longer there. */
  function hideSpecials() {
    const section = document.getElementById("specials");
    if (section) section.remove();
    $$('a[href$="#specials"]').forEach((a) => a.remove());

    // The chef section is flush under the specials because the two
    // share a dark background. Alone, it needs its top padding back.
    const chef = document.getElementById("chef");
    if (chef) chef.style.paddingTop = "";
  }

  function renderSpecials() {
    if (D.show && D.show.specials === false) { hideSpecials(); return; }
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
    // tools/prerender.mjs bakes this markup into the page at build time so
    // the dishes are in the HTML source. Re-rendering would only produce
    // the same nodes again, so leave them and wire up the rest.
    if (!body.querySelector(".dish")) body.innerHTML = sections.map(menuSection).join("");
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

  /* ---------- Reserve a table ------------------------------ */
  /* Dates and times are the restaurant's, not the visitor's: someone
     booking from another time zone is still choosing a Chicago table,
     and "today" has to mean today in Chicago. */
  const TZ = "America/Chicago";

  function zonedParts(t) {
    const part = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
    }).formatToParts(t).forEach((p) => { part[p.type] = p.value; });
    return part;
  }

  function chicagoNow() {
    const p = zonedParts(new Date());
    return { date: `${p.year}-${p.month}-${p.day}`, mins: +p.hour * 60 + +p.minute };
  }

  /* A Chicago wall-clock time as a real instant, for calendar files.
     Two passes settle the offset even on a daylight-saving changeover. */
  function chicagoToDate(iso, mins) {
    const [y, m, d] = iso.split("-").map(Number);
    const wall = Date.UTC(y, m - 1, d, Math.floor(mins / 60), mins % 60);
    const offset = (t) => {
      const p = zonedParts(new Date(t));
      return Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - t;
    };
    let t = wall - offset(wall);
    t = wall - offset(t);
    return new Date(t);
  }

  // Calendar arithmetic on "YYYY-MM-DD" strings, done in UTC so no
  // local offset or daylight-saving change can shift the day.
  const isoToUTC = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const addDays  = (iso, n) => { const t = isoToUTC(iso); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
  const fmtDay   = (iso, opts) => isoToUTC(iso).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
  const longDate = (iso) => fmtDay(iso, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  function hoursOn(iso) {
    return D.business.hours.find((h) => h.idx === isoToUTC(iso).getUTCDay());
  }

  /* Bookable times on a date, in minutes past midnight: every slot from
     opening to the last seating, and on today only those far enough
     ahead for someone to see the request. */
  function slotsOn(iso) {
    const R = D.reservations, h = hoursOn(iso);
    if (!h) return [];
    let start = toMinutes(h.open);
    const end = toMinutes(h.close) - R.lastSeating;
    const now = chicagoNow();
    if (iso === now.date) {
      const earliest = now.mins + R.minNotice;
      start = Math.max(start, Math.ceil(earliest / R.slotMinutes) * R.slotMinutes);
    }
    const out = [];
    for (let t = start; t <= end; t += R.slotMinutes) out.push(t);
    return out;
  }

  /* ---- "Add to calendar": the guest's own phone does the reminding. */
  const icsStamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const icsText = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  // RFC 5545 caps lines at 75 octets; longer ones continue on a line
  // that starts with a space. Split on characters, counting bytes.
  function icsFold(line) {
    const out = [];
    let cur = "", bytes = 0;
    for (const ch of line) {
      const n = new TextEncoder().encode(ch).length;
      if (bytes + n > (out.length ? 74 : 75)) { out.push(cur); cur = ""; bytes = 0; }
      cur += ch; bytes += n;
    }
    out.push(cur);
    return out.join("\r\n ");
  }

  function calendarLinks(b) {
    const B = D.business;
    const start = chicagoToDate(b.iso, b.mins);
    const end = new Date(start.getTime() + 90 * 60000);
    const title = `Breakfast at ${B.name}`;
    const details = `Table for ${b.party}, under ${b.name}. Requested on ${location.host || "mbdchicago.com"}; ` +
      `we'll confirm by phone or email.\nPlans changed? Call ${B.phone}.`;

    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Morning Breakfast Delight//Reservations//EN",
      "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${icsStamp(new Date())}-${Math.random().toString(36).slice(2, 10)}@mbdchicago.com`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${icsText(title)}`,
      `LOCATION:${icsText(B.address)}`,
      `DESCRIPTION:${icsText(details)}`,
      "URL:https://mbdchicago.com/",
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsText(title + " tomorrow")}`, "TRIGGER:-P1D", "END:VALARM",
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsText(title + " in an hour")}`, "TRIGGER:-PT1H", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].map(icsFold).join("\r\n") + "\r\n";

    const google = "https://calendar.google.com/calendar/render?" + new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${icsStamp(start)}/${icsStamp(end)}`,
      details,
      location: B.address,
      ctz: TZ
    }).toString();

    return { ics: "data:text/calendar;charset=utf-8," + encodeURIComponent(ics), google };
  }

  function initReserve() {
    const dialog = $("#reserve");
    const R = D.reservations;
    if (!dialog || !R) return;

    const form     = $("[data-reserve-form]", dialog);
    const formView = $("[data-reserve-form-view]", dialog);
    const done     = $("[data-reserve-done]", dialog);
    const status   = $("[data-reserve-status]", dialog);
    const submit   = $("[data-reserve-submit]", dialog);
    const card     = $(".reserve__card", dialog);
    const main     = $(".reserve__main", dialog);
    // Phones scroll the whole card; wide screens scroll the form column.
    const toTop = () => { card.scrollTop = 0; main.scrollTop = 0; };
    const daysEl   = $("[data-days]", dialog);
    const timesEl  = $("[data-times]", dialog);
    const hint     = $("[data-reserve-hours]", dialog);
    const picker   = $("#r-date-picker", dialog);
    const steps    = $$("[data-step]", dialog);
    const f = {
      party: $("#r-party", dialog),
      name: $("#r-name", dialog), email: $("#r-email", dialog), phone: $("#r-phone", dialog),
      notes: $("#r-notes", dialog)
    };
    const phoneHref = D.business.phoneHref, phone = D.business.phone;
    const VISIBLE_DAYS = 14;

    const state = { iso: "", mins: null, party: 2 };
    const maxParty = R.maxParty + 1;   // the last step is "13+"
    const partyLabel = (n) => n > R.maxParty ? `${R.maxParty + 1}+ guests` : `${n} guest${n === 1 ? "" : "s"}`;

    /* ---- Guests ------------------------------------------- */
    function setParty(n) {
      state.party = Math.min(maxParty, Math.max(1, n));
      f.party.value = String(state.party);
      $("#r-party-out", dialog).textContent = partyLabel(state.party);
      $('[data-party-step="-1"]', dialog).disabled = state.party <= 1;
      $('[data-party-step="1"]', dialog).disabled = state.party >= maxParty;
      $("[data-party-note]", dialog).hidden = state.party <= R.maxParty;
    }
    $$("[data-party-step]", dialog).forEach((btn) =>
      btn.addEventListener("click", () => setParty(state.party + +btn.dataset.partyStep)));

    /* ---- Days: a strip of the next two weeks, plus a picker for later. */
    let first, last;
    function setWindow() {
      const today = chicagoNow().date;
      first = slotsOn(today).length ? today : addDays(today, 1);
      last  = addDays(today, R.daysAhead);
      picker.min = first;
      picker.max = last;
    }

    function dayChip(iso) {
      const today = chicagoNow().date;
      const top = iso === today ? "Today" : iso === addDays(today, 1) ? "Tomorrow" : fmtDay(iso, { weekday: "short" });
      return `
        <label class="day">
          <input type="radio" name="date" value="${iso}"${iso === state.iso ? " checked" : ""}>
          <span class="day__face">
            <span class="day__top">${top}</span>
            <span class="day__num">${fmtDay(iso, { day: "numeric" })}</span>
            <span class="day__month">${fmtDay(iso, { month: "short" })}</span>
          </span>
          <span class="sr-only">${longDate(iso)}</span>
        </label>`;
    }

    function renderDays() {
      const list = [];
      for (let i = 0; i < VISIBLE_DAYS; i++) {
        const iso = addDays(first, i);
        if (iso > last) break;
        list.push(iso);
      }
      // A date chosen from the picker beyond the strip gets its own chip.
      if (state.iso && !list.includes(state.iso)) list.push(state.iso);
      daysEl.innerHTML = list.map(dayChip).join("") + `
        <button class="day day--more" type="button" data-more-dates>
          <span class="day__face">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
            <span class="day__top">More</span>
            <span class="day__month">dates</span>
          </span>
        </button>`;
    }

    function chooseDay(iso, { scroll } = {}) {
      state.iso = iso;
      if (state.mins !== null && !slotsOn(iso).includes(state.mins)) state.mins = null;
      renderDays();
      renderTimes();
      showError("date", "");
      const chip = $(`.day input[value="${iso}"]`, daysEl);
      if (chip && scroll) chip.closest(".day").scrollIntoView({ block: "nearest", inline: "center" });
    }

    daysEl.addEventListener("change", (e) => {
      if (e.target.name === "date") chooseDay(e.target.value);
    });
    daysEl.addEventListener("click", (e) => {
      if (!e.target.closest("[data-more-dates]")) return;
      picker.value = state.iso || "";
      try { picker.showPicker(); }
      catch (_) { picker.classList.add("is-shown"); picker.focus(); }   // browsers without showPicker()
    });
    picker.addEventListener("change", () => {
      const v = picker.value;
      picker.classList.remove("is-shown");
      if (!v) return;
      if (v < first || v > last) { showError("date", `Pick a day between today and ${fmtDay(last, { month: "long", day: "numeric" })}.`); return; }
      chooseDay(v, { scroll: true });
    });

    /* ---- Times, grouped into morning and afternoon. */
    function renderTimes() {
      if (!state.iso) {
        timesEl.innerHTML = '<p class="times__empty">Pick a day to see times.</p>';
        hint.textContent = "";
        return;
      }
      const h = hoursOn(state.iso);
      hint.textContent = `· ${fmtDay(state.iso, { weekday: "long" })} ${h.open} – ${toClock(toMinutes(h.close) - R.lastSeating)}`;
      const slots = slotsOn(state.iso);
      if (!slots.length) {
        timesEl.innerHTML = '<p class="times__empty">No times left that day — pick another.</p>';
        return;
      }
      const group = (label, list) => !list.length ? "" : `
        <div class="times__group">
          <p class="times__label">${label}</p>
          <div class="times__grid">${list.map((t) => `
            <label class="time">
              <input type="radio" name="time" value="${t}"${t === state.mins ? " checked" : ""}>
              <span class="time__face">${toClock(t)}</span>
            </label>`).join("")}
          </div>
        </div>`;
      timesEl.innerHTML = group("Morning", slots.filter((t) => t < 720)) + group("Afternoon", slots.filter((t) => t >= 720));
    }
    timesEl.addEventListener("change", (e) => {
      if (e.target.name !== "time") return;
      state.mins = +e.target.value;
      showError("time", "");
    });

    /* ---- Errors: one message per field, shown on Continue / submit,
       cleared as soon as the guest fixes that field. */
    const errorTarget = {
      date: () => daysEl, time: () => timesEl,
      name: () => f.name, email: () => f.email, phone: () => f.phone
    };
    function showError(key, msg) {
      const el = errorTarget[key](), err = $(`#r-${key}-err`, dialog);
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) el.setAttribute("aria-describedby", err.id); else el.removeAttribute("aria-describedby");
      err.textContent = msg;
      err.hidden = !msg;
    }

    const checks1 = {
      date: () => {
        if (!state.iso) return "Pick a day.";
        if (state.iso < first) return "That day has passed — pick another.";
        if (state.iso > last) return `We take bookings up to ${R.daysAhead} days ahead.`;
        return "";
      },
      time: () => (state.mins !== null && slotsOn(state.iso).includes(state.mins) ? "" : "Pick a time.")
    };
    const checks2 = {
      name: () => (f.name.value.trim().length >= 2 ? "" : "Please enter your name."),
      email: () => {
        const v = f.email.value.trim();
        if (!v) return "We need an email to confirm your table.";
        return f.email.validity.valid && /@.+\./.test(v) ? "" : "That email doesn't look right.";
      },
      phone: () => {
        const digits = f.phone.value.replace(/\D/g, "").length;
        return digits >= 10 && digits <= 15 ? "" : "Please enter a phone number we can call.";
      }
    };
    function run(checks) {
      let firstBad = null;
      Object.keys(checks).forEach((key) => {
        const msg = checks[key]();
        showError(key, msg);
        if (msg && !firstBad) firstBad = key;
      });
      return firstBad;
    }
    Object.keys(checks2).forEach((key) => {
      f[key].addEventListener("input", () => { if (f[key].getAttribute("aria-invalid") === "true") showError(key, ""); });
    });

    /* ---- Steps -------------------------------------------- */
    const summary = () => `${fmtDay(state.iso, { weekday: "short", month: "short", day: "numeric" })} · ${toClock(state.mins)} · ${partyLabel(state.party)}`;

    function goStep(n, { focus = true } = {}) {
      steps.forEach((st) => { st.hidden = st.dataset.step !== String(n); });
      $$("[data-step-dot]", dialog).forEach((dot) => {
        const k = +dot.dataset.stepDot;
        if (k === n) dot.setAttribute("aria-current", "step"); else dot.removeAttribute("aria-current");
        dot.classList.toggle("is-done", k < n);
      });
      if (n === 2) $("[data-reserve-recap]", dialog).textContent = summary();
      toTop();
      if (!focus) return;
      if (n === 2) f.name.focus();
      else ($('.day input:checked', daysEl) || $(".day input", daysEl) || daysEl).focus();
    }

    $("[data-reserve-next]", dialog).addEventListener("click", () => {
      const bad = run(checks1);
      if (bad) {
        const target = bad === "date" ? $(".day input", daysEl) : $(".time input", timesEl);
        errorTarget[bad]().scrollIntoView({ block: "center", behavior: "smooth" });
        if (target) target.focus({ preventScroll: true });
        return;
      }
      goStep(2);
    });
    $("[data-reserve-back]", dialog).addEventListener("click", () => goStep(1));

    function setStatus(html) {
      status.innerHTML = html || "";
      status.hidden = !html;
    }

    function reset() {
      form.reset();
      state.iso = ""; state.mins = null;
      setParty(2);
      ["date", "time", ...Object.keys(checks2)].forEach((key) => showError(key, ""));
      setStatus("");
      formView.hidden = false;
      done.hidden = true;
      setWindow();
      renderDays();
      renderTimes();
      goStep(1, { focus: false });
    }

    /* ---- Open / close ------------------------------------- */
    let sent = false;
    function open() {
      if (sent) { reset(); sent = false; }
      setWindow();   // the window moves if the page sat open past a slot or midnight
      if (state.iso && (state.iso < first || state.iso > last)) { state.iso = ""; state.mins = null; }
      renderDays();
      renderTimes();
      if (dialog.open) return;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    function close() {
      if (typeof dialog.close === "function" && dialog.open) dialog.close();
      else dialog.removeAttribute("open");
    }

    // Leaving #reserve in the address bar would stop the same link from
    // reopening the form, and would reopen it on refresh.
    dialog.addEventListener("close", () => {
      if (location.hash === "#reserve") history.replaceState(null, "", location.pathname + location.search);
    });

    document.addEventListener("click", (e) => {
      const opener = e.target.closest('[data-open="reserve"], a[href="#reserve"]');
      if (opener) { e.preventDefault(); open(); return; }
      if (e.target.closest("[data-reserve-close]")) close();
    });

    // A click on the dimmed backdrop closes; a text selection that merely
    // ends there does not.
    let downOnBackdrop = false;
    dialog.addEventListener("mousedown", (e) => { downOnBackdrop = e.target === dialog; });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog && downOnBackdrop) close();
      downOnBackdrop = false;
    });

    if (location.hash === "#reserve") open();
    window.addEventListener("hashchange", () => { if (location.hash === "#reserve") open(); });

    /* ---- Send --------------------------------------------- */
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus("");
      // Step 1 can only have gone stale if the page sat open for a while.
      if (run(checks1)) { goStep(1); return; }
      const bad = run(checks2);
      if (bad) { f[bad].focus(); return; }

      const callUs = `<a href="${esc(phoneHref)}">${esc(phone)}</a>`;
      if (!R.accessKey) {
        setStatus(`Online booking isn't switched on yet. Call us at ${callUs} and we'll save you a table.`);
        return;
      }

      const booking = {
        iso: state.iso, mins: state.mins,
        party: partyLabel(state.party),
        date: longDate(state.iso),
        time: toClock(state.mins),
        name: f.name.value.trim(),
        email: f.email.value.trim()
      };

      const showDone = () => {
        sent = true;
        $("[data-ticket-day]", dialog).textContent = booking.date.replace(/, \d{4}$/, "");
        $("[data-ticket-time]", dialog).textContent = booking.time;
        $("[data-ticket-party]", dialog).textContent = booking.party;
        $("[data-ticket-name]", dialog).textContent = booking.name;
        $("[data-ticket-email]", dialog).textContent = booking.email;
        const cal = calendarLinks(booking);
        $("[data-cal-ics]", dialog).href = cal.ics;
        $("[data-cal-google]", dialog).href = cal.google;
        formView.hidden = true;
        done.hidden = false;
        toTop();
        done.focus({ preventScroll: true });   // keep the banner in view above the ticket
      };

      // Filled in by a bot: look successful, send nothing.
      if (form.elements.botcheck.checked) { showDone(); return; }

      submit.disabled = true;
      submit.textContent = "Sending…";
      const timeout = new AbortController();
      const timer = setTimeout(() => timeout.abort(), 15000);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          signal: timeout.signal,
          body: JSON.stringify({
            access_key: R.accessKey,
            subject: `Table request: ${booking.name}, ${booking.party}, ${booking.date} at ${booking.time}`,
            from_name: `${D.business.name} website`,
            replyto: booking.email,
            "Name": booking.name,
            "Email": booking.email,
            "Phone": f.phone.value.trim(),
            "Date": booking.date,
            "Time": booking.time,
            "Guests": booking.party,
            "Special requests": f.notes.value.trim() || "None"
          })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || `HTTP ${res.status}`);
        showDone();
      } catch (err) {
        setStatus(`We couldn't send that just now. Please try again, or call us at ${callUs}.`);
        if (window.console) console.warn("Reservation not sent:", err);
      } finally {
        clearTimeout(timer);
        submit.disabled = false;
        submit.textContent = "Request My Table";
      }
    });

    setParty(2);
    setWindow();
    renderDays();
    renderTimes();
  }

  /* ---------- Boot ----------------------------------------- */
  function boot() {
    if (!D) return;
    initNav();
    initHero();
    renderHours();
    renderOpenState();
    renderOrdering();
    initReserve();
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

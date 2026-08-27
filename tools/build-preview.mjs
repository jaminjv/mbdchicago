/* ============================================================
   Builds preview.html — the whole site as one self-contained
   file: CSS, JS, logo and placeholder art all inlined, and the
   three pages turned into hash-routed views.

   For sharing a preview where there is no web server (an email
   attachment, a Claude artifact, a USB stick). The real site is
   still index.html / menu.html / catering.html.

   Usage:  node tools/build-preview.mjs
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const dataUri = (p) =>
  "data:image/svg+xml;base64," + Buffer.from(read(p), "utf8").toString("base64");

/* ---- Pull the body of each page, minus the shared chrome ---- */
function viewBody(file) {
  const html = read(file);
  const start = html.indexOf("</header>") + "</header>".length;
  const end = html.indexOf('<footer class="footer">');
  return html.slice(start, end).trim();
}

/* The @font-face blocks point at licensed files that only exist in the
   full checkout, so a single-file bundle drops them and uses the
   Google Fonts fallbacks instead. */
const css = read("assets/css/styles.css")
  .replace(/@font-face \{[\s\S]*?\}\n/g, "");
const data = read("assets/data/content.js");
const main = read("assets/js/main.js");

/* The marks are tens of KB of paths, so each goes in once as a <symbol>
   and every use point references it. A <use> of a <symbol> already
   applies the symbol's viewBox, so the referencing <svg> must NOT
   repeat it — doing so scales the art twice and crops it. Size comes
   from CSS width + aspect-ratio instead. */
function symbolOf(file, id) {
  const svg = read(file);
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const [, , w, h] = viewBox.split(/\s+/).map(Number);
  return { id, viewBox, inner, ratio: (w / h).toFixed(4) };
}
const wordmark = symbolOf("assets/img/logo.svg", "mbd-logo");      // full script lockup
const monogram = symbolOf("assets/img/logo-mark.svg", "mbd-mark"); // MBD initials

let views = {
  home: viewBody("index.html"),
  menu: viewBody("menu.html"),
  catering: viewBody("catering.html")
};

/* ---- Rewrite page links into view routes ------------------- */
const routeLinks = (s) => s
  .replace(/href="index\.html#/g, 'href="#')
  .replace(/href="index\.html"/g, 'href="#/home"')
  .replace(/href="menu\.html"/g, 'href="#/menu"')
  .replace(/href="catering\.html"/g, 'href="#/catering"')
  .replace(/href="\.\/"/g, 'href="#/home"');

for (const k of Object.keys(views)) views[k] = routeLinks(views[k]);

/* Poster and reel are inlined so the bundle stays a single file. */
const b64 = (p, mime) =>
  `data:${mime};base64,` + readFileSync(new URL("../" + p, import.meta.url)).toString("base64");
views.home = views.home
  .replace(/poster="assets\/img\/hero-poster\.jpg"/, `poster="${b64("assets/img/hero-poster.jpg", "image/jpeg")}"`)
  .replace(/\s*<source src="assets\/video\/hero\.mp4" type="video\/mp4">/, "")
  .replace(/src="assets\/video\/hero\.webm"/, `src="${b64("assets/video/hero.webm", "video/webm")}"`);

/* Section ids must stay unique once all three views share a document. */
views.menu = views.menu.replace(/id="catering-menu"/g, 'id="catering-menu-nav"');

const nav = routeLinks(`
    <a class="nav__logo" href="./" aria-label="Morning Breakfast Delight — home">
      <svg class="nav__logo-mark" role="img" aria-label="Morning Breakfast Delight"><use href="#mbd-mark"/></svg>
    </a>
    <button class="nav__burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="primary-nav"></button>
    <nav class="nav__links" id="primary-nav" aria-label="Primary">
      <a href="menu.html" data-route="menu">Menu</a>
      <a href="catering.html" data-route="catering">Catering</a>
      <a href="index.html#order">Order</a>
      <a href="index.html#specials">Specials</a>
      <a href="index.html#chef">Our Chef</a>
      <a href="index.html#visit">Visit</a>
      <a class="btn btn--sm nav__cta" href="index.html#order">Order Now</a>
    </nav>`);

const footer = routeLinks(read("index.html")
  .slice(read("index.html").indexOf('<footer class="footer">'))
  .replace(/<script[\s\S]*$/, "")
  .replace(/<\/body>[\s\S]*$/, ""))
  .replace(/<img class="footer__logo"[^>]*>/,
    `<svg class="footer__logo" role="img" aria-label="Morning Breakfast Delight"><use href="#mbd-logo"/></svg>`);

/* ---- Inline the placeholder art --------------------------- */
const patchedData = data
  .replace(/"assets\/img\/special-1\.svg"/, `"${dataUri("assets/img/special-1.svg")}"`)
  .replace(/"assets\/img\/special-2\.svg"/, `"${dataUri("assets/img/special-2.svg")}"`)
  .replace(/"assets\/img\/special-3\.svg"/, `"${dataUri("assets/img/special-3.svg")}"`)
  .replace(/"assets\/img\/placeholder-chef\.svg"/, `"${dataUri("assets/img/placeholder-chef.svg")}"`);

/* The map embed is blocked in a sandboxed frame, so it becomes a link card. */
const patchedMain = main.replace(
  /f\.innerHTML = `<iframe[\s\S]*?<\/iframe>`;/,
  "f.innerHTML = mapCard(b);"
);

const out = `<title>Morning Breakfast Delight</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..900&family=Yellowtail&display=swap" rel="stylesheet">
<style>
${css}

/* --- Preview shell: three pages as hash-routed views -------- */
.view { display: none; }
.view.is-active { display: block; }
.nav__logo-mark { height: clamp(46px, 5.6vw, 60px); aspect-ratio: ${monogram.ratio}; width: auto; }
.footer__logo { width: 190px; height: auto; aspect-ratio: ${wordmark.ratio}; margin-bottom: 1.2rem; }
.map-card {
  display: flex; flex-direction: column; gap: 1rem;
  padding: clamp(1.6rem, 4vw, 2.4rem);
  background: var(--cocoa); color: var(--white);
  min-height: clamp(300px, 42vw, 420px);
  justify-content: center; align-items: flex-start;
}
.map-card__addr { font-size: clamp(1.2rem, 2.4vw, 1.6rem); font-weight: 800; line-height: 1.25; }
.map-card__note { color: rgba(255,255,255,.66); font-size: .92rem; max-width: 40ch; }
</style>

<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">
  <symbol id="${wordmark.id}" viewBox="${wordmark.viewBox}">${wordmark.inner}</symbol>
  <symbol id="${monogram.id}" viewBox="${monogram.viewBox}">${monogram.inner}</symbol>
</svg>

<div class="ticker" aria-hidden="true">
  <div class="ticker__track">
    <span>★ Breakfast with a Mexican heart</span><span>★ Now catering across Chicagoland</span>
    <span>★ Formerly Early Morning Delight</span><span>★ Open 7 days a week</span><span>★ 4.9 on Google</span>
  </div>
  <div class="ticker__track">
    <span>★ Breakfast with a Mexican heart</span><span>★ Now catering across Chicagoland</span>
    <span>★ Formerly Early Morning Delight</span><span>★ Open 7 days a week</span><span>★ 4.9 on Google</span>
  </div>
</div>

<header class="nav">
  <div class="wrap nav__inner">${nav}</div>
</header>

<div class="view is-active" id="view-home">${views.home}</div>
<div class="view" id="view-menu">${views.menu}</div>
<div class="view" id="view-catering">${views.catering}</div>

${footer}

<script>
/* Map embeds are blocked inside a sandboxed frame; link out instead. */
function mapCard(b) {
  const q = "https://www.google.com/maps/search/?api=1&query=" + b.mapsQuery;
  return '<div class="map-card">' +
    '<div class="map-card__addr">' + b.address.replace(", Chicago", ",<br>Chicago") + '</div>' +
    '<p class="map-card__note">Just east of Damen in North Center. Street parking on Irving Park and the side streets.</p>' +
    '<a class="btn btn--sm" href="' + q + '" target="_blank" rel="noopener">Open in Google Maps</a>' +
    '</div>';
}
</script>
<script>
${patchedData}
</script>
<script>
${patchedMain}
</script>
<script>
/* --- Router ------------------------------------------------
   "#/menu" swaps the view; a bare "#order" scrolls to a section,
   switching views first when that section lives elsewhere. */
(function () {
  const views = { home: "view-home", menu: "view-menu", catering: "view-catering" };

  function showView(name, scrollTo) {
    const id = views[name] || views.home;
    document.querySelectorAll(".view").forEach((v) =>
      v.classList.toggle("is-active", v.id === id));
    document.querySelectorAll(".nav__links a[data-route]").forEach((a) =>
      a.setAttribute("aria-current", a.dataset.route === name ? "page" : "false"));
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function viewOf(el) {
    const host = el.closest(".view");
    if (!host) return null;
    return Object.keys(views).find((k) => views[k] === host.id) || null;
  }

  function route() {
    const hash = location.hash;
    if (!hash || hash === "#") return showView("home");
    if (hash.startsWith("#/")) return showView(hash.slice(2));

    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const owner = viewOf(target);
    const active = document.querySelector(".view.is-active");
    if (owner && views[owner] !== active.id) showView(owner, hash.slice(1));
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.addEventListener("hashchange", route);
  route();
})();
</script>
`;

writeFileSync(new URL("../preview.html", import.meta.url), out);
console.log("preview.html written —", (out.length / 1024).toFixed(0), "KB");

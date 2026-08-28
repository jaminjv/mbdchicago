/* ============================================================
   Builds preview.html — the whole site as one self-contained
   file: CSS, JS, logo and placeholder art all inlined, and the
   three pages turned into hash-routed views.

   For sharing a preview where there is no web server (an email
   attachment, a Claude artifact, a USB stick). The real site is
   still index.html / menu.html / catering.html.

   Output: dist/preview.html (generated — not a source file)
   Usage:  node tools/build-preview.mjs
   ============================================================ */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

const MIME = { svg: "image/svg+xml", jpg: "image/jpeg", jpeg: "image/jpeg",
               png: "image/png", webm: "video/webm", mp4: "video/mp4",
               woff2: "font/woff2", otf: "font/otf" };
const b64 = (p) => {
  const ext = p.split(".").pop().toLowerCase();
  const mime = MIME[ext];
  if (!mime) throw new Error(`no mime type known for ${p}`);
  return `data:${mime};base64,` +
    readFileSync(new URL("../" + p, import.meta.url)).toString("base64");
};

/* ---- Pull the body of each page, minus the shared chrome ---- */
function viewBody(file) {
  const html = read(file);
  const start = html.indexOf("</header>") + "</header>".length;
  const end = html.indexOf('<footer class="footer">');
  return html.slice(start, end).trim();
}

/* A bundle cannot reach assets/fonts/, so each @font-face is rewritten to
   carry its file inline. Blocks whose font is not in the repo are dropped
   rather than left pointing at nothing. */
const css = read("assets/css/styles.css").replace(
  /@font-face \{[\s\S]*?\}\n/g,
  (block) => {
    const refs = [...block.matchAll(/url\("\.\.\/([^"]+)"\)/g)].map((m) => "assets/" + m[1]);
    const present = refs.find((r) => existsSync(new URL("../" + r, import.meta.url)));
    if (!present) return "";
    // Keep only the format that matches the file being inlined.
    const fmt = present.endsWith(".woff2") ? 'format("woff2")' : 'format("opentype")';
    return block.replace(/src:[\s\S]*?;/, `src: url("${b64(present)}") ${fmt};`);
  });
const data = read("assets/data/content.js");
const main = read("assets/js/main.js");
// main.js calls MBD_dishId, so its definition has to travel with it.
const dishId = read("assets/js/dish-id.js");

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

/* Poster and banner video are inlined so the bundle stays a single file.
   --no-video omits the clip and leaves the poster frame in its place:
   the base64 video is by far the largest thing in the bundle, and a
   multi-megabyte page is slow to open and can fail to publish at all.
   The video is handed over as data-src rather than src: Safari refuses to
   play a <video> from a data: URI (it wants byte ranges, which data: URIs
   cannot serve), so the page converts it to a blob: URL at runtime. */
const withVideo = !process.argv.includes("--no-video");
views.home = views.home
  .replace(/poster="assets\/img\/hero-poster\.jpg"/, `poster="${b64("assets/img/hero-poster.jpg")}"`)
  .replace(/<source src="assets\/video\/hero\.mp4" type="video\/mp4">/,
           withVideo ? `<source data-src="${b64("assets/video/hero.mp4")}" type="video/mp4">` : "");

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

/* ---- Inline every image the content file points at ---------
   Paths that do not resolve are left alone: the content file also
   carries example paths inside comments. */
const patchedData = data.replace(
  /"(assets\/img\/[^"]+\.(?:svg|jpe?g|png))"/g,
  (whole, path) =>
    existsSync(new URL("../" + path, import.meta.url)) ? `"${b64(path)}"` : whole);

/* The map embed is blocked in a sandboxed frame, so it becomes a link card. */
const patchedMain = main.replace(
  /f\.innerHTML = `<iframe[\s\S]*?<\/iframe>`;/,
  "f.innerHTML = mapCard(b);"
);

const out = `<title>Morning Breakfast Delight</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
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
/* Safari will not play a <video> whose source is a data: URI, so the inlined
   clip is decoded into a blob: URL before the player ever sees it. If blob:
   is unavailable the original data: URI is used, which still works in
   Chromium-based browsers. */
(function () {
  function apply(src) {
    var s = document.querySelector(".hero__media source[data-src]");
    if (!s) return;
    s.setAttribute("src", src);
    s.removeAttribute("data-src");
    var v = s.parentNode;
    v.load();
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  function boot() {
    var s = document.querySelector(".hero__media source[data-src]");
    if (!s) return;
    var uri = s.getAttribute("data-src");
    try {
      var b64 = uri.slice(uri.indexOf(",") + 1);
      var bin = atob(b64);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      apply(URL.createObjectURL(new Blob([bytes], { type: "video/mp4" })));
    } catch (e) {
      apply(uri);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

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
${dishId}
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

mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("../dist/preview.html", import.meta.url), out);
console.log(`dist/preview.html written — ${(out.length / 1024 / 1024).toFixed(2)} MB`,
            withVideo ? "(with banner video)" : "(poster only, --no-video)");

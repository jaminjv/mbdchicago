/* ============================================================
   Bakes the menu and catering markup into their pages.

   Both lists are rendered from assets/data/content.js by main.js,
   which left the served HTML empty — a crawler saw <main data-menu>
   and nothing else, and the menu is the thing worth finding.

   Rather than keep a second copy of the templates here, this loads
   each page in a real browser, lets main.js render, and writes the
   resulting markup back into the file. The browser is the renderer,
   so the two can never drift.

   Run after any change to the menu data:  node tools/prerender.mjs
   ============================================================ */
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
                ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".woff2": "font/woff2",
                ".mp4": "video/mp4", ".json": "application/json" };

const server = createServer((req, res) => {
  const path = join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  try {
    const body = readFileSync(path);
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const targets = [
  { file: "menu.html",     host: "main[data-menu]",       nav: "ul[data-menu-nav]" },
  { file: "catering.html", host: "main[data-cater-menu]", nav: "ul[data-cater-nav]" },
];

for (const t of targets) {
  const page = await browser.newPage();
  await page.goto(`${base}/${t.file}`, { waitUntil: "load" });
  await page.waitForSelector(`${t.host} .dish`, { timeout: 15000 });

  const { body, nav, dishes } = await page.evaluate(([h, n]) => ({
    body: document.querySelector(h).innerHTML,
    nav: document.querySelector(n).innerHTML,
    dishes: document.querySelectorAll(`${h} .dish`).length,
  }), [t.host, t.nav]);

  let html = readFileSync(join(ROOT, t.file), "utf8");
  const put = (open, close, inner) => {
    const i = html.indexOf(open);
    if (i < 0) throw new Error(`${open} not found in ${t.file}`);
    const start = html.indexOf(">", i) + 1;
    const end = html.indexOf(close, start);
    html = html.slice(0, start) + "\n" + inner + "\n" + html.slice(end);
  };
  put(`<${t.host.split("[")[0]} ${t.host.match(/\[(.+)\]/)[1]}`, `</${t.host.split("[")[0]}>`, body);
  put(`<ul ${t.nav.match(/\[(.+)\]/)[1]}`, "</ul>", nav);
  writeFileSync(join(ROOT, t.file), html);
  console.log(`${t.file.padEnd(15)} ${dishes} dishes baked in`);
  await page.close();
}

await browser.close();
server.close();

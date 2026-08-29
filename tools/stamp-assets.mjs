/* Stamp local CSS and JS links with a hash of the file they point at.
 *
 * The pages reference assets/js/main.js and assets/data/content.js by a
 * bare path, so a browser that fetched them once has no reason to ask for
 * them again — a change to the menu, the prices or a section switch can
 * sit on the server while visitors keep running the copy they cached.
 * Adding ?v=<hash of the contents> makes the URL itself change whenever
 * the file does, so the old copy can never be mistaken for the new one.
 *
 * This runs in the deploy workflow, not by hand: the committed HTML stays
 * clean, and nobody editing content.js has to remember a build step.
 * Re-running it is safe — an existing stamp is replaced, not appended.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "menu.html", "catering.html", "admin.html"];

// Only CSS and JS. Images, fonts and the video are versioned by their own
// filenames when they change, and stamping them would churn the diff.
const ref = /(?<attr>(?:src|href)=")(?<path>assets\/[^"?]+\.(?:css|js))(?:\?v=[^"]*)?"/g;

const hashes = new Map();
const hashOf = (rel) => {
  if (!hashes.has(rel)) {
    const file = join(root, rel);
    if (!existsSync(file)) return null;
    hashes.set(rel, createHash("sha1").update(readFileSync(file)).digest("hex").slice(0, 8));
  }
  return hashes.get(rel);
};

let stamped = 0;
for (const page of pages) {
  const file = join(root, page);
  if (!existsSync(file)) continue;

  const before = readFileSync(file, "utf8");
  const after = before.replace(ref, (whole, ...args) => {
    const { attr, path } = args.at(-1);
    const hash = hashOf(path);
    // A reference to a file that is not there is left exactly as it was,
    // so a typo shows up as a 404 rather than being papered over.
    if (!hash) {
      console.warn(`  ! ${page}: ${path} does not exist, left alone`);
      return whole;
    }
    stamped++;
    return `${attr}${path}?v=${hash}"`;
  });

  if (after !== before) {
    writeFileSync(file, after);
    console.log(`  ${page}`);
  }
}
console.log(`Stamped ${stamped} reference${stamped === 1 ? "" : "s"}.`);

# Morning Breakfast Delight — website

Static site for **Morning Breakfast Delight** (formerly *Early Morning Delight*),
1924 W Irving Park Rd, Chicago. No build step, no dependencies — plain HTML, CSS
and JavaScript, ready for GitHub Pages.

```
index.html          Home — hero video, order links, weekly specials, chef, reviews, visit
menu.html           Full menu, grouped into sections with a sticky category nav
catering.html       Catering menu + ezCater ordering
assets/
  css/styles.css    All styling. Brand tokens live at the top in :root
  js/main.js        Rendering + interactions
  data/content.js   ← everything you will actually edit
  img/              Logo (SVG, extracted from the brand PDF) + placeholders
  video/            hero.mp4 — the silent banner reel
dist/preview.html   Generated single-file bundle (see below)
  fonts/            Drop licensed font files here
```

---

## Search visibility

Two things the build takes care of, and one that it cannot.

**The menu ships in the HTML.** `tools/prerender.mjs` bakes the rendered dish
markup into `menu.html` and `catering.html`, so a crawler sees all 147 items
without executing JavaScript. Before this the pages served an empty
`<main data-menu>` and the entire menu — the most searchable thing the
restaurant has — existed only after JS ran. **Re-run it after any change to the
menu data:**

```bash
node tools/prerender.mjs
```

It loads each page in a real browser and writes back what the page itself
rendered, so the baked markup cannot drift from the templates.

**Structured data** is generated from the same `content.js` the pages render
from: a full `Restaurant` on the home page with hours, location and rating, and
a `Menu` on each of the other two listing every section and price. That is what
lets Google show the menu directly in results.

**What the code cannot fix** is which site Google already trusts for this
business. That is settled by the Google Business Profile's website field, by
whether the old domains redirect here, and by the links on Yelp, TripAdvisor and
the delivery platforms. See the notes below.

## Editing content

**`assets/data/content.js` is the only file needed for routine updates.**
It is a plain JavaScript object — change the text between the quotes and save.

### The weekly specials

Find `const specials = [...]`. There are three entries: the first renders as the
wide tile, the other two sit side by side beneath it.

```js
{
  badge: "This week's headliner",   // the small pill above the name
  name:  "Berries & Nutella Crepes",
  desc:  "Two golden crepes rolled with mascarpone…",
  price: "$16.95",
  img:   "assets/img/special-berries-crepes.jpg",
  alt:   "Crepes with berries and Nutella"   // describes the photo for screen readers
}
```

To swap a photo: drop the file into `assets/img/` and point `img` at it.
Landscape images around 1400–1600px wide work best; they are cropped to fill,
so keep the plate near the middle.

Add `photoPending: true` to any special still waiting on its photo and the tile
shows a small "Photo pending" chip — useful while a week's shots are in
progress. All three currently have real photography, so none carry the flag.

### The delivery platform tiles

`const ordering` renders a row of small logo tiles, each linking out to that
platform. Toast and Grubhub point at the restaurant's real store pages. The
other three carry `searchOnly: true` — they open a search on that app because
the store link is not known yet. Replace `url` with the real store page and
delete the flag:

```js
{ key: "doordash", name: "DoorDash", wordmark: "DoorDash",
  brand: "#ff3008", fg: "#ffffff", note: "Delivery",
  url: "…", searchOnly: true }
```

Each tile currently draws the platform's name as a wordmark in its brand color
rather than its official logo, since those are trademarked artwork we do not
have licensed copies of. To use the real thing, download the asset from that
platform's brand or press kit, drop it in `assets/img/`, and add a `logo` key —
it replaces the wordmark with no other changes:

```js
{ key: "doordash", …, logo: "assets/img/order-doordash.svg" }
```

TikTok works like the old ordering cards — see `const social`; it stays a
disabled button until you paste a URL.

### Menu and prices

`const menu` (home menu) and `const catering.sections` share the same shape.
Add, remove or reorder sections freely; the sticky category nav builds itself
from whatever is there.

`tags` accepts `"veg"`, `"spicy"`, `"favorite"`, or any free text you want to show
as a pill.

---

## Still needed to go live

| # | Item | Where it goes |
|---|------|---------------|
| 1 | **Delivery logos** | Official artwork from each platform's brand kit, if you want it instead of the wordmarks. |
| 2 | **Chef bio** | The three paragraphs under `const chef` are written as placeholders. Replace with his real history. |
| 3 | *(nothing — both menus are transcribed from source documents)* | |
| 4 | **Review names** | Quotes are real and pulled from public Google/Yelp listings, attributed generically. Add reviewer first names if you want them shown. |
| 5 | **Brand fonts** | See below. |

### Where the menu data comes from

Both menus are transcriptions, not reconstructions:

- **Food menu** — the restaurant's printed menu PDF. 114 dishes in 14 sections;
  every price was checked back against that document.
- **Catering** — the ezCater listing. 33 items in 8 sections, with section order
  and descriptions from its structured data and prices, serving sizes and
  dietary chips from the page; every price was checked back against it.

```bash
grep -n "todo: true" assets/data/content.js
```

The only thing that still prints is the chef's biography, which is placeholder
prose.

### Brand fonts

**Nexa Script is in the repo and served from it** — `assets/fonts/nexa-script.woff2`,
converted from the supplied OTF (38 KB → 23 KB), with the OTF kept alongside as a
fallback source. Nothing is fetched from a third party for the display face, so it
renders identically on every device.

**Google Sans Flex** is in the repo too. It ships as a six-axis variable font
(4.2 MB); only weight varies in this design, so the other axes are pinned —
optical size at the 24pt text grade — which takes the woff2 from 1.9 MB to 92 KB.
Licensed under the OFL, included as `GoogleSansFlex-OFL.txt`.

With both faces local, **the pages request nothing from a third party**. That is
the durable fix for type looking different on an iPad than on a desktop.

#### Nexa Script cuts

Five licensed cuts are in `assets/fonts/` — thin, light, regular, semibold and
heavy. The design uses **semibold**: measured against the logo lockup it is the
closest of the five, with heavy closing the counters tighter than the mark does.

Only the cut named in the `@font-face` is ever downloaded, so the others cost
nothing sitting there. To try a different one, repoint that single `src`.

These are the full family, not the free cut — all 26 uppercase glyphs are
distinct outlines, which is what lets the title-cased headings render with real
capitals. (The free version duplicates 25 of its 26 capitals from the lowercase,
so `Good Morning,` came out as `good morning,`.)

### Why the type can differ between an iPad and a desktop

Both faces are loaded from Google Fonts over the network. When that request
succeeds the rendering is the same everywhere. When it fails — a content
blocker, a DNS filter, Lockdown Mode, a captive network — the browser silently
falls back to the next family in the stack, and those fallbacks are
platform-specific: `system-ui` is SF Pro on an iPad and Segoe UI or Roboto on a
desktop, and `cursive` is Snell Roundhand on iOS, which looks nothing like
Yellowtail. Same CSS, very different page.

There is no CSS fix for that, because the cause is the font never arriving. The
durable answer is to stop depending on a third party: download the two families
and serve them from this repo.

1. Get the files (Google Fonts → *Download family*, or `google-webfonts-helper`
   for ready-made woff2), and put them in `assets/fonts/`.
2. Add an `@font-face` for each, matching the names already used in
   `--font-sans` and `--font-script`.
3. Drop the `<link href="https://fonts.googleapis.com/...">` from the three
   HTML files.

After that the page carries its own type and renders identically offline, on a
locked-down network, and on any device.

To switch to the real thing, drop the licensed files in:

```
assets/fonts/nexa-script.woff2
assets/fonts/google-sans-flex.woff2
```

The `@font-face` rules at the top of `assets/css/styles.css` already point at
those paths and take over automatically. Until the files exist the browser logs
a harmless 404 for each and uses the fallback.

---

## Editing prices from the browser

There is a password-protected page at **`/admin.html`** where prices can be
changed without touching any code. It is built for someone who does not want to
see a repository: sign in, edit a number, press save, and the website shows the
new figure straight away.

### How it is put together

Every price still lives in `assets/data/content.js`, and that is what the pages
render first — so the menu is complete and indexable before anything is fetched,
and **if the database is unreachable the site simply shows the file prices**. The
database holds only the prices changed since; those are fetched after paint and
patched in. Nothing on the page depends on the service being up.

A dish is matched between the two by `<section>:<slug-of-name>` (see
`assets/js/dish-id.js`). Renaming a dish therefore detaches any saved price for
it and it reverts to the file value — the admin page flags those so they can be
re-entered.

### One-time setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query**, paste all of `supabase/setup.sql`, press Run.
   That creates the table and the security rules.
3. **Authentication → Users → Add user**, with the owner's email and a password.
   Tick *Auto Confirm User*. Repeat for anyone else who needs access — there is
   no public sign-up, so only invited accounts can ever write.
4. **Project Settings → API**, copy *Project URL* and the *anon public* key into
   `assets/data/supabase-config.js`, then commit.

That last key is meant to be public: it names the project, it does not grant
access. What protects the prices is the policy from step 2 — anyone may read
them, only a signed-in user may change them. The `service_role` key on that same
settings page bypasses every policy and must never go in this repo.

Until step 4 is done `/admin.html` explains that it is not connected yet, and
the public pages behave exactly as a plain static site.

## Deploying

The workflow in `.github/workflows/pages.yml` publishes every push to
`claude/restaurant-website-ydodav` (currently the repository's default branch).

### One-time setup — required before the first publish

Go to **[Settings → Pages](https://github.com/jaminjv/mbdchicago/settings/pages)**
and under **Build and deployment** set **Source** to **GitHub Actions**.

This cannot be automated: the token available to a workflow is not permitted to
create a Pages site, so the first run fails with *"Resource not accessible by
integration"* until the switch is flipped. Once it is on, re-run the latest job
from the **[Actions tab](https://github.com/jaminjv/mbdchicago/actions)** (or push
any commit) and the site goes live at:

```
https://mbdchicago.com
```

The `CNAME` file at the repository root is what claims that domain; GitHub reads
it on every deploy. Changing the domain means editing that file *and* the
canonical and Open Graph URLs in the three HTML pages.

## The banner video

`assets/video/hero.mp4` is the banner reel — 1920x1080, about 12 seconds,
looping. It is cropped to fill the frame at every screen size, so anything
important should sit near the middle.

**It is silent, deliberately and at two levels.** The audio track was removed
from the file itself, and the `<video>` element stays `muted` with no unmute
control anywhere in the UI. Muting is also what allows browsers to autoplay it
at all — an unmuted autoplaying video is blocked.

The clip is **trimmed to 8 seconds in the player, not in the file** — the
`data-cut="8"` attribute on the `<video>` sends it back to zero at that mark
instead of running to the end. Change the number to change the loop length;
remove the attribute to play the whole thing. Trimming this way avoids
re-encoding, which would cost a generation of quality.

To replace it, overwrite `hero.mp4` and update `assets/img/hero-poster.jpg`
with a frame from the new footage (the poster is what shows while the video
loads, so a mismatch reads as a flicker). If the new file has an audio track,
either strip it before committing or the `muted` attribute will keep it quiet
on its own.

### Why the preview handles the video differently

Safari will not play a `<video>` whose source is a `data:` URI — it wants byte
ranges, which data: URIs cannot serve — so a naively inlined clip plays in
Chromium and silently fails on iPad and Mac. The bundle therefore ships the
clip as `data-src` and converts it to a `blob:` URL at load, falling back to
the data: URI if blob creation is blocked. The deployed site is unaffected: it
loads the mp4 over plain HTTP like any other asset.

## The single-file preview

`dist/preview.html` is the whole site bundled into one file — CSS, JavaScript, logo
and placeholder art all inlined, with the three pages turned into hash-routed
views. It opens straight from the filesystem with no server, which makes it
easy to email or hand to someone before Pages is live.

Rebuild it after any content or style change:

```bash
node tools/build-preview.mjs             # with the banner video inlined (~6.5 MB)
node tools/build-preview.mjs --no-video  # poster frame only (~1.8 MB)
```

The base64 video is by far the largest thing in the bundle — about 4.8 MB of
the 6.5 — and a page that heavy is slow to open and has failed to publish
outright. Prefer `--no-video` for anything you send to someone: the hero keeps
its poster, which is a real frame of the footage, so the composition reads the
same, just still. The deployed site always has the moving version.

It is generated output, not a source file — edit the real pages and rebuild.
It lives in `dist/` for that reason.
Two things differ from the deployed site by necessity: the map embed becomes a
link card (embeds are blocked in sandboxed frames), and the licensed-font
`@font-face` rules are dropped in favor of the Google Fonts fallbacks.

## Running it locally

```bash
npx http-server -p 8080
# then open http://127.0.0.1:8080
```

Opening `index.html` straight from the filesystem mostly works, but a local
server is needed for the map embed and the video to behave normally.

---

## Notes on the name change

Public listings, delivery apps and review sites still carry **Early Morning
Delight**. The site leads with the new name everywhere and carries a short note in
the footer explaining the change, so a customer arriving from an old listing is
not confused. The Toast and ezCater links still use the old slug — that is the
restaurant's real ordering URL and works correctly.

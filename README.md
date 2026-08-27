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
  video/            Drop hero.mp4 here
  fonts/            Drop licensed font files here
```

---

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
  img:   "assets/img/special-1.jpg",
  alt:   "Crepes with berries and Nutella",   // describes the photo for screen readers
  photoPending: true                          // delete this line once the real photo is in
}
```

To swap a photo: drop the file into `assets/img/`, point `img` at it, and delete
the `photoPending: true` line. Landscape images around 1600px wide work best.

### Turning on the delivery platforms

DoorDash, Uber Eats, Postmates and Grubhub are built and waiting. Each card
switches from *Coming soon* to a live button the moment you paste a URL:

```js
{ key: "doordash", name: "DoorDash", note: "…", url: "", cta: "Order on DoorDash" }
//                                             ^^ paste the link here
```

TikTok works the same way — see `const social`.

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
| 1 | **Hero video** | Save as `assets/video/hero.mp4`. It is cropped to fill the banner, so keep the subject centered. An `.webm` alongside it is a nice extra. A branded still shows until the file exists. |
| 2 | **Food photography** | `assets/img/` — three weekly specials, plus an `og-cover.jpg` for link previews. |
| 3 | **Chef photo** | `assets/img/chef.jpg`, then update `chef.photo` and drop `photoPending`. |
| 4 | **Chef bio** | The three paragraphs under `const chef` are written as placeholders. Replace with his real history. |
| 5 | **Menu prices** | Every entry marked `todo: true` was reconstructed from public listings and needs a check against the live Toast menu. See below. |
| 6 | **Review names** | Quotes are real and pulled from public Google/Yelp listings, attributed generically. Add reviewer first names if you want them shown. |
| 7 | **Brand fonts** | See below. |

### Checking the flagged prices

```bash
grep -n "todo: true" assets/data/content.js
```

Everything that prints needs a confirmed price or wording. Delete the flag as you
verify each one — it has no effect on the page, it is purely a checklist.

### Brand fonts

The design calls for **Nexa Script** (the logo's script) and **Google Sans Flex**
(the wordmark font, confirmed from the brand PDF). Neither is free to serve, so
the site currently falls back to **Yellowtail** and **Outfit** from Google Fonts,
which are close in feel.

To switch to the real thing, drop the licensed files in:

```
assets/fonts/nexa-script.woff2
assets/fonts/google-sans-flex.woff2
```

The `@font-face` rules at the top of `assets/css/styles.css` already point at
those paths and take over automatically. Until the files exist the browser logs
a harmless 404 for each and uses the fallback.

---

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
https://jaminjv.github.io/mbdchicago/
```

When the real domain is ready, add it under Settings → Pages → Custom domain, and
update the `<link rel="canonical">` in `index.html`.

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

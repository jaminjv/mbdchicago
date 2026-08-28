/* ============================================================
   Stable identifier for a menu item.

   Prices live in the repo (assets/data/content.js) and can be
   overridden from the database. Both sides need to agree on what
   names a dish, and this is that agreement: the section it sits in
   plus a slug of its name.

   Renaming a dish therefore changes its id, and any price saved
   under the old one stops applying — the dish falls back to the
   price in the file. The admin page flags those orphans so they can
   be cleared out.
   ============================================================ */
window.MBD_dishId = function (sectionId, name) {
  const slug = String(name)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")   // strip accents
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return sectionId + ":" + slug;
};

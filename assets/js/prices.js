/* ============================================================
   Live price overrides.

   The menu renders immediately from assets/data/content.js, so the
   page is complete and indexable before anything is fetched. This
   then asks the database whether any price has changed since, and
   patches only those. If the request fails, or Supabase is not
   configured, nothing happens and the file prices stand.
   ============================================================ */
(function () {
  "use strict";

  const cfg = window.MBD_SUPABASE;
  if (!cfg || !cfg.url || !cfg.anonKey) return;

  const REST = cfg.url.replace(/\/+$/, "") + "/rest/v1/menu_prices";

  function apply(rows) {
    if (!Array.isArray(rows) || !rows.length) return;
    const byId = new Map(rows.map((r) => [r.id, r.price]));

    document.querySelectorAll("[data-dish-id]").forEach((dish) => {
      const price = byId.get(dish.dataset.dishId);
      if (price === undefined) return;
      const el = dish.querySelector(".dish__price");
      if (el && el.textContent !== price) el.textContent = price;
    });

    // Keep the in-memory menu in step, so anything rendering later
    // (a re-render, the admin page) sees the same numbers.
    const patch = (sections) => sections.forEach((s) =>
      s.items.forEach((i) => {
        const p = byId.get(window.MBD_dishId(s.id, i.name));
        if (p !== undefined) i.price = p;
      }));
    if (window.MBD) {
      patch(window.MBD.menu || []);
      patch((window.MBD.catering && window.MBD.catering.sections) || []);
    }
  }

  fetch(REST + "?select=id,price", {
    headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey }
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status))))
    .then(apply)
    .catch(() => { /* the file prices are already on screen */ });
})();

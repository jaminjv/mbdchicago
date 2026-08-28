/* ============================================================
   Price editor.

   Talks to Supabase over plain REST — no SDK, nothing to load from
   a CDN. Sign in exchanges the email and password for an access
   token; that token is what authorises the writes, and the row
   level security policy in supabase/setup.sql is what actually
   enforces who may write.

   The token is kept in sessionStorage, so closing the tab signs the
   editor out.
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const cfg = window.MBD_SUPABASE || {};
  const configured = Boolean(cfg.url && cfg.anonKey);
  const BASE = configured ? cfg.url.replace(/\/+$/, "") : "";
  const KEY = "mbd.session";

  const views = { setup: $("#view-setup"), login: $("#view-login"), editor: $("#view-editor") };
  const show = (name) => Object.entries(views).forEach(([k, el]) => { el.hidden = k !== name; });

  const say = (el, kind, msg) => {
    el.className = "note note--" + kind;
    el.textContent = msg;
    el.hidden = false;
  };
  const hide = (el) => { el.hidden = true; };

  /* ---- session ------------------------------------------------ */
  const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch { return null; } };
  const save = (s) => { try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode */ } };
  const clear = () => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } };

  async function signIn(email, password) {
    const r = await fetch(BASE + "/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: { apikey: cfg.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) {
      throw new Error(body.error_description || body.msg || body.message ||
        (r.status === 400 ? "That email and password do not match an account." : "Sign in failed (" + r.status + ")."));
    }
    return { token: body.access_token, email: (body.user && body.user.email) || email };
  }

  /* ---- the dish list ------------------------------------------ */
  function allSections() {
    const D = window.MBD;
    return [
      ...(D.menu || []).map((s) => ({ ...s, group: "Menu" })),
      ...((D.catering && D.catering.sections) || []).map((s) => ({ ...s, group: "Catering" }))
    ];
  }

  function render(overrides) {
    const host = $("#dishes");
    host.innerHTML = allSections().map((s) => `
      <section class="admin__section">
        <h2>${esc(s.group)} · ${esc(s.title)}</h2>
        ${s.items.map((item) => {
          const id = window.MBD_dishId(s.id, item.name);
          const live = overrides.has(id) ? overrides.get(id) : item.price;
          return `
          <div class="price-row" data-id="${esc(id)}" data-file-price="${esc(item.price)}">
            <span class="price-row__name">${esc(item.name)}</span>
            ${overrides.has(id) && overrides.get(id) !== item.price
              ? `<span class="price-row__was">was ${esc(item.price)}</span>` : ""}
            <input type="text" inputmode="decimal" aria-label="Price for ${esc(item.name)}"
                   value="${esc(live)}" data-initial="${esc(live)}">
          </div>`;
        }).join("")}
      </section>`).join("");

    host.addEventListener("input", (e) => {
      const input = e.target.closest("input");
      if (!input) return;
      const row = input.closest(".price-row");
      row.dataset.changed = String(input.value.trim() !== input.dataset.initial);
      countChanges();
    });
    countChanges();
  }

  function changedRows() {
    return $$(".price-row").filter((r) => r.dataset.changed === "true");
  }
  function countChanges() {
    const n = changedRows().length;
    $("#change-count").textContent = n === 0 ? "No changes yet"
      : n === 1 ? "1 price changed" : n + " prices changed";
    $("#save").disabled = n === 0;
  }

  async function fetchOverrides(token) {
    const r = await fetch(BASE + "/rest/v1/menu_prices?select=id,price", {
      headers: { apikey: cfg.anonKey, Authorization: "Bearer " + (token || cfg.anonKey) }
    });
    if (!r.ok) throw new Error("Could not load saved prices (" + r.status + ").");
    return new Map((await r.json()).map((row) => [row.id, row.price]));
  }

  async function saveChanges(token) {
    const rows = changedRows().map((r) => ({
      id: r.dataset.id,
      price: r.querySelector("input").value.trim()
    }));
    const blank = rows.find((r) => !r.price);
    if (blank) throw new Error("A price is empty. Fill it in, or put the old value back.");

    const r = await fetch(BASE + "/rest/v1/menu_prices", {
      method: "POST",
      headers: {
        apikey: cfg.anonKey,
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(rows)
    });
    if (!r.ok) {
      const b = await r.json().catch(() => ({}));
      throw new Error(b.message || "Saving failed (" + r.status + "). Your sign in may have expired.");
    }
    return rows.length;
  }

  /* ---- wiring -------------------------------------------------- */
  async function openEditor(session) {
    show("editor");
    $("#who").textContent = session.email;
    const msg = $("#editor-msg");
    try {
      const overrides = await fetchOverrides(session.token);
      render(overrides);

      // Overrides whose dish no longer exists — usually a rename.
      const known = new Set(allSections().flatMap((s) =>
        s.items.map((i) => window.MBD_dishId(s.id, i.name))));
      const orphans = [...overrides.keys()].filter((id) => !known.has(id));
      if (orphans.length) {
        say(msg, "warn", orphans.length + " saved price" + (orphans.length > 1 ? "s no longer match a dish" : " no longer matches a dish") +
          " on the menu, so it is being ignored. This happens when a dish is renamed.");
      }
    } catch (err) {
      say(msg, "bad", err.message);
    }
  }

  function boot() {
    if (!configured) { show("setup"); return; }

    const session = load();
    if (session && session.token) { openEditor(session); } else { show("login"); }

    $("#login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("#login-btn"), msg = $("#login-msg");
      hide(msg);
      btn.disabled = true; btn.textContent = "Signing in…";
      try {
        const s = await signIn($("#email").value.trim(), $("#password").value);
        save(s);
        openEditor(s);
      } catch (err) {
        say(msg, "bad", err.message);
      } finally {
        btn.disabled = false; btn.textContent = "Sign in";
      }
    });

    $("#save").addEventListener("click", async () => {
      const btn = $("#save"), msg = $("#editor-msg");
      hide(msg);
      btn.disabled = true; btn.textContent = "Saving…";
      try {
        const n = await saveChanges(load().token);
        $$(".price-row").forEach((r) => {
          const i = r.querySelector("input");
          i.dataset.initial = i.value.trim();
          r.dataset.changed = "false";
          const was = r.querySelector(".price-row__was");
          if (was) was.remove();
        });
        countChanges();
        say(msg, "good", n + (n === 1 ? " price saved." : " prices saved.") +
          " The website shows the new figures right away — no need to republish.");
      } catch (err) {
        say(msg, "bad", err.message);
      } finally {
        btn.textContent = "Save changes";
        countChanges();
      }
    });

    $("#signout").addEventListener("click", () => { clear(); location.reload(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

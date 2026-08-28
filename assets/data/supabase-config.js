/* ============================================================
   Supabase connection.

   Fill these in after creating the project (see README, "Editing
   prices from the browser"). While they are empty the site behaves
   exactly as a plain static site: prices come from content.js and
   the admin page says it is not configured yet.

   The anon key is MEANT to be public — it identifies the project,
   it does not grant access. What protects the data is the row level
   security policy in supabase/setup.sql: anyone may read prices,
   only a signed-in user may change them. Never put the service_role
   key here; that one does bypass every policy.
   ============================================================ */
window.MBD_SUPABASE = {
  url: "",      // e.g. "https://abcdefghijkl.supabase.co"
  anonKey: ""   // the "anon public" key from Project Settings -> API
};

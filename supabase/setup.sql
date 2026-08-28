-- ============================================================
-- Morning Breakfast Delight — price overrides
--
-- Run this once in the Supabase SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- The website keeps its own copy of every price in
-- assets/data/content.js. This table only holds prices that have
-- been changed since, so the site still renders correctly if the
-- database is unreachable.
-- ============================================================

create table if not exists public.menu_prices (
  id          text primary key,          -- "<section>:<dish-slug>", see assets/js/dish-id.js
  price       text not null,             -- shown verbatim, e.g. "$14.65"
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users (id)
);

alter table public.menu_prices enable row level security;

-- The menu is public, so anyone may read the overrides.
drop policy if exists "prices are readable by anyone" on public.menu_prices;
create policy "prices are readable by anyone"
  on public.menu_prices for select
  using (true);

-- Only a signed-in user may add or change one. There is no sign-up
-- policy here on purpose: accounts are created by hand in the
-- dashboard, so only people you invite can ever write.
drop policy if exists "signed-in users may write prices" on public.menu_prices;
create policy "signed-in users may write prices"
  on public.menu_prices for all
  to authenticated
  using (true)
  with check (true);

-- Stamp who changed what, so the history is not anonymous.
create or replace function public.touch_menu_price()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists menu_prices_touch on public.menu_prices;
create trigger menu_prices_touch
  before insert or update on public.menu_prices
  for each row execute function public.touch_menu_price();

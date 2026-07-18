-- Chapitre 5 : Apple Wallet, Google Wallet & QR Code intelligent
-- Run via `supabase db push` or paste into the Supabase SQL editor.
-- Depends on merchants / customers from Chapitres 3-4.

create table if not exists public.wallet_card_designs (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null unique references public.merchants (id) on delete cascade,
  business_name text,
  description text,
  logo_url text,
  icon_url text,
  banner_url text,
  primary_color text not null default '#4F46E5',
  secondary_color text not null default '#0F1729',
  address text,
  phone text,
  website text,
  social_links jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_passes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null unique references public.customers (id) on delete cascade,
  card_design_id uuid not null references public.wallet_card_designs (id) on delete cascade,
  token text not null unique,
  apple_added_at timestamptz,
  google_added_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists wallet_passes_token_idx on public.wallet_passes (token);

create table if not exists public.wallet_scans (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  action text not null default 'view' check (action in ('view', 'add_points', 'remove_points', 'redeem_reward')),
  created_at timestamptz not null default now()
);

create index if not exists wallet_scans_customer_id_idx on public.wallet_scans (customer_id);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  type text not null check (
    type in ('points_earned', 'reward_unlocked', 'special_offer', 'promotion', 'birthday', 'card_updated')
  ),
  title text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_customer_id_idx on public.notifications (customer_id);

create or replace function public.set_updated_at_wallet()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists wallet_card_designs_set_updated_at on public.wallet_card_designs;
create trigger wallet_card_designs_set_updated_at
  before update on public.wallet_card_designs
  for each row execute function public.set_updated_at_wallet();

drop trigger if exists wallet_passes_set_updated_at on public.wallet_passes;
create trigger wallet_passes_set_updated_at
  before update on public.wallet_passes
  for each row execute function public.set_updated_at_wallet();

-- Row Level Security: a merchant only ever sees and manages their own wallet data.

alter table public.wallet_card_designs enable row level security;
alter table public.wallet_passes enable row level security;
alter table public.wallet_scans enable row level security;
alter table public.notifications enable row level security;

create policy "Merchants can manage their own card design"
  on public.wallet_card_designs for all
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = wallet_card_designs.merchant_id
        and merchants.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.merchants
      where merchants.id = wallet_card_designs.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can manage wallet passes for their own customers"
  on public.wallet_passes for all
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = wallet_passes.customer_id
        and merchants.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = wallet_passes.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can view and record scans for their own customers"
  on public.wallet_scans for all
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = wallet_scans.customer_id
        and merchants.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = wallet_scans.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can manage notifications for their own customers"
  on public.notifications for all
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = notifications.customer_id
        and merchants.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = notifications.customer_id
        and merchants.user_id = auth.uid()
    )
  );

-- Public access: the /wallet/[token] page has no merchant session — a customer
-- only needs their own pass token (like a real Apple/Google Wallet pass link).
-- We deliberately do NOT grant anon direct SELECT on customers/wallet_passes
-- (that would leak every customer's email/phone/birthday to anyone who can
-- guess a UUID). Instead, two SECURITY DEFINER functions expose only the
-- exact columns a public card needs, scoped strictly by an exact token match.

create or replace function public.get_public_wallet_card(p_token text)
returns table (
  token text,
  first_name text,
  last_name text,
  total_points integer,
  total_visits integer,
  loyalty_level text,
  member_since timestamptz,
  last_visit timestamptz,
  business_name text,
  card_description text,
  logo_url text,
  icon_url text,
  banner_url text,
  primary_color text,
  secondary_color text,
  address text,
  phone text,
  website text,
  social_links jsonb,
  apple_added_at timestamptz,
  google_added_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    wp.token,
    c.first_name,
    c.last_name,
    c.total_points,
    c.total_visits,
    c.loyalty_level,
    c.created_at,
    c.last_visit,
    coalesce(wcd.business_name, m.business_name),
    wcd.description,
    wcd.logo_url,
    wcd.icon_url,
    wcd.banner_url,
    wcd.primary_color,
    wcd.secondary_color,
    wcd.address,
    wcd.phone,
    wcd.website,
    wcd.social_links,
    wp.apple_added_at,
    wp.google_added_at
  from public.wallet_passes wp
  join public.customers c on c.id = wp.customer_id
  join public.wallet_card_designs wcd on wcd.id = wp.card_design_id
  join public.merchants m on m.id = wcd.merchant_id
  where wp.token = p_token;
$$;

grant execute on function public.get_public_wallet_card(text) to anon, authenticated;

create or replace function public.mark_wallet_pass_added(p_token text, p_platform text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_platform = 'apple' then
    update public.wallet_passes set apple_added_at = now() where token = p_token;
  elsif p_platform = 'google' then
    update public.wallet_passes set google_added_at = now() where token = p_token;
  end if;
end;
$$;

grant execute on function public.mark_wallet_pass_added(text, text) to anon, authenticated;

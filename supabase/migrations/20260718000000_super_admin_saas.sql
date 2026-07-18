-- Chapitre 6 : rôles, multi-commerçants, abonnements, audit logs, paramètres plateforme
-- Run via `supabase db push` or paste into the Supabase SQL editor.
-- Depends on merchants / customers / wallet_* from Chapitres 3-5.

-- ============================================================================
-- Rôles (profiles)
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'merchant' check (role in ('super_admin', 'merchant', 'staff', 'customer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Every new auth user gets a profile row automatically. Registration today is
-- merchant self-signup, so 'merchant' is the correct default; the super admin
-- account is promoted explicitly below.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data ->> 'business_name', 'merchant')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: any auth user created before this migration (or before the
-- trigger fires) still gets a profile.
insert into public.profiles (id, email, full_name, role)
select u.id, u.email, u.raw_user_meta_data ->> 'business_name', 'merchant'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- Seed the platform owner. Re-runnable: promotes the account the moment it
-- exists, does nothing before that.
update public.profiles
set role = 'super_admin'
where lower(email) = lower('Morgancoulet5@icloud.com');

-- ============================================================================
-- Merchants : statut (actif / suspendu)
-- ============================================================================

alter table public.merchants
  add column if not exists status text not null default 'active' check (status in ('active', 'suspended'));

create index if not exists merchants_status_idx on public.merchants (status);

-- ============================================================================
-- Abonnements (préparation Stripe : champs présents, pas d'appel API)
-- ============================================================================

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null unique references public.merchants (id) on delete cascade,
  plan text not null default 'starter' check (plan in ('starter', 'pro', 'premium')),
  price numeric not null default 19,
  status text not null default 'trialing' check (status in ('trialing', 'active', 'past_due', 'canceled')),
  current_period_end timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_merchant_id_idx on public.subscriptions (merchant_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- Every merchant gets a default subscription row the moment it's created.
create or replace function public.handle_new_merchant()
returns trigger as $$
begin
  insert into public.subscriptions (merchant_id)
  values (new.id)
  on conflict (merchant_id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_merchant_created on public.merchants;
create trigger on_merchant_created
  after insert on public.merchants
  for each row execute function public.handle_new_merchant();

-- Backfill for merchants that already existed before this migration.
insert into public.subscriptions (merchant_id)
select m.id from public.merchants m
left join public.subscriptions s on s.merchant_id = m.id
where s.merchant_id is null;

create table if not exists public.subscription_payments (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions (id) on delete cascade,
  amount numeric not null default 0,
  currency text not null default 'EUR',
  status text not null default 'paid' check (status in ('paid', 'failed', 'refunded')),
  paid_at timestamptz not null default now(),
  stripe_invoice_id text,
  created_at timestamptz not null default now()
);

create index if not exists subscription_payments_subscription_id_idx on public.subscription_payments (subscription_id);

-- ============================================================================
-- Audit logs
-- ============================================================================

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  actor_email text,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index if not exists audit_logs_actor_id_idx on public.audit_logs (actor_id);

-- The only way to write an audit log row: SECURITY DEFINER means it runs as
-- the table owner and bypasses RLS, so no direct INSERT policy is granted to
-- `authenticated` below — logs can't be forged or edited by any client.
create or replace function public.log_audit_event(
  p_action text,
  p_entity_type text default null,
  p_entity_id uuid default null,
  p_metadata jsonb default '{}'::jsonb
)
returns public.audit_logs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.audit_logs;
  v_email text;
begin
  select email into v_email from auth.users where id = auth.uid();

  insert into public.audit_logs (actor_id, actor_email, action, entity_type, entity_id, metadata)
  values (auth.uid(), v_email, p_action, p_entity_type, p_entity_id, coalesce(p_metadata, '{}'::jsonb))
  returning * into v_row;

  return v_row;
end;
$$;

grant execute on function public.log_audit_event(text, text, uuid, jsonb) to authenticated;

-- ============================================================================
-- Paramètres de la plateforme (ligne unique)
-- ============================================================================

create table if not exists public.platform_settings (
  id uuid primary key default gen_random_uuid(),
  is_singleton boolean not null default true unique,
  platform_name text not null default 'PassLoyal',
  logo_url text,
  support_email text,
  maintenance_mode boolean not null default false,
  wallet_default_primary_color text not null default '#4F46E5',
  wallet_default_secondary_color text not null default '#0F1729',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists platform_settings_set_updated_at on public.platform_settings;
create trigger platform_settings_set_updated_at
  before update on public.platform_settings
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================

create or replace function public.is_super_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'super_admin'
  );
$$;

grant execute on function public.is_super_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.subscription_payments enable row level security;
alter table public.audit_logs enable row level security;
alter table public.platform_settings enable row level security;

-- profiles: everyone can read their own row; only a super admin can read/write
-- any profile (including role changes — merchants can never self-promote).
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Super admins can manage all profiles"
  on public.profiles for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- subscriptions: a merchant can see (read-only) their own subscription; only
-- a super admin can change plan/price/status.
create policy "Merchants can view their own subscription"
  on public.subscriptions for select
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = subscriptions.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Super admins can manage all subscriptions"
  on public.subscriptions for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Merchants can view their own subscription payments"
  on public.subscription_payments for select
  using (
    exists (
      select 1 from public.subscriptions
      join public.merchants on merchants.id = subscriptions.merchant_id
      where subscriptions.id = subscription_payments.subscription_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Super admins can manage all subscription payments"
  on public.subscription_payments for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- audit_logs: only super admins can read; nobody gets a direct write policy
-- (writes only happen through the SECURITY DEFINER function above).
create policy "Super admins can view audit logs"
  on public.audit_logs for select
  using (public.is_super_admin());

-- platform_settings: no secrets live here (Stripe/Apple/Google keys stay in
-- env vars), so anyone can read it (e.g. a maintenance-mode banner); only a
-- super admin can change it.
create policy "Anyone can view platform settings"
  on public.platform_settings for select
  using (true);

create policy "Super admins can manage platform settings"
  on public.platform_settings for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- ----------------------------------------------------------------------------
-- Supplemental super-admin policies on Chapitres 3-5 tables. These are added
-- alongside the existing merchant-scoped policies (Postgres OR's permissive
-- policies together), so merchant access is completely unchanged and a super
-- admin additionally gets full access everywhere.
-- ----------------------------------------------------------------------------

create policy "Super admins can manage all merchants"
  on public.merchants for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all programs"
  on public.loyalty_programs for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all customers"
  on public.customers for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all customer visits"
  on public.customer_visits for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all rewards history"
  on public.rewards_history for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all wallet card designs"
  on public.wallet_card_designs for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all wallet passes"
  on public.wallet_passes for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all wallet scans"
  on public.wallet_scans for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can manage all notifications"
  on public.notifications for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

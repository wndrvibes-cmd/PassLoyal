-- Chapitre 3 : programmes de fidélité
-- Run via `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.merchants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  business_name text not null,
  logo_url text,
  phone text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.loyalty_programs (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  name text not null,
  description text,
  primary_color text not null default '#4F46E5',
  secondary_color text not null default '#0F1729',
  logo_url text,
  qr_code_enabled boolean not null default true,
  wallet_enabled boolean not null default true,
  reward_type text not null default 'points' check (reward_type in ('points', 'stamps', 'custom')),
  points_per_visit integer not null default 0 check (points_per_visit >= 0),
  points_per_euro numeric not null default 0 check (points_per_euro >= 0),
  reward_points integer not null default 100 check (reward_points > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists loyalty_programs_merchant_id_idx on public.loyalty_programs (merchant_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists loyalty_programs_set_updated_at on public.loyalty_programs;
create trigger loyalty_programs_set_updated_at
  before update on public.loyalty_programs
  for each row execute function public.set_updated_at();

-- Row Level Security: a merchant only ever sees and manages their own data.

alter table public.merchants enable row level security;
alter table public.loyalty_programs enable row level security;

create policy "Merchants can view their own record"
  on public.merchants for select
  using (auth.uid() = user_id);

create policy "Merchants can insert their own record"
  on public.merchants for insert
  with check (auth.uid() = user_id);

create policy "Merchants can update their own record"
  on public.merchants for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Merchants can delete their own record"
  on public.merchants for delete
  using (auth.uid() = user_id);

create policy "Merchants can view their own programs"
  on public.loyalty_programs for select
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = loyalty_programs.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can insert programs for themselves"
  on public.loyalty_programs for insert
  with check (
    exists (
      select 1 from public.merchants
      where merchants.id = loyalty_programs.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can update their own programs"
  on public.loyalty_programs for update
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = loyalty_programs.merchant_id
        and merchants.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.merchants
      where merchants.id = loyalty_programs.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can delete their own programs"
  on public.loyalty_programs for delete
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = loyalty_programs.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

-- Chapitre 4 : CRM clients (customers, customer_visits, rewards_history)
-- Run via `supabase db push` or paste into the Supabase SQL editor.
-- Depends on the merchants / loyalty_programs tables from Chapitre 3.

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  birthday date,
  gender text check (gender in ('male', 'female', 'other')),
  wallet_platform text check (wallet_platform in ('apple', 'google')),
  total_points integer not null default 0,
  total_visits integer not null default 0,
  total_spent numeric not null default 0,
  loyalty_level text not null default 'bronze' check (loyalty_level in ('bronze', 'silver', 'gold', 'platinum')),
  -- Not in the original column list: required to support "désactiver un client"
  -- without deleting their record.
  is_active boolean not null default true,
  last_visit timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_merchant_id_idx on public.customers (merchant_id);
create index if not exists customers_email_idx on public.customers (merchant_id, email);

create table if not exists public.customer_visits (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  program_id uuid references public.loyalty_programs (id) on delete set null,
  points_earned integer not null default 0,
  amount_spent numeric not null default 0,
  -- Not in the original column list: distinguishes a real visit from a manual
  -- points add/remove so "nombre de visites" stats stay accurate.
  source text not null default 'visit' check (source in ('visit', 'manual')),
  visit_date timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists customer_visits_customer_id_idx on public.customer_visits (customer_id);

create table if not exists public.rewards_history (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  reward_name text not null,
  points_used integer not null default 0,
  redeemed_at timestamptz not null default now()
);

create index if not exists rewards_history_customer_id_idx on public.rewards_history (customer_id);

create or replace function public.set_updated_at_customers()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at_customers();

-- Keep customers.total_points / total_visits / total_spent / last_visit in
-- sync automatically, so "annuler une opération" is just a DELETE and the
-- aggregates always reflect the underlying ledger.

create or replace function public.recalculate_customer_stats(p_customer_id uuid)
returns void as $$
begin
  update public.customers c
  set
    total_visits = coalesce((
      select count(*) from public.customer_visits v
      where v.customer_id = p_customer_id and v.source = 'visit'
    ), 0),
    total_spent = coalesce((
      select sum(v.amount_spent) from public.customer_visits v
      where v.customer_id = p_customer_id
    ), 0),
    total_points = coalesce((
      select sum(v.points_earned) from public.customer_visits v
      where v.customer_id = p_customer_id
    ), 0) - coalesce((
      select sum(r.points_used) from public.rewards_history r
      where r.customer_id = p_customer_id
    ), 0),
    last_visit = (
      select max(v.visit_date) from public.customer_visits v
      where v.customer_id = p_customer_id and v.source = 'visit'
    )
  where c.id = p_customer_id;
end;
$$ language plpgsql;

create or replace function public.handle_customer_visit_change()
returns trigger as $$
begin
  if (tg_op = 'DELETE') then
    perform public.recalculate_customer_stats(old.customer_id);
    return old;
  else
    perform public.recalculate_customer_stats(new.customer_id);
    return new;
  end if;
end;
$$ language plpgsql;

drop trigger if exists customer_visits_after_change on public.customer_visits;
create trigger customer_visits_after_change
  after insert or update or delete on public.customer_visits
  for each row execute function public.handle_customer_visit_change();

create or replace function public.handle_reward_history_change()
returns trigger as $$
begin
  if (tg_op = 'DELETE') then
    perform public.recalculate_customer_stats(old.customer_id);
    return old;
  else
    perform public.recalculate_customer_stats(new.customer_id);
    return new;
  end if;
end;
$$ language plpgsql;

drop trigger if exists rewards_history_after_change on public.rewards_history;
create trigger rewards_history_after_change
  after insert or update or delete on public.rewards_history
  for each row execute function public.handle_reward_history_change();

-- Row Level Security: a merchant only ever sees and manages their own customers.

alter table public.customers enable row level security;
alter table public.customer_visits enable row level security;
alter table public.rewards_history enable row level security;

create policy "Merchants can view their own customers"
  on public.customers for select
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = customers.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can insert customers for themselves"
  on public.customers for insert
  with check (
    exists (
      select 1 from public.merchants
      where merchants.id = customers.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can update their own customers"
  on public.customers for update
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = customers.merchant_id
        and merchants.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.merchants
      where merchants.id = customers.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can delete their own customers"
  on public.customers for delete
  using (
    exists (
      select 1 from public.merchants
      where merchants.id = customers.merchant_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can view their own customer visits"
  on public.customer_visits for select
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = customer_visits.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can insert visits for their own customers"
  on public.customer_visits for insert
  with check (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = customer_visits.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can delete visits for their own customers"
  on public.customer_visits for delete
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = customer_visits.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can view their own rewards history"
  on public.rewards_history for select
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = rewards_history.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can insert rewards for their own customers"
  on public.rewards_history for insert
  with check (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = rewards_history.customer_id
        and merchants.user_id = auth.uid()
    )
  );

create policy "Merchants can delete rewards for their own customers"
  on public.rewards_history for delete
  using (
    exists (
      select 1 from public.customers
      join public.merchants on merchants.id = customers.merchant_id
      where customers.id = rewards_history.customer_id
        and merchants.user_id = auth.uid()
    )
  );

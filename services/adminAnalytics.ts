import type { SupabaseClient } from "@supabase/supabase-js";

export interface PlatformStats {
  merchantsCount: number;
  customersCount: number;
  programsCount: number;
  walletPassesCount: number;
  appleWalletCount: number;
  googleWalletCount: number;
  scansCount: number;
  mrr: number;
  arr: number;
  revenue: number;
  newMerchantsThisMonth: number;
  newCustomersThisMonth: number;
}

function startOfMonthIso(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

export async function getPlatformStats(supabase: SupabaseClient): Promise<PlatformStats> {
  const monthStart = startOfMonthIso();

  const [
    { count: merchantsCount },
    { count: customersCount },
    { count: programsCount },
    { data: passes },
    { count: scansCount },
    { data: subscriptions },
    { data: payments },
    { count: newMerchantsThisMonth },
    { count: newCustomersThisMonth },
  ] = await Promise.all([
    supabase.from("merchants").select("*", { count: "exact", head: true }),
    supabase.from("customers").select("*", { count: "exact", head: true }),
    supabase.from("loyalty_programs").select("*", { count: "exact", head: true }),
    supabase.from("wallet_passes").select("apple_added_at, google_added_at"),
    supabase.from("wallet_scans").select("*", { count: "exact", head: true }),
    supabase.from("subscriptions").select("price, status"),
    supabase.from("subscription_payments").select("amount"),
    supabase.from("merchants").select("*", { count: "exact", head: true }).gte("created_at", monthStart),
    supabase.from("customers").select("*", { count: "exact", head: true }).gte("created_at", monthStart),
  ]);

  const passRows = (passes ?? []) as Array<{ apple_added_at: string | null; google_added_at: string | null }>;
  const subscriptionRows = (subscriptions ?? []) as Array<{ price: number; status: string }>;
  const paymentRows = (payments ?? []) as Array<{ amount: number }>;

  const mrr = subscriptionRows
    .filter((row) => row.status === "active")
    .reduce((sum, row) => sum + Number(row.price), 0);

  return {
    merchantsCount: merchantsCount ?? 0,
    customersCount: customersCount ?? 0,
    programsCount: programsCount ?? 0,
    walletPassesCount: passRows.length,
    appleWalletCount: passRows.filter((row) => row.apple_added_at).length,
    googleWalletCount: passRows.filter((row) => row.google_added_at).length,
    scansCount: scansCount ?? 0,
    mrr,
    arr: mrr * 12,
    revenue: paymentRows.reduce((sum, row) => sum + Number(row.amount), 0),
    newMerchantsThisMonth: newMerchantsThisMonth ?? 0,
    newCustomersThisMonth: newCustomersThisMonth ?? 0,
  };
}

export interface MonthlyPoint {
  month: string;
  merchants: number;
  customers: number;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
}

export async function getGrowthTimeSeries(
  supabase: SupabaseClient,
  months = 6
): Promise<MonthlyPoint[]> {
  const since = new Date();
  since.setMonth(since.getMonth() - (months - 1));
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const [{ data: merchants }, { data: customers }] = await Promise.all([
    supabase.from("merchants").select("created_at").gte("created_at", since.toISOString()),
    supabase.from("customers").select("created_at").gte("created_at", since.toISOString()),
  ]);

  const buckets = new Map<string, MonthlyPoint>();
  for (let index = 0; index < months; index += 1) {
    const date = new Date(since.getFullYear(), since.getMonth() + index, 1);
    const key = monthKey(date);
    buckets.set(key, { month: monthLabel(key), merchants: 0, customers: 0 });
  }

  ((merchants ?? []) as Array<{ created_at: string }>).forEach((row) => {
    const key = monthKey(new Date(row.created_at));
    const bucket = buckets.get(key);
    if (bucket) bucket.merchants += 1;
  });

  ((customers ?? []) as Array<{ created_at: string }>).forEach((row) => {
    const key = monthKey(new Date(row.created_at));
    const bucket = buckets.get(key);
    if (bucket) bucket.customers += 1;
  });

  return Array.from(buckets.values());
}

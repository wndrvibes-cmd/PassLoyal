import type { SupabaseClient } from "@supabase/supabase-js";

export interface AdminWalletOverview {
  totalPasses: number;
  appleCount: number;
  googleCount: number;
  activeCount: number;
  expiredCount: number;
  totalScans: number;
}

/** "Expired" has no dedicated column yet — a deactivated customer's card is
 * counted as expired, matching what /dashboard already treats as inactive. */
export async function getWalletOverview(supabase: SupabaseClient): Promise<AdminWalletOverview> {
  const [{ data: passes, error: passesError }, { count: totalScans }] = await Promise.all([
    supabase.from("wallet_passes").select("apple_added_at, google_added_at, customers(is_active)"),
    supabase.from("wallet_scans").select("*", { count: "exact", head: true }),
  ]);

  if (passesError) throw passesError;

  const rows = (passes ?? []) as Array<{
    apple_added_at: string | null;
    google_added_at: string | null;
    customers: { is_active: boolean } | null;
  }>;

  return {
    totalPasses: rows.length,
    appleCount: rows.filter((row) => row.apple_added_at).length,
    googleCount: rows.filter((row) => row.google_added_at).length,
    activeCount: rows.filter((row) => row.customers?.is_active).length,
    expiredCount: rows.filter((row) => row.customers && !row.customers.is_active).length,
    totalScans: totalScans ?? 0,
  };
}

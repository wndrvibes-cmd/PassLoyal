import type { SupabaseClient } from "@supabase/supabase-js";
import { logEvent } from "@/services/adminAuditLogs";
import type { Customer } from "@/types/database";

export interface CustomerWithMerchant extends Customer {
  merchant_business_name: string | null;
}

export async function listAllCustomers(supabase: SupabaseClient): Promise<CustomerWithMerchant[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*, merchants(business_name)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as Array<Customer & { merchants: { business_name: string } | null }>).map(
    (row) => ({ ...row, merchant_business_name: row.merchants?.business_name ?? null })
  );
}

export async function getCustomerWithMerchant(
  supabase: SupabaseClient,
  id: string
): Promise<CustomerWithMerchant | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*, merchants(business_name)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as Customer & { merchants: { business_name: string } | null };
  return { ...row, merchant_business_name: row.merchants?.business_name ?? null };
}

export async function adminDeleteCustomer(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) throw error;
  await logEvent(supabase, "customer.delete", "customer", id);
}

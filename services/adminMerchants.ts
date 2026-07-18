import type { SupabaseClient } from "@supabase/supabase-js";
import { logEvent } from "@/services/adminAuditLogs";
import type { Merchant, MerchantStatus } from "@/types/database";

export interface MerchantWithCounts extends Merchant {
  customers_count: number;
  programs_count: number;
}

export async function listMerchants(supabase: SupabaseClient): Promise<MerchantWithCounts[]> {
  const { data, error } = await supabase
    .from("merchants")
    .select("*, customers(count), loyalty_programs(count)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as Array<
    Merchant & { customers: { count: number }[]; loyalty_programs: { count: number }[] }
  >).map((row) => ({
    ...row,
    customers_count: row.customers?.[0]?.count ?? 0,
    programs_count: row.loyalty_programs?.[0]?.count ?? 0,
  }));
}

export async function getMerchant(supabase: SupabaseClient, id: string): Promise<Merchant | null> {
  const { data, error } = await supabase.from("merchants").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Merchant | null) ?? null;
}

export interface AdminMerchantFormValues {
  business_name: string;
  email: string;
  phone: string;
}

export async function updateMerchant(
  supabase: SupabaseClient,
  id: string,
  input: AdminMerchantFormValues
): Promise<Merchant> {
  const { data, error } = await supabase
    .from("merchants")
    .update({
      business_name: input.business_name.trim(),
      email: input.email.trim() || null,
      phone: input.phone.trim() || null,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  await logEvent(supabase, "merchant.update", "merchant", id, { business_name: input.business_name });
  return data as Merchant;
}

export async function setMerchantStatus(
  supabase: SupabaseClient,
  id: string,
  status: MerchantStatus
): Promise<Merchant> {
  const { data, error } = await supabase
    .from("merchants")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  await logEvent(supabase, status === "suspended" ? "merchant.suspend" : "merchant.reactivate", "merchant", id);
  return data as Merchant;
}

export interface MerchantOverviewStats {
  customersCount: number;
  programsCount: number;
  walletPassesCount: number;
}

export async function getMerchantOverviewStats(
  supabase: SupabaseClient,
  merchantId: string
): Promise<MerchantOverviewStats> {
  const [{ count: customersCount }, { count: programsCount }] = await Promise.all([
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("merchant_id", merchantId),
    supabase
      .from("loyalty_programs")
      .select("*", { count: "exact", head: true })
      .eq("merchant_id", merchantId),
  ]);

  const { count: walletPassesCount } = await supabase
    .from("wallet_passes")
    .select("*, customers!inner(merchant_id)", { count: "exact", head: true })
    .eq("customers.merchant_id", merchantId);

  return {
    customersCount: customersCount ?? 0,
    programsCount: programsCount ?? 0,
    walletPassesCount: walletPassesCount ?? 0,
  };
}

export interface CreateMerchantInput {
  business_name: string;
  email: string;
}

/** Privileged: creates the auth user (invite email) + merchant row via the
 * service-role API route. Never touches the service role from the browser. */
export async function createMerchant(input: CreateMerchantInput): Promise<Merchant> {
  const response = await fetch("/api/admin/merchants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? "Échec de la création du commerçant.");
  return body.merchant as Merchant;
}

/** Privileged: deletes the merchant row (cascades) and the auth user via the
 * service-role API route. */
export async function deleteMerchant(id: string): Promise<void> {
  const response = await fetch(`/api/admin/merchants/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Échec de la suppression du commerçant.");
  }
}

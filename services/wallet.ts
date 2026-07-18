import type { SupabaseClient } from "@supabase/supabase-js";
import type { WalletCardDesignFormValues } from "@/lib/validations/walletCardDesign";
import { getCustomer } from "@/services/customers";
import type {
  Customer,
  PublicWalletCard,
  WalletCardDesign,
  WalletPass,
  WalletScan,
  WalletScanAction,
} from "@/types/database";

function toCardDesignRow(input: WalletCardDesignFormValues) {
  const social_links: Record<string, string> = {};
  if (input.facebook.trim()) social_links.facebook = input.facebook.trim();
  if (input.instagram.trim()) social_links.instagram = input.instagram.trim();
  if (input.twitter.trim()) social_links.twitter = input.twitter.trim();

  return {
    business_name: input.business_name.trim() || null,
    description: input.description.trim() || null,
    logo_url: input.logo_url.trim() || null,
    icon_url: input.icon_url.trim() || null,
    banner_url: input.banner_url.trim() || null,
    primary_color: input.primary_color,
    secondary_color: input.secondary_color,
    address: input.address.trim() || null,
    phone: input.phone.trim() || null,
    website: input.website.trim() || null,
    social_links,
  };
}

function generateToken(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

export async function getOrCreateCardDesign(
  supabase: SupabaseClient,
  merchantId: string
): Promise<WalletCardDesign> {
  const { data: existing, error: fetchError } = await supabase
    .from("wallet_card_designs")
    .select("*")
    .eq("merchant_id", merchantId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing as WalletCardDesign;

  const { data: created, error: insertError } = await supabase
    .from("wallet_card_designs")
    .insert({ merchant_id: merchantId })
    .select("*")
    .single();

  if (insertError) throw insertError;
  return created as WalletCardDesign;
}

export async function updateCardDesign(
  supabase: SupabaseClient,
  id: string,
  input: WalletCardDesignFormValues
): Promise<WalletCardDesign> {
  const { data, error } = await supabase
    .from("wallet_card_designs")
    .update(toCardDesignRow(input))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as WalletCardDesign;
}

export async function getOrCreateWalletPass(
  supabase: SupabaseClient,
  customerId: string,
  cardDesignId: string
): Promise<WalletPass> {
  const { data: existing, error: fetchError } = await supabase
    .from("wallet_passes")
    .select("*")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing as WalletPass;

  const { data: created, error: insertError } = await supabase
    .from("wallet_passes")
    .insert({ customer_id: customerId, card_design_id: cardDesignId, token: generateToken() })
    .select("*")
    .single();

  if (insertError) throw insertError;
  return created as WalletPass;
}

export async function regenerateWalletToken(
  supabase: SupabaseClient,
  walletPassId: string
): Promise<WalletPass> {
  const { data, error } = await supabase
    .from("wallet_passes")
    .update({ token: generateToken() })
    .eq("id", walletPassId)
    .select("*")
    .single();

  if (error) throw error;
  return data as WalletPass;
}

export async function listWalletPasses(
  supabase: SupabaseClient,
  merchantId: string
): Promise<WalletPass[]> {
  const { data, error } = await supabase
    .from("wallet_passes")
    .select("*, customers!inner(merchant_id)")
    .eq("customers.merchant_id", merchantId);

  if (error) throw error;
  return (data ?? []) as WalletPass[];
}

const SCAN_DUPLICATE_WINDOW_MS = 5000;

export async function recordScan(
  supabase: SupabaseClient,
  customerId: string,
  action: WalletScanAction
): Promise<{ scan: WalletScan; duplicate: boolean }> {
  const { data: recent, error: recentError } = await supabase
    .from("wallet_scans")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recentError) throw recentError;

  if (recent) {
    const lastScan = recent as WalletScan;
    const elapsed = Date.now() - new Date(lastScan.created_at).getTime();
    if (elapsed < SCAN_DUPLICATE_WINDOW_MS && lastScan.action === action) {
      return { scan: lastScan, duplicate: true };
    }
  }

  const { data, error } = await supabase
    .from("wallet_scans")
    .insert({ customer_id: customerId, action })
    .select("*")
    .single();

  if (error) throw error;
  return { scan: data as WalletScan, duplicate: false };
}

export async function listRecentScans(
  supabase: SupabaseClient,
  customerId: string
): Promise<WalletScan[]> {
  const { data, error } = await supabase
    .from("wallet_scans")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return (data ?? []) as WalletScan[];
}

export async function listMerchantScans(
  supabase: SupabaseClient,
  merchantId: string,
  limit = 500
): Promise<WalletScan[]> {
  const { data, error } = await supabase
    .from("wallet_scans")
    .select("*, customers!inner(merchant_id)")
    .eq("customers.merchant_id", merchantId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as WalletScan[];
}

export async function findCustomerByToken(
  supabase: SupabaseClient,
  token: string
): Promise<Customer | null> {
  const { data: pass, error: passError } = await supabase
    .from("wallet_passes")
    .select("customer_id")
    .eq("token", token)
    .maybeSingle();

  if (passError) throw passError;
  if (!pass) return null;

  return getCustomer(supabase, (pass as { customer_id: string }).customer_id);
}

/** Public, unauthenticated card lookup — used by /wallet/[token]. Goes through
 * a SECURITY DEFINER RPC that only ever returns the safe, curated columns. */
export async function getPublicWalletCard(
  supabase: SupabaseClient,
  token: string
): Promise<PublicWalletCard | null> {
  const { data, error } = await supabase.rpc("get_public_wallet_card", { p_token: token });
  if (error) throw error;
  const rows = (data ?? []) as PublicWalletCard[];
  return rows[0] ?? null;
}

export async function markWalletAdded(
  supabase: SupabaseClient,
  token: string,
  platform: "apple" | "google"
): Promise<void> {
  const { error } = await supabase.rpc("mark_wallet_pass_added", {
    p_token: token,
    p_platform: platform,
  });
  if (error) throw error;
}

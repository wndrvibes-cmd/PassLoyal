import type { SupabaseClient } from "@supabase/supabase-js";
import type { CustomerFormValues } from "@/lib/validations/customer";
import {
  GENDERS,
  LOYALTY_LEVELS,
  WALLET_PLATFORMS,
  type Customer,
  type CustomerVisit,
  type Gender,
  type LoyaltyLevel,
  type RewardHistoryEntry,
  type WalletPlatform,
} from "@/types/database";

function toRow(input: CustomerFormValues) {
  return {
    first_name: input.first_name.trim(),
    last_name: input.last_name.trim(),
    email: input.email.trim() || null,
    phone: input.phone.trim() || null,
    birthday: input.birthday.trim() || null,
    gender: input.gender || null,
    wallet_platform: input.wallet_platform || null,
    loyalty_level: input.loyalty_level,
    is_active: input.is_active,
  };
}

export async function listCustomers(
  supabase: SupabaseClient,
  merchantId: string
): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("merchant_id", merchantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Customer[];
}

export async function getCustomer(
  supabase: SupabaseClient,
  id: string
): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data as Customer | null) ?? null;
}

export async function createCustomer(
  supabase: SupabaseClient,
  merchantId: string,
  input: CustomerFormValues
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .insert({ ...toRow(input), merchant_id: merchantId })
    .select("*")
    .single();

  if (error) throw error;
  return data as Customer;
}

export async function updateCustomer(
  supabase: SupabaseClient,
  id: string,
  input: CustomerFormValues
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update(toRow(input))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Customer;
}

export async function deleteCustomer(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleCustomerActive(
  supabase: SupabaseClient,
  id: string,
  isActive: boolean
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update({ is_active: isActive })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Customer;
}

async function refetchCustomer(supabase: SupabaseClient, id: string): Promise<Customer> {
  const customer = await getCustomer(supabase, id);
  if (!customer) throw new Error("Client introuvable.");
  return customer;
}

export async function listCustomerVisits(
  supabase: SupabaseClient,
  customerId: string
): Promise<CustomerVisit[]> {
  const { data, error } = await supabase
    .from("customer_visits")
    .select("*")
    .eq("customer_id", customerId)
    .order("visit_date", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CustomerVisit[];
}

export async function listRewardsHistory(
  supabase: SupabaseClient,
  customerId: string
): Promise<RewardHistoryEntry[]> {
  const { data, error } = await supabase
    .from("rewards_history")
    .select("*")
    .eq("customer_id", customerId)
    .order("redeemed_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as RewardHistoryEntry[];
}

export async function addPoints(
  supabase: SupabaseClient,
  customerId: string,
  points: number,
  programId: string | null = null
): Promise<{ visit: CustomerVisit; customer: Customer }> {
  const { data, error } = await supabase
    .from("customer_visits")
    .insert({
      customer_id: customerId,
      program_id: programId,
      points_earned: points,
      amount_spent: 0,
      source: "manual",
    })
    .select("*")
    .single();

  if (error) throw error;
  const customer = await refetchCustomer(supabase, customerId);
  return { visit: data as CustomerVisit, customer };
}

export async function removePoints(
  supabase: SupabaseClient,
  customerId: string,
  points: number
): Promise<{ visit: CustomerVisit; customer: Customer }> {
  const { data, error } = await supabase
    .from("customer_visits")
    .insert({
      customer_id: customerId,
      program_id: null,
      points_earned: -Math.abs(points),
      amount_spent: 0,
      source: "manual",
    })
    .select("*")
    .single();

  if (error) throw error;
  const customer = await refetchCustomer(supabase, customerId);
  return { visit: data as CustomerVisit, customer };
}

export async function redeemReward(
  supabase: SupabaseClient,
  customerId: string,
  rewardName: string,
  pointsUsed: number
): Promise<{ reward: RewardHistoryEntry; customer: Customer }> {
  const { data, error } = await supabase
    .from("rewards_history")
    .insert({
      customer_id: customerId,
      reward_name: rewardName,
      points_used: pointsUsed,
    })
    .select("*")
    .single();

  if (error) throw error;
  const customer = await refetchCustomer(supabase, customerId);
  return { reward: data as RewardHistoryEntry, customer };
}

export async function cancelVisit(
  supabase: SupabaseClient,
  customerId: string,
  visitId: string
): Promise<Customer> {
  const { error } = await supabase.from("customer_visits").delete().eq("id", visitId);
  if (error) throw error;
  return refetchCustomer(supabase, customerId);
}

export async function cancelReward(
  supabase: SupabaseClient,
  customerId: string,
  rewardId: string
): Promise<Customer> {
  const { error } = await supabase.from("rewards_history").delete().eq("id", rewardId);
  if (error) throw error;
  return refetchCustomer(supabase, customerId);
}

export interface ImportRow {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  wallet_platform: string;
  loyalty_level: string;
}

export interface ImportRowError {
  row: number;
  reason: string;
}

export interface ImportResult {
  inserted: number;
  skippedDuplicates: number;
  errors: ImportRowError[];
}

function normalizeEnum<T extends string>(value: string, allowed: readonly T[]): T | null {
  const normalized = value.trim().toLowerCase();
  const match = allowed.find((option) => option === normalized);
  return match ?? null;
}

export async function bulkImportCustomers(
  supabase: SupabaseClient,
  merchantId: string,
  rows: ImportRow[]
): Promise<ImportResult> {
  const { data: existing, error: fetchError } = await supabase
    .from("customers")
    .select("email")
    .eq("merchant_id", merchantId);

  if (fetchError) throw fetchError;

  const existingEmails = new Set(
    ((existing ?? []) as { email: string | null }[])
      .map((row) => row.email?.trim().toLowerCase())
      .filter((email): email is string => Boolean(email))
  );

  const seenInFile = new Set<string>();
  const errors: ImportRowError[] = [];
  let skippedDuplicates = 0;

  const validRows: Array<ReturnType<typeof toRow> & { merchant_id: string }> = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2; // account for the header line
    const firstName = row.first_name?.trim() ?? "";
    const lastName = row.last_name?.trim() ?? "";
    const email = row.email?.trim() ?? "";

    if (!firstName || !lastName) {
      errors.push({ row: rowNumber, reason: "Prénom et nom sont requis." });
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ row: rowNumber, reason: "Email invalide." });
      return;
    }

    const emailKey = email.toLowerCase();
    if (emailKey && (existingEmails.has(emailKey) || seenInFile.has(emailKey))) {
      skippedDuplicates += 1;
      return;
    }
    if (emailKey) seenInFile.add(emailKey);

    validRows.push({
      first_name: firstName,
      last_name: lastName,
      email: email || null,
      phone: row.phone?.trim() || null,
      birthday: row.birthday?.trim() || null,
      gender: (normalizeEnum(row.gender ?? "", GENDERS) as Gender | null) ?? null,
      wallet_platform:
        (normalizeEnum(row.wallet_platform ?? "", WALLET_PLATFORMS) as WalletPlatform | null) ??
        null,
      loyalty_level: (normalizeEnum(row.loyalty_level ?? "", LOYALTY_LEVELS) as LoyaltyLevel | null) ?? "bronze",
      is_active: true,
      merchant_id: merchantId,
    });
  });

  if (validRows.length > 0) {
    const { error: insertError } = await supabase.from("customers").insert(validRows);
    if (insertError) throw insertError;
  }

  return { inserted: validRows.length, skippedDuplicates, errors };
}

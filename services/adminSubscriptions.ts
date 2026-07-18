import type { SupabaseClient } from "@supabase/supabase-js";
import { logEvent } from "@/services/adminAuditLogs";
import type {
  Subscription,
  SubscriptionPayment,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/types/database";

export interface SubscriptionWithMerchant extends Subscription {
  merchant_business_name: string;
  merchant_email: string | null;
}

export async function listSubscriptions(
  supabase: SupabaseClient
): Promise<SubscriptionWithMerchant[]> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*, merchants!inner(business_name, email)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    (data ?? []) as unknown as Array<
      Subscription & { merchants: { business_name: string; email: string | null } }
    >
  ).map((row) => ({
    ...row,
    merchant_business_name: row.merchants.business_name,
    merchant_email: row.merchants.email,
  }));
}

export async function getSubscriptionByMerchant(
  supabase: SupabaseClient,
  merchantId: string
): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("merchant_id", merchantId)
    .maybeSingle();

  if (error) throw error;
  return (data as Subscription | null) ?? null;
}

export interface UpdateSubscriptionInput {
  plan: SubscriptionPlan;
  price: number;
  status: SubscriptionStatus;
  current_period_end: string;
}

export async function updateSubscription(
  supabase: SupabaseClient,
  id: string,
  input: UpdateSubscriptionInput
): Promise<Subscription> {
  const { data, error } = await supabase
    .from("subscriptions")
    .update({
      plan: input.plan,
      price: input.price,
      status: input.status,
      current_period_end: input.current_period_end || null,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  await logEvent(supabase, "subscription.update", "subscription", id, { plan: input.plan, status: input.status });
  return data as Subscription;
}

export async function listPayments(
  supabase: SupabaseClient,
  subscriptionId: string
): Promise<SubscriptionPayment[]> {
  const { data, error } = await supabase
    .from("subscription_payments")
    .select("*")
    .eq("subscription_id", subscriptionId)
    .order("paid_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as SubscriptionPayment[];
}

export async function recordPayment(
  supabase: SupabaseClient,
  subscriptionId: string,
  amount: number
): Promise<SubscriptionPayment> {
  const { data, error } = await supabase
    .from("subscription_payments")
    .insert({ subscription_id: subscriptionId, amount, status: "paid" })
    .select("*")
    .single();

  if (error) throw error;
  await logEvent(supabase, "subscription.payment_recorded", "subscription", subscriptionId, { amount });
  return data as SubscriptionPayment;
}

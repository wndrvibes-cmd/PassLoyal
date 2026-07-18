"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getMerchant, getMerchantOverviewStats, type MerchantOverviewStats } from "@/services/adminMerchants";
import { getSubscriptionByMerchant } from "@/services/adminSubscriptions";
import { listCustomers } from "@/services/customers";
import { listPrograms } from "@/services/programs";
import type { Customer, LoyaltyProgram, Merchant, Subscription } from "@/types/database";

interface UseAdminMerchantResult {
  merchant: Merchant | null;
  stats: MerchantOverviewStats | null;
  programs: LoyaltyProgram[];
  customers: Customer[];
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setMerchant: React.Dispatch<React.SetStateAction<Merchant | null>>;
}

export function useAdminMerchant(merchantId: string): UseAdminMerchantResult {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [stats, setStats] = useState<MerchantOverviewStats | null>(null);
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const [currentMerchant, overviewStats, currentPrograms, currentCustomers, currentSubscription] =
        await Promise.all([
          getMerchant(supabase, merchantId),
          getMerchantOverviewStats(supabase, merchantId),
          listPrograms(supabase, merchantId),
          listCustomers(supabase, merchantId),
          getSubscriptionByMerchant(supabase, merchantId),
        ]);
      setMerchant(currentMerchant);
      setStats(overviewStats);
      setPrograms(currentPrograms);
      setCustomers(currentCustomers);
      setSubscription(currentSubscription);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger ce commerçant."
      );
    } finally {
      setIsLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { merchant, stats, programs, customers, subscription, isLoading, error, reload, setMerchant };
}

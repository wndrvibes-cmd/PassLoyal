"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getCustomerWithMerchant, type CustomerWithMerchant } from "@/services/adminCustomers";
import { listCustomerVisits, listRewardsHistory } from "@/services/customers";
import type { CustomerVisit, RewardHistoryEntry } from "@/types/database";

interface UseAdminCustomerResult {
  customer: CustomerWithMerchant | null;
  visits: CustomerVisit[];
  rewards: RewardHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerWithMerchant | null>>;
}

export function useAdminCustomer(customerId: string): UseAdminCustomerResult {
  const [customer, setCustomer] = useState<CustomerWithMerchant | null>(null);
  const [visits, setVisits] = useState<CustomerVisit[]>([]);
  const [rewards, setRewards] = useState<RewardHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const [currentCustomer, currentVisits, currentRewards] = await Promise.all([
        getCustomerWithMerchant(supabase, customerId),
        listCustomerVisits(supabase, customerId),
        listRewardsHistory(supabase, customerId),
      ]);
      setCustomer(currentCustomer);
      setVisits(currentVisits);
      setRewards(currentRewards);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger ce client."
      );
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { customer, visits, rewards, isLoading, error, reload, setCustomer };
}

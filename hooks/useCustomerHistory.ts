"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getCustomer, listCustomerVisits, listRewardsHistory } from "@/services/customers";
import type { Customer, CustomerVisit, RewardHistoryEntry } from "@/types/database";

interface UseCustomerHistoryResult {
  customer: Customer | null;
  visits: CustomerVisit[];
  rewards: RewardHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useCustomerHistory(customerId: string): UseCustomerHistoryResult {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [visits, setVisits] = useState<CustomerVisit[]>([]);
  const [rewards, setRewards] = useState<RewardHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();

    try {
      const [currentCustomer, currentVisits, currentRewards] = await Promise.all([
        getCustomer(supabase, customerId),
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

  return { customer, visits, rewards, isLoading, error, reload };
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getOrCreateCurrentMerchant, listPrograms } from "@/services/programs";
import { listCustomers } from "@/services/customers";
import type { Customer, LoyaltyProgram, Merchant } from "@/types/database";

interface UseCustomersResult {
  merchant: Merchant | null;
  customers: Customer[];
  programs: LoyaltyProgram[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

export function useCustomers(): UseCustomersResult {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const currentMerchant = await getOrCreateCurrentMerchant(supabase);
      const [currentCustomers, currentPrograms] = await Promise.all([
        listCustomers(supabase, currentMerchant.id),
        listPrograms(supabase, currentMerchant.id),
      ]);
      setMerchant(currentMerchant);
      setCustomers(currentCustomers);
      setPrograms(currentPrograms);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger vos clients."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { merchant, customers, programs, isLoading, error, reload, setCustomers };
}

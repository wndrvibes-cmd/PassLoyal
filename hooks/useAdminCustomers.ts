"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { listAllCustomers, type CustomerWithMerchant } from "@/services/adminCustomers";

interface UseAdminCustomersResult {
  customers: CustomerWithMerchant[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerWithMerchant[]>>;
}

export function useAdminCustomers(): UseAdminCustomersResult {
  const [customers, setCustomers] = useState<CustomerWithMerchant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      setCustomers(await listAllCustomers(supabase));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les clients."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { customers, isLoading, error, reload, setCustomers };
}

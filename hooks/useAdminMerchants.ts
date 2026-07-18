"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { listMerchants, type MerchantWithCounts } from "@/services/adminMerchants";

interface UseAdminMerchantsResult {
  merchants: MerchantWithCounts[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setMerchants: React.Dispatch<React.SetStateAction<MerchantWithCounts[]>>;
}

export function useAdminMerchants(): UseAdminMerchantsResult {
  const [merchants, setMerchants] = useState<MerchantWithCounts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      setMerchants(await listMerchants(supabase));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les commerçants."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { merchants, isLoading, error, reload, setMerchants };
}

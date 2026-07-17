"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getOrCreateCurrentMerchant, listPrograms } from "@/services/programs";
import type { LoyaltyProgram, Merchant } from "@/types/database";

interface UseProgramsResult {
  merchant: Merchant | null;
  programs: LoyaltyProgram[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setPrograms: React.Dispatch<React.SetStateAction<LoyaltyProgram[]>>;
}

export function usePrograms(): UseProgramsResult {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const currentMerchant = await getOrCreateCurrentMerchant(supabase);
      const currentPrograms = await listPrograms(supabase, currentMerchant.id);
      setMerchant(currentMerchant);
      setPrograms(currentPrograms);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger vos programmes."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { merchant, programs, isLoading, error, reload, setPrograms };
}

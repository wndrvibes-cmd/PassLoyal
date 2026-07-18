"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getOrCreatePlatformSettings } from "@/services/adminSettings";
import type { PlatformSettings } from "@/types/database";

interface UseAdminSettingsResult {
  settings: PlatformSettings | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setSettings: React.Dispatch<React.SetStateAction<PlatformSettings | null>>;
}

export function useAdminSettings(): UseAdminSettingsResult {
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      setSettings(await getOrCreatePlatformSettings(supabase));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les paramètres."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { settings, isLoading, error, reload, setSettings };
}

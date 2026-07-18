"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Skeleton from "@/components/ui/Skeleton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { updatePlatformSettings, type PlatformSettingsFormValues } from "@/services/adminSettings";

export default function AdminSettingsPage() {
  const { settings, isLoading, error, setSettings } = useAdminSettings();
  const [draft, setDraft] = useState<PlatformSettingsFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (settings) {
      setDraft({
        platform_name: settings.platform_name,
        logo_url: settings.logo_url ?? "",
        support_email: settings.support_email ?? "",
        maintenance_mode: settings.maintenance_mode,
        wallet_default_primary_color: settings.wallet_default_primary_color,
        wallet_default_secondary_color: settings.wallet_default_secondary_color,
      });
    }
  }, [settings]);

  if (isLoading || !draft) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !settings) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Impossible de charger les paramètres."}
        </p>
      </div>
    );
  }

  const patchDraft = (patch: Partial<PlatformSettingsFormValues>) => {
    setDraft((previous) => (previous ? { ...previous, ...patch } : previous));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const updated = await updatePlatformSettings(supabase, settings.id, draft);
      setSettings(updated);
      toast.success("Paramètres enregistrés.");
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Paramètres de la plateforme</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Ces réglages s&apos;appliquent à l&apos;ensemble de PassLoyal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.02]">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Général</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="platform_name" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Nom de la plateforme
              </label>
              <input
                id="platform_name"
                value={draft.platform_name}
                onChange={(event) => patchDraft({ platform_name: event.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
            <div>
              <label htmlFor="logo_url" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Logo (URL)
              </label>
              <input
                id="logo_url"
                value={draft.logo_url}
                onChange={(event) => patchDraft({ logo_url: event.target.value })}
                placeholder="https://…"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
            <div>
              <label htmlFor="support_email" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Email de support
              </label>
              <input
                id="support_email"
                type="email"
                value={draft.support_email}
                onChange={(event) => patchDraft({ support_email: event.target.value })}
                placeholder="support@passloyal.fr"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.02]">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Wallet — couleurs par défaut</h3>
          <p className="mt-1 text-[12.5px] text-slate-400">
            Utilisées comme point de départ pour les nouvelles cartes de fidélité.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="wallet_primary" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Couleur principale
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                <input
                  type="color"
                  value={draft.wallet_default_primary_color}
                  onChange={(event) => patchDraft({ wallet_default_primary_color: event.target.value })}
                  className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                />
                <input
                  id="wallet_primary"
                  value={draft.wallet_default_primary_color}
                  onChange={(event) => patchDraft({ wallet_default_primary_color: event.target.value })}
                  className="w-full bg-transparent text-[13.5px] text-slate-700 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="wallet_secondary" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Couleur secondaire
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                <input
                  type="color"
                  value={draft.wallet_default_secondary_color}
                  onChange={(event) => patchDraft({ wallet_default_secondary_color: event.target.value })}
                  className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                />
                <input
                  id="wallet_secondary"
                  value={draft.wallet_default_secondary_color}
                  onChange={(event) => patchDraft({ wallet_default_secondary_color: event.target.value })}
                  className="w-full bg-transparent text-[13.5px] text-slate-700 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.02]">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Maintenance</h3>
          <label className="mt-4 flex items-center justify-between gap-4">
            <span>
              <span className="block text-[13.5px] font-medium text-slate-800">Mode maintenance</span>
              <span className="block text-[12px] text-slate-400">
                Affiche un bandeau de maintenance aux commerçants (le Super Admin garde l&apos;accès).
              </span>
            </span>
            <input
              type="checkbox"
              checked={draft.maintenance_mode}
              onChange={(event) => patchDraft({ maintenance_mode: event.target.checked })}
              className="h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full bg-slate-200 transition-colors checked:bg-slate-900 relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Paramètres Stripe</h3>
          <p className="mt-1.5 text-[13px] text-slate-500">
            Les clés Stripe restent dans les variables d&apos;environnement du serveur, jamais dans cette interface.
            Le schéma (identifiants client/abonnement Stripe) est déjà prêt sur chaque abonnement — l&apos;intégration
            live (checkout, webhooks) est une étape suivante une fois les clés fournies.
          </p>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Enregistrer
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calendar,
  CreditCard,
  Gift,
  Loader2,
  Mail,
  Minus,
  Pencil,
  Phone,
  Plus,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useCustomerHistory } from "@/hooks/useCustomerHistory";
import { useWalletPass } from "@/hooks/useWalletPass";
import { getOrCreateCurrentMerchant, listPrograms } from "@/services/programs";
import { addPoints, cancelReward, cancelVisit, redeemReward, removePoints } from "@/services/customers";
import { regenerateWalletToken } from "@/services/wallet";
import type { CustomerVisit, LoyaltyLevel, LoyaltyProgram, Merchant, RewardHistoryEntry } from "@/types/database";
import CustomerForm from "./CustomerForm";
import CustomerHistory from "./CustomerHistory";
import Skeleton from "@/components/ui/Skeleton";
import QRCodeCard from "@/components/wallet/QRCodeCard";

interface CustomerDetailsProps {
  customerId: string;
}

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

const GENDER_LABELS: Record<string, string> = { male: "Homme", female: "Femme", other: "Autre" };

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const { customer, visits, rewards, scans, isLoading, error, reload } =
    useCustomerHistory(customerId);
  const { pass, isLoading: isWalletLoading, setPass } = useWalletPass(customerId);

  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [removeAmount, setRemoveAmount] = useState("");
  const [rewardName, setRewardName] = useState("");
  const [rewardCost, setRewardCost] = useState("");

  const handleRegenerateToken = async () => {
    if (!pass) return;
    setIsRegenerating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const updated = await regenerateWalletToken(supabase, pass.id);
      setPass(updated);
      toast.success("QR Code régénéré. L'ancien code n'est plus valide.");
    } catch (caughtError) {
      toast.error(
        caughtError instanceof Error ? caughtError.message : "Échec de la régénération."
      );
    } finally {
      setIsRegenerating(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadMerchantContext() {
      try {
        const supabase = createSupabaseBrowserClient();
        const currentMerchant = await getOrCreateCurrentMerchant(supabase);
        const currentPrograms = await listPrograms(supabase, currentMerchant.id);
        if (isMounted) {
          setMerchant(currentMerchant);
          setPrograms(currentPrograms);
        }
      } catch {
        // Non-blocking: the page still works without program name lookups.
      }
    }

    loadMerchantContext();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddPoints = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(addAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Indiquez un nombre de points positif.");
      return;
    }
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await addPoints(supabase, customerId, amount);
      toast.success(`+${amount} points ajoutés.`);
      setAddAmount("");
      await reload();
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Échec de l'opération.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleRemovePoints = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(removeAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Indiquez un nombre de points positif.");
      return;
    }
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await removePoints(supabase, customerId, amount);
      toast.success(`-${amount} points retirés.`);
      setRemoveAmount("");
      await reload();
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Échec de l'opération.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleRedeemReward = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cost = Number(rewardCost);
    if (!rewardName.trim() || !Number.isFinite(cost) || cost <= 0) {
      toast.error("Indiquez un nom de récompense et un coût en points positif.");
      return;
    }
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await redeemReward(supabase, customerId, rewardName.trim(), cost);
      toast.success("Récompense ajoutée.");
      setRewardName("");
      setRewardCost("");
      await reload();
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Échec de l'opération.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleCancelVisit = async (visit: CustomerVisit) => {
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await cancelVisit(supabase, customerId, visit.id);
      toast.success("Opération annulée.");
      await reload();
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Échec de l'annulation.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleCancelReward = async (reward: RewardHistoryEntry) => {
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await cancelReward(supabase, customerId, reward.id);
      toast.success("Récompense annulée.");
      await reload();
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Échec de l'annulation.");
    } finally {
      setIsMutating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Client introuvable."}
        </p>
      </div>
    );
  }

  const lastProgramVisit = visits.find((visit) => visit.program_id);
  const associatedProgram = lastProgramVisit
    ? programs.find((program) => program.id === lastProgramVisit.program_id)
    : null;

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux clients
        </Link>
        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
        >
          <Pencil className="h-3.5 w-3.5" /> Modifier
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start gap-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-[20px] font-semibold text-white">
            {customer.first_name.charAt(0)}
            {customer.last_name.charAt(0)}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                {customer.first_name} {customer.last_name}
              </h1>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
                {LOYALTY_LEVEL_LABELS[customer.loyalty_level]}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                  customer.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                )}
              >
                {customer.is_active ? "Actif" : "Inactif"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 text-[13px] text-slate-500 sm:grid-cols-2">
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {customer.email ?? "Non renseigné"}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> {customer.phone ?? "Non renseigné"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" /> Anniversaire : {formatDate(customer.birthday)}
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="h-3.5 w-3.5" />
                {customer.wallet_platform
                  ? customer.wallet_platform === "apple"
                    ? "Apple Wallet"
                    : "Google Wallet"
                  : "Aucun wallet"}
              </span>
              {customer.gender && (
                <span className="flex items-center gap-2">
                  {GENDER_LABELS[customer.gender] ?? customer.gender}
                </span>
              )}
              <span className="flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5" />
                Programme : {associatedProgram?.name ?? "Aucun"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <Metric icon={Award} label="Points" value={String(customer.total_points)} />
          <Metric icon={TrendingUp} label="Visites" value={String(customer.total_visits)} />
          <Metric icon={CreditCard} label="Dépensé" value={`${customer.total_spent} €`} />
          <Metric icon={Gift} label="Récompenses" value={String(rewards.length)} />
        </div>
        <p className="mt-4 text-[12px] text-slate-400">
          Dernière visite : {formatDate(customer.last_visit)} · Inscrit le {formatDate(customer.created_at)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-[14px] font-semibold tracking-tight text-slate-900">Gérer les points</h2>

            <form onSubmit={handleAddPoints} className="mt-4 flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={addAmount}
                onChange={(event) => setAddAmount(event.target.value)}
                placeholder="Points à ajouter"
                aria-label="Points à ajouter"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13.5px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="submit"
                disabled={isMutating}
                aria-label="Ajouter des points"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-600 p-2.5 text-white hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
              </button>
            </form>

            <form onSubmit={handleRemovePoints} className="mt-2.5 flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={removeAmount}
                onChange={(event) => setRemoveAmount(event.target.value)}
                placeholder="Points à retirer"
                aria-label="Points à retirer"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13.5px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="submit"
                disabled={isMutating}
                aria-label="Retirer des points"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-red-600 p-2.5 text-white hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
              >
                <Minus className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-[13px] font-medium text-slate-700">Ajouter une récompense</p>
              <form onSubmit={handleRedeemReward} className="mt-2.5 space-y-2">
                <input
                  type="text"
                  value={rewardName}
                  onChange={(event) => setRewardName(event.target.value)}
                  placeholder="Nom de la récompense"
                  aria-label="Nom de la récompense"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13.5px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={rewardCost}
                    onChange={(event) => setRewardCost(event.target.value)}
                    placeholder="Coût en points"
                    aria-label="Coût en points"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13.5px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  />
                  <button
                    type="submit"
                    disabled={isMutating}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-fuchsia-600 px-3 py-2 text-[12.5px] font-medium text-white hover:bg-fuchsia-700 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {isMutating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Gift className="h-3.5 w-3.5" />}
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>

          {pass && !isWalletLoading && (
            <>
              <QRCodeCard
                url={`${typeof window !== "undefined" ? window.location.origin : ""}/wallet/${pass.token}`}
                fileName={`carte-${customer.first_name}-${customer.last_name}`}
                onRegenerate={handleRegenerateToken}
                isRegenerating={isRegenerating}
              />

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">
                  Statut Wallet
                </h3>
                <div className="mt-3 space-y-2 text-[12.5px] text-slate-600">
                  <p className="flex items-center justify-between">
                    <span>Apple Wallet</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        pass.apple_added_at
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {pass.apple_added_at ? "Ajoutée" : "Non ajoutée"}
                    </span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Google Wallet</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        pass.google_added_at
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {pass.google_added_at ? "Ajoutée" : "Non ajoutée"}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/wallet/${pass.token}`}
                  target="_blank"
                  className="mt-4 block rounded-xl border border-slate-200 px-3 py-2 text-center text-[12.5px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Voir la carte du client
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <h2 className="text-[14px] font-semibold tracking-tight text-slate-900">
            Historique complet
          </h2>
          <div className="mt-3">
            <CustomerHistory
              visits={visits}
              rewards={rewards}
              programs={programs}
              scans={scans}
              onCancelVisit={handleCancelVisit}
              onCancelReward={handleCancelReward}
              isMutating={isMutating}
            />
          </div>
        </div>
      </div>

      {isEditOpen && merchant && (
        <CustomerForm
          merchantId={merchant.id}
          customer={customer}
          onClose={() => setIsEditOpen(false)}
          onSaved={async () => {
            setIsEditOpen(false);
            await reload();
          }}
        />
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Award;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      <p className="mt-1 text-[16px] font-semibold tabular-nums tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import EditSubscriptionDialog from "@/components/admin/EditSubscriptionDialog";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useAdminSubscriptions } from "@/hooks/useAdminSubscriptions";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types/database";
import type { SubscriptionWithMerchant } from "@/services/adminSubscriptions";

const PLAN_LABELS: Record<SubscriptionPlan, string> = { starter: "Starter", pro: "Pro", premium: "Premium" };
const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  trialing: "Essai",
  active: "Actif",
  past_due: "Impayé",
  canceled: "Résilié",
};
const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  trialing: "bg-blue-50 text-blue-700",
  active: "bg-emerald-50 text-emerald-700",
  past_due: "bg-amber-50 text-amber-700",
  canceled: "bg-slate-100 text-slate-500",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminSubscriptionsPage() {
  const { subscriptions, isLoading, error, setSubscriptions } = useAdminSubscriptions();
  const [editTarget, setEditTarget] = useState<SubscriptionWithMerchant | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Abonnements</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          {subscriptions.length} abonnement{subscriptions.length > 1 ? "s" : ""}. Les champs Stripe sont prêts pour une future intégration.
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-16 text-center text-[13.5px] text-slate-500">
          Aucun abonnement pour l&apos;instant.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[11.5px] font-medium uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Commerçant</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Prix</th>
                  <th className="px-5 py-3">Statut</th>
                  <th className="px-5 py-3">Renouvellement</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="text-[13.5px] text-slate-700 hover:bg-slate-50/60">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-900">{subscription.merchant_business_name}</p>
                      <p className="mt-0.5 text-[12px] text-slate-400">{subscription.merchant_email ?? "—"}</p>
                    </td>
                    <td className="px-5 py-3.5">{PLAN_LABELS[subscription.plan]}</td>
                    <td className="px-5 py-3.5">{subscription.price} €/mois</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-medium", STATUS_STYLES[subscription.status])}>
                        {STATUS_LABELS[subscription.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(subscription.current_period_end)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setEditTarget(subscription)}
                        aria-label="Modifier"
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editTarget && (
        <EditSubscriptionDialog
          subscription={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={(updated) => {
            setSubscriptions((previous) =>
              previous.map((subscription) => (subscription.id === updated.id ? updated : subscription))
            );
            setEditTarget(null);
          }}
        />
      )}
    </motion.div>
  );
}

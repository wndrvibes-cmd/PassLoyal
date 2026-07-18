"use client";

import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";
import EmptyState from "@/components/programs/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminLogs } from "@/hooks/useAdminLogs";

const ACTION_LABELS: Record<string, string> = {
  login: "Connexion",
  "merchant.create": "Commerçant créé",
  "merchant.update": "Commerçant modifié",
  "merchant.suspend": "Commerçant suspendu",
  "merchant.reactivate": "Commerçant réactivé",
  "merchant.delete": "Commerçant supprimé",
  "customer.delete": "Client supprimé",
  "subscription.update": "Abonnement modifié",
  "subscription.payment_recorded": "Paiement enregistré",
  "settings.update": "Paramètres modifiés",
};

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLogsPage() {
  const { logs, isLoading, error, reload } = useAdminLogs();

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Logs</h1>
          <p className="mt-1 text-[13.5px] text-slate-500">Connexions, créations, modifications et suppressions sur la plateforme.</p>
        </div>
        <select
          onChange={(event) => reload(event.target.value || undefined)}
          defaultValue=""
          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">Toutes les actions</option>
          {Object.entries(ACTION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {logs.length === 0 ? (
        <EmptyState icon={ScrollText} title="Aucun log pour l'instant" description="L'activité de la plateforme apparaîtra ici." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[11.5px] font-medium uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Action</th>
                  <th className="px-5 py-3">Auteur</th>
                  <th className="px-5 py-3">Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="text-[13.5px] text-slate-700 hover:bg-slate-50/60">
                    <td className="px-5 py-3.5 text-slate-500">{formatDateTime(log.created_at)}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {ACTION_LABELS[log.action] ?? log.action}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{log.actor_email ?? "—"}</td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {Object.keys(log.metadata ?? {}).length > 0 ? JSON.stringify(log.metadata) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}

"use client";

import { Activity } from "lucide-react";
import type { AuditLog } from "@/types/database";

interface RecentActivityProps {
  logs: AuditLog[];
}

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

function formatRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 1) return "à l'instant";
  if (diffMinutes < 60) return `il y a ${diffMinutes} min`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `il y a ${diffHours} h`;
  const diffDays = Math.round(diffHours / 24);
  return `il y a ${diffDays} j`;
}

export default function RecentActivity({ logs }: RecentActivityProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
      <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Activité récente</h3>

      {logs.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center text-[13px] text-slate-500">
          Aucune activité pour l&apos;instant.
        </p>
      ) : (
        <ol className="mt-3 space-y-1">
          {logs.map((log) => (
            <li key={log.id} className="flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-slate-50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Activity className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-slate-700">
                  <span className="font-medium text-slate-900">
                    {ACTION_LABELS[log.action] ?? log.action}
                  </span>
                  {log.actor_email && <span className="text-slate-400"> · {log.actor_email}</span>}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {formatRelativeTime(log.created_at)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

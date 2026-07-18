"use client";

import { Gift, Minus, Plus, ScanLine, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CustomerVisit, LoyaltyProgram, RewardHistoryEntry, WalletScan } from "@/types/database";

interface CustomerHistoryProps {
  visits: CustomerVisit[];
  rewards: RewardHistoryEntry[];
  programs: LoyaltyProgram[];
  scans?: WalletScan[];
  onCancelVisit: (visit: CustomerVisit) => void;
  onCancelReward: (reward: RewardHistoryEntry) => void;
  isMutating: boolean;
}

const SCAN_ACTION_LABELS: Record<WalletScan["action"], string> = {
  view: "Carte scannée",
  add_points: "Points ajoutés via scan",
  remove_points: "Points retirés via scan",
  redeem_reward: "Récompense validée via scan",
};

type TimelineEntry =
  | { kind: "visit"; date: string; data: CustomerVisit }
  | { kind: "reward"; date: string; data: RewardHistoryEntry }
  | { kind: "scan"; date: string; data: WalletScan };

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CustomerHistory({
  visits,
  rewards,
  programs,
  scans = [],
  onCancelVisit,
  onCancelReward,
  isMutating,
}: CustomerHistoryProps) {
  const programNameById = new Map(programs.map((program) => [program.id, program.name]));

  const timeline: TimelineEntry[] = [
    ...visits.map((visit): TimelineEntry => ({ kind: "visit", date: visit.visit_date, data: visit })),
    ...rewards.map(
      (reward): TimelineEntry => ({ kind: "reward", date: reward.redeemed_at, data: reward })
    ),
    ...scans.map((scan): TimelineEntry => ({ kind: "scan", date: scan.created_at, data: scan })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  if (timeline.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center text-[13px] text-slate-500">
        Aucune activité pour ce client pour l&apos;instant.
      </p>
    );
  }

  return (
    <ol className="space-y-1">
      {timeline.map((entry) => {
        if (entry.kind === "visit") {
          const visit = entry.data;
          const isManual = visit.source === "manual";
          const isPositive = visit.points_earned >= 0;
          const Icon = isManual ? (isPositive ? Plus : Minus) : ShoppingBag;
          const programName = visit.program_id ? programNameById.get(visit.program_id) : null;

          return (
            <li
              key={`visit-${visit.id}`}
              className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] text-slate-700">
                  {isManual ? (
                    <span className="font-medium text-slate-900">
                      {isPositive ? "Ajout" : "Retrait"} manuel de points
                    </span>
                  ) : (
                    <span className="font-medium text-slate-900">Visite</span>
                  )}{" "}
                  · {isPositive ? "+" : ""}
                  {visit.points_earned} pts
                  {visit.amount_spent > 0 && ` · ${visit.amount_spent} €`}
                  {programName && ` · ${programName}`}
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">{formatDateTime(visit.visit_date)}</p>
              </div>
              <button
                type="button"
                onClick={() => onCancelVisit(visit)}
                disabled={isMutating}
                aria-label="Annuler cette opération"
                className="shrink-0 rounded-full p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          );
        }

        if (entry.kind === "reward") {
          const reward = entry.data;
          return (
            <li
              key={`reward-${reward.id}`}
              className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-600">
                <Gift className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] text-slate-700">
                  <span className="font-medium text-slate-900">
                    Récompense « {reward.reward_name} »
                  </span>{" "}
                  · -{reward.points_used} pts
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">
                  {formatDateTime(reward.redeemed_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onCancelReward(reward)}
                disabled={isMutating}
                aria-label="Annuler cette récompense"
                className="shrink-0 rounded-full p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          );
        }

        const scan = entry.data;
        return (
          <li
            key={`scan-${scan.id}`}
            className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <ScanLine className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] text-slate-700">
                <span className="font-medium text-slate-900">{SCAN_ACTION_LABELS[scan.action]}</span>
              </p>
              <p className="mt-0.5 text-[12px] text-slate-400">{formatDateTime(scan.created_at)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

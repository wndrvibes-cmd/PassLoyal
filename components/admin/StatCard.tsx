"use client";

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string;
  hint?: string;
}

export default function StatCard({ label, value, icon: Icon, accent, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${accent}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <p className="mt-4 text-[13px] font-medium text-slate-500">{label}</p>
      <p className="mt-1 truncate text-[19px] font-semibold tracking-tight text-slate-900">{value}</p>
      {hint && <p className="mt-0.5 text-[11.5px] text-slate-400">{hint}</p>}
    </div>
  );
}

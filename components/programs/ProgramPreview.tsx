"use client";

import { motion } from "framer-motion";
import { QrCode, Smartphone } from "lucide-react";
import type { ProgramFormValues } from "@/lib/validations/program";

interface ProgramPreviewProps {
  program: ProgramFormValues;
}

function rewardSummary(program: ProgramFormValues) {
  if (program.reward_type === "stamps") {
    return `${program.reward_points} tampons offrent une récompense`;
  }
  if (program.reward_type === "custom") {
    return "Récompense personnalisée";
  }
  return `${program.reward_points} points offrent une récompense`;
}

export default function ProgramPreview({ program }: ProgramPreviewProps) {
  const displayName = program.name.trim() || "Nom de votre commerce";

  return (
    <div className="space-y-4 lg:sticky lg:top-0">
      <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-slate-400">
        Aperçu en temps réel
      </p>

      <motion.div
        layout
        className="relative h-40 w-full overflow-hidden rounded-2xl p-5 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.45)]"
        style={{
          background: `linear-gradient(135deg, ${program.primary_color}, ${program.secondary_color})`,
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium tracking-wide text-white/80">APPLE WALLET</p>
          <Smartphone className="h-4 w-4 text-white/70" />
        </div>
        <p className="mt-6 truncate text-[16px] font-semibold text-white">{displayName}</p>
        <p className="mt-1 text-[12px] text-white/75">{rewardSummary(program)}</p>
        {!program.wallet_enabled && (
          <span className="absolute right-4 top-4 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white">
            Désactivé
          </span>
        )}
      </motion.div>

      <motion.div
        layout
        className="relative h-32 w-full overflow-hidden rounded-2xl p-5 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.4)]"
        style={{
          background: `linear-gradient(135deg, ${program.secondary_color}, ${program.primary_color})`,
        }}
      >
        <p className="text-[10px] font-medium tracking-wide text-white/80">GOOGLE WALLET</p>
        <p className="mt-4 truncate text-[14px] font-semibold text-white">{displayName}</p>
        <p className="mt-1 text-[11.5px] text-white/70">
          {program.points_per_visit} pts / visite · {program.points_per_euro} pts / €
        </p>
      </motion.div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              program.qr_code_enabled
                ? "bg-indigo-50 text-indigo-600"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <QrCode className="h-4 w-4" />
          </span>
          <p className="text-[13px] font-medium text-slate-700">QR Code</p>
        </div>
        <span
          className={`text-[12px] font-medium ${
            program.qr_code_enabled ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          {program.qr_code_enabled ? "Activé" : "Désactivé"}
        </span>
      </div>
    </div>
  );
}

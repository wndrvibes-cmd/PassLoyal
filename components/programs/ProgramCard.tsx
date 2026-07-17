"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, MoreVertical, Pencil, Power, QrCode, Trash2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoyaltyProgram, RewardType } from "@/types/database";

interface ProgramCardProps {
  program: LoyaltyProgram;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleActive: () => void;
}

const REWARD_TYPE_LABELS: Record<RewardType, string> = {
  points: "Carte à points",
  stamps: "Carte à tampons",
  custom: "Récompense personnalisée",
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

export default function ProgramCard({
  program,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
}: ProgramCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-semibold text-white shadow-md"
          style={{
            background: `linear-gradient(135deg, ${program.primary_color}, ${program.secondary_color})`,
          }}
        >
          {program.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label="Actions du programme"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg shadow-slate-900/10"
            >
              <MenuItem
                icon={Pencil}
                label="Modifier"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit();
                }}
              />
              <MenuItem
                icon={Copy}
                label="Dupliquer"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDuplicate();
                }}
              />
              <MenuItem
                icon={Power}
                label={program.is_active ? "Désactiver" : "Activer"}
                onClick={() => {
                  setIsMenuOpen(false);
                  onToggleActive();
                }}
              />
              <MenuItem
                icon={Trash2}
                label="Supprimer"
                tone="danger"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete();
                }}
              />
            </div>
          )}
        </div>
      </div>

      <h3 className="mt-4 truncate text-[15px] font-semibold tracking-tight text-slate-900">
        {program.name}
      </h3>
      <p className="mt-0.5 text-[12.5px] text-slate-500">
        {REWARD_TYPE_LABELS[program.reward_type]}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            program.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          )}
        >
          {program.is_active ? "Actif" : "Inactif"}
        </span>
        {program.wallet_enabled && (
          <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600">
            <Wallet className="h-3 w-3" /> Wallet
          </span>
        )}
        {program.qr_code_enabled && (
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">
            <QrCode className="h-3 w-3" /> QR
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[12px] text-slate-400">
        <span>
          {program.reward_type === "stamps"
            ? `${program.reward_points} tampons`
            : `${program.reward_points} pts`}{" "}
          → récompense
        </span>
        <span>{formatRelativeTime(program.updated_at)}</span>
      </div>
    </motion.div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: typeof Pencil;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13.5px]",
        tone === "danger" ? "text-red-600 hover:bg-red-50" : "text-slate-600 hover:bg-slate-50"
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

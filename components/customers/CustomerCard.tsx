"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, MoreVertical, Pencil, Power, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Customer, LoyaltyLevel } from "@/types/database";

interface CustomerCardProps {
  customer: Customer;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

const LOYALTY_LEVEL_STYLES: Record<LoyaltyLevel, string> = {
  bronze: "bg-orange-50 text-orange-700",
  silver: "bg-slate-100 text-slate-600",
  gold: "bg-amber-50 text-amber-700",
  platinum: "bg-indigo-50 text-indigo-700",
};

function formatRelativeTime(dateString: string | null) {
  if (!dateString) return "Jamais";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 1) return "à l'instant";
  if (diffMinutes < 60) return `il y a ${diffMinutes} min`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `il y a ${diffHours} h`;
  const diffDays = Math.round(diffHours / 24);
  return `il y a ${diffDays} j`;
}

export default function CustomerCard({
  customer,
  onEdit,
  onDelete,
  onToggleActive,
}: CustomerCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fullName = `${customer.first_name} ${customer.last_name}`;

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
        <Link href={`/dashboard/customers/${customer.id}`} className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-[13px] font-semibold text-white">
            {customer.first_name.charAt(0)}
            {customer.last_name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14.5px] font-semibold tracking-tight text-slate-900">
              {fullName}
            </p>
            <p className="truncate text-[12px] text-slate-500">{customer.email ?? "Sans email"}</p>
          </div>
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label="Actions du client"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg shadow-slate-900/10"
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
                icon={Power}
                label={customer.is_active ? "Désactiver" : "Activer"}
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

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            LOYALTY_LEVEL_STYLES[customer.loyalty_level]
          )}
        >
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

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[12px]">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Award className="h-3.5 w-3.5 text-indigo-500" />
          {customer.total_points} pts
        </div>
        <div className="text-right text-slate-400">
          Dernière visite : {formatRelativeTime(customer.last_visit)}
        </div>
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

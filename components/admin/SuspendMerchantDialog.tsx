"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Power } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { setMerchantStatus } from "@/services/adminMerchants";
import type { Merchant } from "@/types/database";

interface SuspendMerchantDialogProps {
  merchant: Merchant;
  onClose: () => void;
  onUpdated: (merchant: Merchant) => void;
}

export default function SuspendMerchantDialog({
  merchant,
  onClose,
  onUpdated,
}: SuspendMerchantDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const willSuspend = merchant.status === "active";

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const updated = await setMerchantStatus(supabase, merchant.id, willSuspend ? "suspended" : "active");
      toast.success(willSuspend ? "Commerçant suspendu." : "Commerçant réactivé.");
      onUpdated(updated);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="suspend-merchant-title"
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full ${
            willSuspend ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
          }`}
        >
          <Power className="h-5 w-5" />
        </span>
        <h2 id="suspend-merchant-title" className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900">
          {willSuspend ? "Suspendre" : "Réactiver"} {merchant.business_name} ?
        </h2>
        <p className="mt-1.5 text-[13.5px] text-slate-500">
          {willSuspend
            ? "Ce commerçant ne pourra plus accéder à son tableau de bord tant qu'il n'est pas réactivé."
            : "Ce commerçant retrouvera immédiatement l'accès à son tableau de bord."}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full px-4 py-2 text-[13.5px] font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium text-white transition-colors disabled:pointer-events-none disabled:opacity-70 ${
              willSuspend ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {willSuspend ? "Suspendre" : "Réactiver"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

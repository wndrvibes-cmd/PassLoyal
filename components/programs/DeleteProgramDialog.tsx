"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { deleteProgram } from "@/services/programs";
import type { LoyaltyProgram } from "@/types/database";

interface DeleteProgramDialogProps {
  program: LoyaltyProgram;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DeleteProgramDialog({
  program,
  onClose,
  onDeleted,
}: DeleteProgramDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await deleteProgram(supabase, program.id);
      toast.success("Programme supprimé.");
      onDeleted(program.id);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Impossible de supprimer le programme."
      );
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isDeleting ? undefined : onClose}
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
        aria-labelledby="delete-program-title"
        aria-describedby="delete-program-description"
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h2
          id="delete-program-title"
          className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900"
        >
          Supprimer « {program.name} » ?
        </h2>
        <p id="delete-program-description" className="mt-1.5 text-[13.5px] text-slate-500">
          Cette action est définitive et supprimera toutes les données associées à ce programme.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full px-4 py-2 text-[13.5px] font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-red-700 disabled:pointer-events-none disabled:opacity-70"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Supprimer
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

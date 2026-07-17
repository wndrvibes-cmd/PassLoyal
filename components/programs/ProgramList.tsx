"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Skeleton from "@/components/ui/Skeleton";
import { usePrograms } from "@/hooks/usePrograms";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { duplicateProgram, toggleProgramActive } from "@/services/programs";
import type { LoyaltyProgram } from "@/types/database";
import DeleteProgramDialog from "./DeleteProgramDialog";
import EmptyState from "./EmptyState";
import ProgramCard from "./ProgramCard";
import ProgramForm from "./ProgramForm";

export default function ProgramList() {
  const { merchant, programs, isLoading, error, setPrograms } = usePrograms();

  const [formState, setFormState] = useState<{ open: boolean; program: LoyaltyProgram | null }>({
    open: false,
    program: null,
  });
  const [deletingProgram, setDeletingProgram] = useState<LoyaltyProgram | null>(null);

  const handleSaved = (program: LoyaltyProgram, mode: "create" | "edit") => {
    setPrograms((previous) =>
      mode === "create"
        ? [program, ...previous]
        : previous.map((item) => (item.id === program.id ? program : item))
    );
    setFormState({ open: false, program: null });
  };

  const handleDeleted = (id: string) => {
    setPrograms((previous) => previous.filter((item) => item.id !== id));
    setDeletingProgram(null);
  };

  const handleDuplicate = async (program: LoyaltyProgram) => {
    const supabase = createSupabaseBrowserClient();
    try {
      const duplicated = await duplicateProgram(supabase, program);
      setPrograms((previous) => [duplicated, ...previous]);
      toast.success("Programme dupliqué.");
    } catch (caughtError) {
      toast.error(
        caughtError instanceof Error ? caughtError.message : "Impossible de dupliquer le programme."
      );
    }
  };

  const handleToggleActive = async (program: LoyaltyProgram) => {
    const supabase = createSupabaseBrowserClient();
    try {
      const updated = await toggleProgramActive(supabase, program.id, !program.is_active);
      setPrograms((previous) => previous.map((item) => (item.id === updated.id ? updated : item)));
      toast.success(updated.is_active ? "Programme activé." : "Programme désactivé.");
    } catch (caughtError) {
      toast.error(
        caughtError instanceof Error
          ? caughtError.message
          : "Impossible de mettre à jour le programme."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Skeleton className="h-11 w-11 rounded-xl" />
            <Skeleton className="mt-4 h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
            <Skeleton className="mt-5 h-3 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Programmes de fidélité
          </h1>
          <p className="mt-1 text-[13.5px] text-slate-500">
            Créez et gérez les cartes de fidélité de {merchant?.business_name}.
          </p>
        </div>
        {programs.length > 0 && (
          <button
            type="button"
            onClick={() => setFormState({ open: true, program: null })}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nouveau programme
            </span>
          </button>
        )}
      </div>

      {programs.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Aucun programme de fidélité"
          description="Créez votre premier programme pour commencer à récompenser vos clients."
          actionLabel="Créer un programme"
          onAction={() => setFormState({ open: true, program: null })}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onEdit={() => setFormState({ open: true, program })}
                onDelete={() => setDeletingProgram(program)}
                onDuplicate={() => handleDuplicate(program)}
                onToggleActive={() => handleToggleActive(program)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {formState.open && merchant && (
        <ProgramForm
          merchantId={merchant.id}
          program={formState.program}
          onClose={() => setFormState({ open: false, program: null })}
          onSaved={handleSaved}
        />
      )}

      {deletingProgram && (
        <DeleteProgramDialog
          program={deletingProgram}
          onClose={() => setDeletingProgram(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}

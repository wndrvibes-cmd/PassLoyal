"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { programSchema, type ProgramFormValues } from "@/lib/validations/program";
import { createProgram, updateProgram } from "@/services/programs";
import type { LoyaltyProgram } from "@/types/database";
import ProgramPreview from "./ProgramPreview";
import ProgramSettings from "./ProgramSettings";

const DEFAULT_DRAFT: ProgramFormValues = {
  name: "",
  description: "",
  primary_color: "#4F46E5",
  secondary_color: "#0F1729",
  logo_url: "",
  qr_code_enabled: true,
  wallet_enabled: true,
  reward_type: "points",
  points_per_visit: 1,
  points_per_euro: 1,
  reward_points: 100,
  is_active: true,
};

function toDraft(program: LoyaltyProgram): ProgramFormValues {
  return {
    name: program.name,
    description: program.description ?? "",
    logo_url: program.logo_url ?? "",
    primary_color: program.primary_color,
    secondary_color: program.secondary_color,
    reward_type: program.reward_type,
    points_per_visit: program.points_per_visit,
    points_per_euro: program.points_per_euro,
    reward_points: program.reward_points,
    qr_code_enabled: program.qr_code_enabled,
    wallet_enabled: program.wallet_enabled,
    is_active: program.is_active,
  };
}

interface ProgramFormProps {
  merchantId: string;
  program?: LoyaltyProgram | null;
  onClose: () => void;
  onSaved: (program: LoyaltyProgram, mode: "create" | "edit") => void;
}

export default function ProgramForm({ merchantId, program, onClose, onSaved }: ProgramFormProps) {
  const isEditMode = Boolean(program);

  const [draft, setDraft] = useState<ProgramFormValues>(() =>
    program ? toDraft(program) : DEFAULT_DRAFT
  );
  const [errors, setErrors] = useState<Partial<Record<keyof ProgramFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patchDraft = (patch: Partial<ProgramFormValues>) => {
    setDraft((previous) => ({ ...previous, ...patch }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = programSchema.safeParse(draft);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProgramFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ProgramFormValues;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Vérifiez les champs en erreur.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const saved = program
        ? await updateProgram(supabase, program.id, result.data)
        : await createProgram(supabase, merchantId, result.data);

      toast.success(isEditMode ? "Programme mis à jour." : "Programme créé.");
      onSaved(saved, isEditMode ? "edit" : "create");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="program-form-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-full sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h2
            id="program-form-title"
            className="text-[16px] font-semibold tracking-tight text-slate-900"
          >
            {isEditMode ? "Modifier le programme" : "Nouveau programme de fidélité"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[1.3fr_1fr]"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Nom du programme
              </label>
              <input
                id="name"
                value={draft.name}
                onChange={(event) => patchDraft({ name: event.target.value })}
                placeholder="Carte fidélité Café des Halles"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              {errors.name && <p className="mt-1 text-[12px] text-red-600">{errors.name}</p>}
              <p className="mt-1 text-[11.5px] text-slate-400">
                C&apos;est aussi le nom affiché sur la carte Wallet.
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={draft.description}
                onChange={(event) => patchDraft({ description: event.target.value })}
                rows={3}
                placeholder="Décrivez votre programme pour vos clients."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              {errors.description && (
                <p className="mt-1 text-[12px] text-red-600">{errors.description}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="logo_url"
                className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
              >
                Logo (URL)
              </label>
              <input
                id="logo_url"
                value={draft.logo_url}
                onChange={(event) => patchDraft({ logo_url: event.target.value })}
                placeholder="https://…"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              {errors.logo_url && (
                <p className="mt-1 text-[12px] text-red-600">{errors.logo_url}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorField
                id="primary_color"
                label="Couleur principale"
                value={draft.primary_color}
                onChange={(value) => patchDraft({ primary_color: value })}
                error={errors.primary_color}
              />
              <ColorField
                id="secondary_color"
                label="Couleur secondaire"
                value={draft.secondary_color}
                onChange={(value) => patchDraft({ secondary_color: value })}
                error={errors.secondary_color}
              />
            </div>

            <div className="border-t border-slate-100 pt-5">
              <ProgramSettings draft={draft} onChange={patchDraft} errors={errors} />
            </div>
          </div>

          <div>
            <ProgramPreview program={draft} />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 lg:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-[13.5px] font-medium text-slate-600 hover:bg-slate-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isEditMode ? "Enregistrer" : "Créer le programme"}
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

function ColorField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-[13.5px] text-slate-700 focus:outline-none"
        />
      </div>
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

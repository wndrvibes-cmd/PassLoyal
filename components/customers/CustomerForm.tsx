"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { customerSchema, type CustomerFormValues } from "@/lib/validations/customer";
import { createCustomer, updateCustomer } from "@/services/customers";
import { GENDERS, LOYALTY_LEVELS, WALLET_PLATFORMS, type Customer } from "@/types/database";

const DEFAULT_DRAFT: CustomerFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  birthday: "",
  gender: "",
  wallet_platform: "",
  loyalty_level: "bronze",
  is_active: true,
};

function toDraft(customer: Customer): CustomerFormValues {
  return {
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email ?? "",
    phone: customer.phone ?? "",
    birthday: customer.birthday ?? "",
    gender: customer.gender ?? "",
    wallet_platform: customer.wallet_platform ?? "",
    loyalty_level: customer.loyalty_level,
    is_active: customer.is_active,
  };
}

const GENDER_LABELS: Record<string, string> = { male: "Homme", female: "Femme", other: "Autre" };
const WALLET_LABELS: Record<string, string> = { apple: "Apple Wallet", google: "Google Wallet" };
const LOYALTY_LABELS: Record<string, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

interface CustomerFormProps {
  merchantId: string;
  customer?: Customer | null;
  onClose: () => void;
  onSaved: (customer: Customer, mode: "create" | "edit") => void;
}

export default function CustomerForm({ merchantId, customer, onClose, onSaved }: CustomerFormProps) {
  const isEditMode = Boolean(customer);

  const [draft, setDraft] = useState<CustomerFormValues>(() =>
    customer ? toDraft(customer) : DEFAULT_DRAFT
  );
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patchDraft = (patch: Partial<CustomerFormValues>) => {
    setDraft((previous) => ({ ...previous, ...patch }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = customerSchema.safeParse(draft);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CustomerFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof CustomerFormValues;
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
      const saved = customer
        ? await updateCustomer(supabase, customer.id, result.data)
        : await createCustomer(supabase, merchantId, result.data);

      toast.success(isEditMode ? "Client mis à jour." : "Client ajouté.");
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
        aria-labelledby="customer-form-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h2
            id="customer-form-title"
            className="text-[16px] font-semibold tracking-tight text-slate-900"
          >
            {isEditMode ? "Modifier le client" : "Ajouter un client"}
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

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <Field
              id="first_name"
              label="Prénom"
              value={draft.first_name}
              onChange={(value) => patchDraft({ first_name: value })}
              error={errors.first_name}
            />
            <Field
              id="last_name"
              label="Nom"
              value={draft.last_name}
              onChange={(value) => patchDraft({ last_name: value })}
              error={errors.last_name}
            />
          </div>

          <Field
            id="email"
            label="Email"
            type="email"
            value={draft.email}
            onChange={(value) => patchDraft({ email: value })}
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              id="phone"
              label="Téléphone"
              type="tel"
              value={draft.phone}
              onChange={(value) => patchDraft({ phone: value })}
              error={errors.phone}
            />
            <Field
              id="birthday"
              label="Date d'anniversaire"
              type="date"
              value={draft.birthday}
              onChange={(value) => patchDraft({ birthday: value })}
              error={errors.birthday}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Genre
              </label>
              <select
                id="gender"
                value={draft.gender}
                onChange={(event) =>
                  patchDraft({ gender: event.target.value as CustomerFormValues["gender"] })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="">Non précisé</option>
                {GENDERS.map((value) => (
                  <option key={value} value={value}>
                    {GENDER_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="wallet_platform"
                className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
              >
                Wallet
              </label>
              <select
                id="wallet_platform"
                value={draft.wallet_platform}
                onChange={(event) =>
                  patchDraft({
                    wallet_platform: event.target.value as CustomerFormValues["wallet_platform"],
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="">Non précisé</option>
                {WALLET_PLATFORMS.map((value) => (
                  <option key={value} value={value}>
                    {WALLET_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="loyalty_level"
              className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
            >
              Niveau de fidélité
            </label>
            <select
              id="loyalty_level"
              value={draft.loyalty_level}
              onChange={(event) =>
                patchDraft({ loyalty_level: event.target.value as CustomerFormValues["loyalty_level"] })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            >
              {LOYALTY_LEVELS.map((value) => (
                <option key={value} value={value}>
                  {LOYALTY_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
            <span className="text-[13px] font-medium text-slate-900">Client actif</span>
            <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
              <input
                type="checkbox"
                checked={draft.is_active}
                onChange={(event) => patchDraft({ is_active: event.target.checked })}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-indigo-600" />
              <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </span>
          </label>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
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
                {isEditMode ? "Enregistrer" : "Ajouter le client"}
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      />
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

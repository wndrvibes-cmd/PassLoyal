"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { createMerchant, updateMerchant } from "@/services/adminMerchants";
import type { Merchant } from "@/types/database";

interface MerchantFormProps {
  merchant?: Merchant | null;
  onClose: () => void;
  onSaved: (merchant: Merchant, mode: "create" | "edit") => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MerchantForm({ merchant, onClose, onSaved }: MerchantFormProps) {
  const isEditMode = Boolean(merchant);

  const [businessName, setBusinessName] = useState(merchant?.business_name ?? "");
  const [email, setEmail] = useState(merchant?.email ?? "");
  const [phone, setPhone] = useState(merchant?.phone ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!businessName.trim()) {
      setError("Le nom du commerce est requis.");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Email invalide.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (merchant) {
        const supabase = createSupabaseBrowserClient();
        const saved = await updateMerchant(supabase, merchant.id, {
          business_name: businessName,
          email,
          phone,
        });
        toast.success("Commerçant mis à jour.");
        onSaved(saved, "edit");
      } else {
        const saved = await createMerchant({ business_name: businessName, email });
        toast.success("Commerçant créé — invitation envoyée par email.");
        onSaved(saved, "create");
      }
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Une erreur est survenue.";
      setError(message);
      toast.error(message);
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
        aria-labelledby="merchant-form-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h2 id="merchant-form-title" className="text-[16px] font-semibold tracking-tight text-slate-900">
            {isEditMode ? "Modifier le commerçant" : "Nouveau commerçant"}
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
          {error && (
            <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-600">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="business_name" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
              Nom du commerce
            </label>
            <input
              id="business_name"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="Café des Halles"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="commercant@exemple.fr"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
            {!isEditMode && (
              <p className="mt-1 text-[11.5px] text-slate-400">
                Une invitation par email sera envoyée pour définir le mot de passe — aucun mot de passe n&apos;est saisi ici.
              </p>
            )}
          </div>

          {isEditMode && (
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
                Téléphone
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="06 12 34 56 78"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          )}

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
                {isEditMode ? "Enregistrer" : "Créer et inviter"}
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

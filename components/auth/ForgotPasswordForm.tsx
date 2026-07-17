"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createSupabaseBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
    });

    setIsSubmitting(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-[13.5px] text-emerald-700">
          Si un compte existe pour {email}, un e-mail de réinitialisation vient de lui être
          envoyé.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à la connexion
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13.5px] text-red-600"
        >
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
          Adresse e-mail
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="vous@commerce.fr"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-3.5 text-[14.5px] font-medium text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/20 disabled:pointer-events-none disabled:opacity-70"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
        <span className="relative flex items-center gap-2">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Envoyer le lien de réinitialisation
        </span>
      </button>

      <p className="text-center text-[13.5px] text-slate-500">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à la connexion
        </Link>
      </p>
    </motion.form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function RegisterForm() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);

    const supabase = createSupabaseBrowserClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { business_name: businessName },
      },
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
    router.refresh();
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-[13.5px] text-emerald-700"
      >
        Compte créé ! Vérifiez votre boîte mail pour confirmer votre adresse, puis{" "}
        <Link href="/login" className="font-medium underline underline-offset-2">
          connectez-vous
        </Link>
        .
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
        <label
          htmlFor="businessName"
          className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
        >
          Nom du commerce
        </label>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            required
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Café des Halles"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

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

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
        >
          Mot de passe
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="8 caractères minimum"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-[14.5px] text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
        >
          Confirmer le mot de passe
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="8 caractères minimum"
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
          Créer mon compte
        </span>
      </button>

      <p className="text-center text-[13.5px] text-slate-500">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Se connecter
        </Link>
      </p>
    </motion.form>
  );
}

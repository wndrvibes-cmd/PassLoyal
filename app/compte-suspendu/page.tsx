"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, ShieldAlert } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SuspendedAccountPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore: Supabase may not be configured yet, still send the user to /login.
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-900/[0.02]"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldAlert className="h-6 w-6" strokeWidth={2.25} />
        </span>
        <h1 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
          Compte suspendu
        </h1>
        <p className="mt-2 text-[13.5px] text-slate-500">
          Votre compte commerçant a été suspendu par l&apos;administrateur de la plateforme. Contactez le support PassLoyal si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" /> Se déconnecter
        </button>
      </motion.div>
    </div>
  );
}

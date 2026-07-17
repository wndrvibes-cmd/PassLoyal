"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Gift,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Accueil", href: "/dashboard", icon: LayoutDashboard },
  { label: "Programmes de fidélité", href: "/dashboard/programs", icon: CreditCard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Récompenses", href: "/dashboard/recompenses", icon: Gift },
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
] as const;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/30">
          <Wallet className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-slate-900">
          PassLoyal
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.25} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" strokeWidth={2.25} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        {navContent}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-hidden
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl lg:hidden"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="absolute right-3 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

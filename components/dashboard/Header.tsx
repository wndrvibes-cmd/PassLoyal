"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Search, Settings } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-[15px] font-semibold tracking-tight text-slate-900 sm:text-base">
          Tableau de bord
        </h1>
      </div>

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 sm:flex">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="search"
          placeholder="Rechercher un client, une carte…"
          className="w-full bg-transparent text-[13.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-slate-100"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-[12px] font-semibold text-white">
              PL
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg shadow-slate-900/10"
            >
              <Link
                href="/dashboard/parametres"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-slate-600 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4" /> Paramètres
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13.5px] text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Démo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:contact@passloyal.fr" },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-slate-200/70 bg-white/75 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="PassLoyal — accueil">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/30">
            <Wallet className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">
            PassLoyal
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-[13.5px] font-medium text-slate-700 transition-colors hover:text-slate-900"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-slate-900 px-4 py-2 text-[13.5px] font-medium text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/20"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative">Créer un compte</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-slate-900/5 md:hidden"
          aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: {},
              }}
              className="flex flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -12 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-900/5"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 },
                }}
                className="mt-2 flex flex-col gap-2 border-t border-slate-200/70 pt-3"
              >
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-full px-3.5 py-2.5 text-center text-[15px] font-medium text-slate-700 hover:bg-slate-900/5"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-3.5 py-2.5 text-center text-[15px] font-medium text-white shadow-md shadow-indigo-500/25"
                >
                  Créer un compte
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

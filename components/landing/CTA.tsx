"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0F1729] py-24 sm:py-32">
      {/* gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(27,138,90,0.35),transparent)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#D4A62A]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-[#1FAE6B]"
        >
          Prêt à fidéliser ?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Offrez à vos clients la carte de fidélité
          <br className="hidden sm:block" /> qu'ils garderont vraiment
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-white/60"
        >
          Rejoignez les commerçants qui ont remplacé leurs cartes en papier
          par une expérience de fidélité moderne, dans Apple Wallet et Google
          Wallet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/register"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B8A5A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1FAE6B] sm:w-auto"
          >
            Commencer gratuitement
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] sm:w-auto"
          >
            <CalendarDays className="h-4 w-4" />
            Demander une démonstration
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

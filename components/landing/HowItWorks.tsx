"use client";

import { motion } from "framer-motion";
import { Settings2, QrCode, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Settings2,
    title: "Créez un programme de fidélité",
    description:
      "Définissez vos récompenses, votre design de carte et vos règles de points en quelques minutes, sans code.",
  },
  {
    number: "02",
    icon: QrCode,
    title: "Le client scanne un QR Code",
    description:
      "En caisse ou sur votre vitrine, un simple scan suffit pour que le client rejoigne votre programme.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Les points s'ajoutent automatiquement",
    description:
      "La carte atterrit directement dans Apple Wallet ou Google Wallet, avec les points à jour en temps réel.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0F1729] py-24 sm:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#1B8A5A]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A62A]">
            Le parcours
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Comment fonctionne PassLoyal ?
          </h2>
          <p className="mt-4 text-base text-white/60">
            Trois étapes suffisent pour transformer un client de passage en
            client fidèle.
          </p>
        </motion.div>

        <div className="relative mt-16 grid gap-8 sm:mt-20 md:grid-cols-3 md:gap-6">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-start"
            >
              <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <step.icon
                  className="h-9 w-9 text-[#1FAE6B]"
                  strokeWidth={1.5}
                />
                <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1B8A5A] font-mono text-xs font-semibold text-white">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

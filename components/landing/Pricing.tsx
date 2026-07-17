"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "19€",
    period: "/ mois",
    description: "Pour tester la fidélité digitale sans engagement.",
    features: [
      "1 programme de fidélité",
      "Jusqu'à 200 clients",
      "Apple Wallet & Google Wallet",
      "QR Code illimité",
      "Support par e-mail",
    ],
    cta: "Commencer",
  },
  {
    name: "Pro",
    price: "49€",
    period: "/ mois",
    description: "Pour les commerces qui veulent grandir sereinement.",
    features: [
      "3 programmes de fidélité",
      "Clients illimités",
      "Notifications push",
      "Statistiques avancées",
      "Support prioritaire",
    ],
    cta: "Choisir Pro",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "99€",
    period: "/ mois",
    description: "Pour les réseaux et enseignes multi-boutiques.",
    features: [
      "Programmes illimités",
      "Multi-établissements",
      "Accès API",
      "Statistiques exportables",
      "Accompagnement dédié",
    ],
    cta: "Choisir Premium",
  },
];

export default function Pricing() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A62A]">
            Tarifs
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Un tarif simple, pour chaque taille de commerce
          </h2>
          <p className="mt-4 text-base text-[#3D4759]/70">
            Sans engagement. Changez de formule à tout moment.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-3 md:items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={
                plan.highlighted
                  ? "relative rounded-2xl bg-[#0F1729] p-8 shadow-[0_30px_70px_-30px_rgba(15,23,41,0.5)] md:-my-4 md:py-12"
                  : "relative rounded-2xl border border-[#E4E1D6] bg-[#FAFAF7] p-8"
              }
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-[#1B8A5A] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                  Le plus choisi
                </span>
              )}

              <h3
                className={`text-sm font-semibold uppercase tracking-wide ${
                  plan.highlighted ? "text-white/70" : "text-[#3D4759]/70"
                }`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`font-mono text-4xl font-bold ${
                    plan.highlighted ? "text-white" : "text-[#0F1729]"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={
                    plan.highlighted ? "text-white/50" : "text-[#3D4759]/50"
                  }
                >
                  {plan.period}
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  plan.highlighted ? "text-white/60" : "text-[#3D4759]/70"
                }`}
              >
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlighted ? "text-[#1FAE6B]" : "text-[#1B8A5A]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-white/80" : "text-[#3D4759]"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={
                  plan.highlighted
                    ? "mt-8 w-full rounded-lg bg-[#1B8A5A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1FAE6B]"
                    : "mt-8 w-full rounded-lg border border-[#0F1729]/15 bg-white py-3 text-sm font-semibold text-[#0F1729] transition-colors hover:border-[#0F1729]/30"
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

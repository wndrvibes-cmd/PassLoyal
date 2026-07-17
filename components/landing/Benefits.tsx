"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Coins,
  Ban,
  Wallet,
  Smartphone,
  Zap,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Users,
    title: "Plus de clients fidèles",
    description: "Transformez les visiteurs occasionnels en habitués engagés.",
  },
  {
    icon: TrendingUp,
    title: "Plus de visites",
    description: "Des récompenses qui donnent une vraie raison de revenir.",
  },
  {
    icon: Coins,
    title: "Plus de chiffre d'affaires",
    description: "Un client fidèle dépense davantage, plus souvent.",
  },
  {
    icon: Ban,
    title: "Aucune carte papier",
    description: "Fini les cartes tamponnées perdues au fond d'un tiroir.",
  },
  {
    icon: Wallet,
    title: "Compatible Apple Wallet",
    description: "La carte s'ajoute au wallet natif de l'iPhone en un scan.",
  },
  {
    icon: Smartphone,
    title: "Compatible Google Wallet",
    description: "Une expérience identique et fluide sur Android.",
  },
  {
    icon: Zap,
    title: "Installation rapide",
    description: "Votre programme de fidélité est prêt en moins de 10 minutes.",
  },
  {
    icon: BarChart3,
    title: "Statistiques complètes",
    description: "Comprenez vos clients grâce à des données claires.",
  },
];

export default function Benefits() {
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
            Pourquoi PassLoyal
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Des bénéfices concrets, dès la première semaine
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="rounded-2xl border border-[#E4E1D6] bg-[#FAFAF7] p-6 transition-colors duration-300 hover:border-[#1B8A5A]/40"
            >
              <benefit.icon
                className="h-6 w-6 text-[#1B8A5A]"
                strokeWidth={1.75}
              />
              <h3 className="mt-4 text-sm font-semibold text-[#0F1729]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3D4759]/70">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

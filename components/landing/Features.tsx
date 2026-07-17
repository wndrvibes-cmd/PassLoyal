"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Smartphone,
  QrCode,
  LayoutDashboard,
  Bell,
  BarChart3,
  Gift,
  Users,
  History,
  RefreshCw,
  Award,
  Headphones,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Wallet,
    title: "Apple Wallet",
    description: "Cartes de fidélité natives directement dans Apple Wallet.",
  },
  {
    icon: Smartphone,
    title: "Google Wallet",
    description: "Compatible Google Wallet pour tous les clients Android.",
  },
  {
    icon: QrCode,
    title: "QR Code",
    description: "Un scan unique pour rejoindre le programme et cumuler des points.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Un tableau de bord clair pour piloter votre activité.",
  },
  {
    icon: Bell,
    title: "Notifications push",
    description: "Alertez vos clients d'une offre directement depuis leur wallet.",
  },
  {
    icon: BarChart3,
    title: "Statistiques",
    description: "Suivez visites, points et récompenses en temps réel.",
  },
  {
    icon: Gift,
    title: "Récompenses",
    description: "Configurez des paliers de récompenses sur mesure.",
  },
  {
    icon: Users,
    title: "Gestion des clients",
    description: "Une base client centralisée et toujours à jour.",
  },
  {
    icon: History,
    title: "Historique",
    description: "Retrouvez chaque visite et chaque transaction en un clic.",
  },
  {
    icon: RefreshCw,
    title: "Synchronisation",
    description: "Mise à jour instantanée sur tous les appareils.",
  },
  {
    icon: Award,
    title: "Programme de fidélité",
    description: "Des règles de points flexibles, adaptées à votre commerce.",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Une équipe disponible pour vous accompagner au quotidien.",
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="scroll-mt-20 bg-[#FAFAF7] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#1B8A5A]">
            Fonctionnalités
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Tout ce qu'il faut, dans une seule carte
          </h2>
          <p className="mt-4 text-base text-[#3D4759]/70">
            PassLoyal réunit la fidélisation, le suivi client et l'analyse en
            un seul outil.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-[#E4E1D6] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8A5A]/40 hover:shadow-[0_16px_40px_-16px_rgba(27,138,90,0.35)]"
            >
              {/* pass-style perforated notch */}
              <span className="absolute -left-3 top-9 h-6 w-6 rounded-full bg-[#FAFAF7] border border-[#E4E1D6]" />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F1729] transition-colors duration-300 group-hover:bg-[#1B8A5A]">
                <feature.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#0F1729]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3D4759]/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Coffee,
  Dumbbell,
  Scissors,
  Flower2,
  Croissant,
  ShoppingBag,
  Pill,
  type LucideIcon,
} from "lucide-react";

interface Brand {
  label: string;
  icon: LucideIcon;
}

const brands: Brand[] = [
  { label: "Restaurant", icon: UtensilsCrossed },
  { label: "Café", icon: Coffee },
  { label: "Salle de sport", icon: Dumbbell },
  { label: "Salon de coiffure", icon: Scissors },
  { label: "Fleuriste", icon: Flower2 },
  { label: "Boulangerie", icon: Croissant },
  { label: "Boutique", icon: ShoppingBag },
  { label: "Pharmacie", icon: Pill },
];

// Doubled for a seamless looping marquee
const marqueeBrands = [...brands, ...brands];

export default function TrustedBrands() {
  return (
    <section className="bg-[#FAFAF7] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-mono uppercase tracking-[0.25em] text-[#3D4759]/60"
        >
          Ils font confiance à PassLoyal
        </motion.p>

        <div className="relative mt-10 overflow-hidden">
          {/* fade masks on the edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FAFAF7] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FAFAF7] to-transparent sm:w-28" />

          <motion.div
            className="flex w-max items-center gap-12 sm:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {marqueeBrands.map(({ label, icon: Icon }, i) => (
              <div
                key={`${label}-${i}`}
                className="flex shrink-0 items-center gap-2.5 text-[#3D4759]/50 transition-colors hover:text-[#1B8A5A]"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                <span className="whitespace-nowrap text-sm font-medium tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

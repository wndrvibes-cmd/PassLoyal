"use client";

import { motion } from "framer-motion";
import { Coffee, Croissant, Scissors, Sparkles, Dumbbell, Shirt, BedDouble, Store, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { sectors } from "@/lib/content/sectors";

const icons: Record<string, LucideIcon> = {
  coffee: Coffee,
  croissant: Croissant,
  scissors: Scissors,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  shirt: Shirt,
  bed: BedDouble,
  store: Store,
};

export function SectorsSection() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Secteurs d'activité"
          title="PassLoyal s'adapte à votre commerce"
          description="Quel que soit votre secteur, la même promesse : une carte que vos clients gardent, et des visites qui reviennent plus souvent."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector, index) => {
            const Icon = icons[sector.icon];
            return (
              <RevealOnScroll key={sector.label} delay={(index % 4) * 0.06}>
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                  className={cn(
                    "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-soft transition-shadow duration-300 hover:shadow-soft-xl",
                    sector.tone
                  )}
                >
                  <motion.div
                    variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.15, rotate: -6 } }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute -right-6 -top-6 text-white/15"
                  >
                    <Icon className="h-32 w-32" strokeWidth={1} />
                  </motion.div>

                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10 transition-all duration-300 group-hover:from-black/70 group-hover:to-black/0"
                    aria-hidden
                  />

                  <motion.span
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                    transition={{ duration: 0.3 }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                  <motion.div
                    variants={{ rest: { y: 0 }, hover: { y: -3 } }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-4"
                  >
                    <h3 className="text-lg font-semibold tracking-tight text-white">{sector.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">{sector.pitch}</p>
                  </motion.div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

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
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br opacity-[0.08] blur-xl transition-opacity duration-300 group-hover:opacity-[0.16]",
                      sector.tone
                    )}
                  />
                  <motion.span
                    whileHover={{ rotate: -6, scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-soft",
                      sector.tone
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                  <div className="relative">
                    <h3 className="text-base font-semibold tracking-tight">{sector.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {sector.pitch}
                    </p>
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

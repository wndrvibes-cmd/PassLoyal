import { Coffee, Croissant, Scissors, Sparkles, Dumbbell, Shirt, BedDouble, Store, type LucideIcon } from "lucide-react";

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
                <div className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{sector.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {sector.pitch}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

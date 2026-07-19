import { Zap, Smartphone, LineChart, Headphones, type LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { whyUsPoints } from "@/lib/content/misc";

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  smartphone: Smartphone,
  "line-chart": LineChart,
  headphones: Headphones,
};

export function WhyUs() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pourquoi PassLoyal"
          title="Conçu pour les commerçants, pas pour les développeurs"
          description="Chaque fonctionnalité existe pour une seule raison : faire revenir vos clients plus souvent, sans effort de votre part."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {whyUsPoints.map((point, index) => {
            const Icon = icons[point.icon];
            return (
              <RevealOnScroll key={point.title} delay={index * 0.08}>
                <div className="flex h-full gap-5 rounded-3xl border border-border bg-white p-7 shadow-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {point.description}
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

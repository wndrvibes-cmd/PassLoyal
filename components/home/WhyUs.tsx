import { Zap, Smartphone, LineChart, Headphones, ShieldCheck, type LucideIcon } from "lucide-react";

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

function TrustPanel() {
  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-6 rounded-[2rem] border border-border bg-white p-8 shadow-soft-lg">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-white shadow-soft-lg">
        <ShieldCheck className="h-7 w-7" strokeWidth={1.75} />
      </span>
      <div className="flex w-full flex-col gap-3">
        {whyUsPoints.map((point) => {
          const Icon = icons[point.icon];
          return (
            <div
              key={point.title}
              className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
              <p className="text-sm font-medium text-foreground">{point.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WhyUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <RevealOnScroll>
          <TrustPanel />
        </RevealOnScroll>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Pourquoi PassLoyal"
            title="Conçu pour les commerçants, pas pour les développeurs"
            description="Chaque fonctionnalité existe pour une seule raison : faire revenir vos clients plus souvent, sans effort de votre part."
          />

          <div className="mt-10 flex flex-col gap-7">
            {whyUsPoints.map((point, index) => {
              const Icon = icons[point.icon];
              return (
                <RevealOnScroll key={point.title} delay={index * 0.06} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{point.title}</p>
                    <p className="mt-1 leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

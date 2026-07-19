import { Heart, Target, Sparkles, Handshake, type LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { companyValues } from "@/lib/content/misc";

const icons: Record<string, LucideIcon> = {
  heart: Heart,
  target: Target,
  sparkles: Sparkles,
  handshake: Handshake,
};

export function Values() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Ce qui guide chacune de nos décisions"
          description="Des principes simples, appliqués avec la même rigueur au produit, au support et à la relation commerçante."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {companyValues.map((value, index) => {
            const Icon = icons[value.icon];
            return (
              <RevealOnScroll key={value.title} delay={index * 0.08}>
                <div className="flex h-full gap-5 rounded-3xl border border-border bg-white p-7 shadow-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{value.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {value.description}
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

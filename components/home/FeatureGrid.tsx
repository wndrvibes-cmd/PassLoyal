import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { featureIcons } from "@/components/shared/featureIcons";
import { features } from "@/lib/content/features";

export function FeatureGrid() {
  const shown = features.slice(0, 6);

  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="La solution PassLoyal"
          title="Tout ce qu'il faut pour fidéliser, rien de superflu"
          description="Une plateforme complète pensée pour les commerces physiques — de l'ajout de la carte au suivi de vos performances."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            return (
              <RevealOnScroll key={feature.slug} delay={(index % 3) * 0.08}>
                <div className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white transition-colors group-hover:bg-primary">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/fonctionnalites"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-700"
          >
            Voir toutes les fonctionnalités
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

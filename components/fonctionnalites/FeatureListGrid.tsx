import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { featureIcons } from "@/components/shared/featureIcons";
import type { Feature } from "@/lib/content/features";

export function FeatureListGrid({ features }: { features: Feature[] }) {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Et bien plus"
          title="Des fonctionnalités pensées pour le quotidien"
          description="Au-delà du Wallet, PassLoyal couvre tout ce qui fait fonctionner un programme de fidélité au quotidien."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            return (
              <RevealOnScroll key={feature.slug} delay={(index % 3) * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-white p-7 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

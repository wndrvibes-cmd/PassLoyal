import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import type { Feature } from "@/lib/content/features";

export function FeatureShowcase({ features }: { features: Feature[] }) {
  return (
    <section className="bg-white py-4 sm:py-8">
      <Container className="flex flex-col gap-24 py-16 sm:gap-32">
        <h2 className="sr-only">Apple Wallet et Google Wallet en détail</h2>
        {features.map((feature, index) => {
          const reversed = index % 2 === 1;
          const variant = feature.slug === "google-wallet" ? "google" : "apple";

          return (
            <div
              key={feature.slug}
              className={cn(
                "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
                reversed && "lg:[&>*:first-child]:order-2"
              )}
            >
              <RevealOnScroll>
                <p className="text-sm font-medium text-primary">{`0${index + 1}`}</p>
                <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {feature.detail}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm sm:text-base">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-foreground/85">{point}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1} className="flex justify-center">
                <PhoneMockup variant={variant} />
              </RevealOnScroll>
            </div>
          );
        })}
      </Container>
    </section>
  );
}

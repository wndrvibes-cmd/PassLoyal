import { Store, Users, Building2, ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const recommendations = [
  {
    icon: Store,
    profile: "Un commerce unique",
    plan: "Starter",
    description: "Vous lancez votre premier programme de fidélité digital.",
  },
  {
    icon: Users,
    profile: "Un commerce en croissance",
    plan: "Pro",
    description: "Vous voulez fidéliser à grande échelle et personnaliser votre carte.",
  },
  {
    icon: Building2,
    profile: "Un réseau ou une franchise",
    plan: "Enterprise",
    description: "Vous pilotez plusieurs établissements depuis un seul espace.",
  },
];

export function WhichPlan() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Vous hésitez ?" title="Quel plan est fait pour vous ?" />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {recommendations.map((rec, index) => (
            <RevealOnScroll key={rec.plan} delay={index * 0.08}>
              <div className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-white p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <rec.icon className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <p className="text-sm text-muted-foreground">{rec.profile}</p>
                <p className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-primary">
                  {rec.plan}
                  <ArrowRight className="h-4 w-4" />
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{rec.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { howItWorksSteps } from "@/lib/content/misc";

export function HowItWorks() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Comment ça fonctionne"
          title="Trois étapes, aucune friction"
          description="De la création de votre carte à la fidélisation quotidienne, PassLoyal tient sa promesse de simplicité."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-border md:block" />
          {howItWorksSteps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={index * 0.1}>
              <div className="relative flex flex-col gap-4 rounded-3xl border border-border bg-white p-8 shadow-soft">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink font-mono text-lg font-semibold text-white">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

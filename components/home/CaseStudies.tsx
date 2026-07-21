import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { caseStudies } from "@/lib/content/caseStudies";

export function CaseStudies() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Études de cas"
          title="Des résultats concrets, mesurés sur le terrain"
          description="Trois commerces qui ont remplacé leur carte papier par PassLoyal — et ce que ça a changé."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <RevealOnScroll key={study.company} delay={index * 0.08}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-white p-8 shadow-soft">
                <div>
                  <p className="font-mono text-3xl font-semibold tracking-tight text-primary">
                    {study.metric.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.metric.label}</p>
                </div>
                <p className="flex-1 leading-relaxed text-foreground/85">{study.summary}</p>
                <div className="border-t border-border pt-5">
                  <p className="text-sm font-semibold">{study.company}</p>
                  <p className="text-xs text-muted-foreground">{study.sector}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

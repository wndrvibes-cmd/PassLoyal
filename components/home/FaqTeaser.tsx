import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generalFaq } from "@/lib/content/faq";

export function FaqTeaser() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Les questions les plus fréquentes"
          description="Tout ce que les commerçants nous demandent avant de se lancer."
        />

        <RevealOnScroll className="mt-14">
          <Accordion type="single" collapsible className="rounded-3xl border border-border bg-white px-6 shadow-soft sm:px-8">
            {generalFaq.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          D'autres questions ?{" "}
          <Link href="/contact" className="font-medium text-primary hover:text-primary-700">
            Contactez-nous
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}

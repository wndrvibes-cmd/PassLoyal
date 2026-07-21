import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingFaq } from "@/lib/content/faq";

export function PricingFaq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-secondary/40 py-24 sm:py-32">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ tarifs"
          title="Des questions sur nos offres ?"
        />

        <RevealOnScroll className="mt-14">
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border border-border bg-white px-6 shadow-soft sm:px-8"
          >
            {pricingFaq.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

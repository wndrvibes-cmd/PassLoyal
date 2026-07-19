import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactFaq } from "@/lib/content/faq";

export function ContactFaq() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Questions fréquentes
      </p>
      <Accordion type="single" collapsible className="mt-4 rounded-2xl border border-border bg-white px-5 shadow-soft">
        {contactFaq.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
            <AccordionContent className="text-sm">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

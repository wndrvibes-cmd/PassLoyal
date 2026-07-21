"use client";

import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generalFaq, pricingFaq, securityFaq } from "@/lib/content/faq";

const categories = [
  { value: "general", label: "Général", items: generalFaq },
  { value: "tarifs", label: "Tarifs", items: pricingFaq },
  { value: "securite", label: "Sécurité", items: securityFaq },
];

export function FaqCategories() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="max-w-3xl">
        <RevealOnScroll>
          <Tabs defaultValue="general" className="flex flex-col items-center">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} className="w-full">
                <Accordion
                  type="single"
                  collapsible
                  className="rounded-3xl border border-border bg-white px-6 shadow-soft sm:px-8"
                >
                  {category.items.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une démo à demander ? Contactez l'équipe PassLoyal par formulaire, e-mail ou téléphone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre programme de fidélité"
        description="Une question sur nos offres, une démo à demander ? Notre équipe vous répond sous 24h ouvrées."
      />

      <section className="bg-white py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <RevealOnScroll>
            <ContactForm />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex flex-col gap-8">
            <ContactInfo />
            <MapEmbed />
            <ContactFaq />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}

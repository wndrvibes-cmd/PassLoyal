import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { PricingCards } from "@/components/tarifs/PricingCards";
import { ComparisonTable } from "@/components/tarifs/ComparisonTable";
import { PricingFaq } from "@/components/tarifs/PricingFaq";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Des offres simples et sans engagement pour lancer votre programme de fidélité Apple Wallet et Google Wallet : Starter, Pro et Enterprise.",
  alternates: { canonical: "/tarifs" },
};

export default function TarifsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tarifs"
        title="Une offre pour chaque étape de votre croissance"
        description="Sans engagement, sans frais cachés. Changez d'offre à tout moment selon vos besoins."
      />
      <PricingCards />
      <ComparisonTable />
      <PricingFaq />
      <CtaFinal />
    </>
  );
}

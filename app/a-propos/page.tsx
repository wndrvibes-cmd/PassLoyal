import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Story } from "@/components/a-propos/Story";
import { Mission } from "@/components/a-propos/Mission";
import { Values } from "@/components/a-propos/Values";
import { WhyUs } from "@/components/home/WhyUs";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire, la mission et les valeurs de PassLoyal, la plateforme française de cartes de fidélité Apple Wallet et Google Wallet.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Nous construisons la référence française de la fidélité digitale"
        description="Une petite équipe, une conviction simple : la fidélisation client ne devrait jamais être une contrainte."
      />
      <Story />
      <Mission />
      <Values />
      <WhyUs />
      <CtaFinal />
    </>
  );
}

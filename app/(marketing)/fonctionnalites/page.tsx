import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { FeatureTour } from "@/components/fonctionnalites/FeatureTour";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Apple Wallet, Google Wallet, QR code, notifications push et statistiques en temps réel : découvrez tout ce que PassLoyal apporte à votre programme de fidélité.",
  alternates: { canonical: "/fonctionnalites" },
};

export default function FonctionnalitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Fonctionnalités"
        title="Une plateforme de fidélité complète, du Wallet aux statistiques"
        description="Chaque fonctionnalité de PassLoyal existe pour une seule raison : simplifier la fidélisation, pour vous comme pour vos clients."
      />
      <FeatureTour />
      <CtaFinal />
    </>
  );
}

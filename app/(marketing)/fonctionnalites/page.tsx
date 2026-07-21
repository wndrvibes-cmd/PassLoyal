import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { FeatureShowcase } from "@/components/fonctionnalites/FeatureShowcase";
import { FeatureListGrid } from "@/components/fonctionnalites/FeatureListGrid";
import { CtaFinal } from "@/components/home/CtaFinal";
import { features } from "@/lib/content/features";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Apple Wallet, Google Wallet, QR code, notifications push et statistiques en temps réel : découvrez tout ce que PassLoyal apporte à votre programme de fidélité.",
  alternates: { canonical: "/fonctionnalites" },
};

export default function FonctionnalitesPage() {
  const showcased = features.filter((f) => f.slug === "apple-wallet" || f.slug === "google-wallet");
  const rest = features.filter((f) => f.slug !== "apple-wallet" && f.slug !== "google-wallet");

  return (
    <>
      <PageHero
        eyebrow="Fonctionnalités"
        title="Une plateforme de fidélité complète, du Wallet aux statistiques"
        description="Chaque fonctionnalité de PassLoyal existe pour une seule raison : simplifier la fidélisation, pour vous comme pour vos clients."
      />
      <FeatureShowcase features={showcased} />
      <FeatureListGrid features={rest} />
      <CtaFinal />
    </>
  );
}

import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { FaqCategories } from "@/components/faq/FaqCategories";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes les réponses à vos questions sur PassLoyal : fonctionnement, tarifs, sécurité des données et compatibilité Apple Wallet et Google Wallet.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Toutes les réponses, classées par thème"
        description="Fonctionnement, tarifs, sécurité des données : retrouvez ici ce que les commerçants nous demandent le plus souvent."
      />
      <FaqCategories />
      <CtaFinal />
    </>
  );
}

import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { FaqCategories } from "@/components/faq/FaqCategories";
import { CtaFinal } from "@/components/home/CtaFinal";
import { generalFaq, pricingFaq, securityFaq } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes les réponses à vos questions sur PassLoyal : fonctionnement, tarifs, sécurité des données et compatibilité Apple Wallet et Google Wallet.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...generalFaq, ...pricingFaq, ...securityFaq].map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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

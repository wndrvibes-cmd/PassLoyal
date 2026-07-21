import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { DashboardShowcase } from "@/components/home/DashboardShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ClientJourney } from "@/components/home/ClientJourney";
import { WhyUs } from "@/components/home/WhyUs";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { FeatureShowcase } from "@/components/fonctionnalites/FeatureShowcase";
import { SectorsSection } from "@/components/home/SectorsSection";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { CtaFinal } from "@/components/home/CtaFinal";
import { site } from "@/lib/content/site";
import { features } from "@/lib/content/features";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const walletFeatures = features.filter(
  (f) => f.slug === "apple-wallet" || f.slug === "google-wallet"
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FeatureGrid />
      <HowItWorks />
      <ClientJourney />
      <DashboardShowcase />
      <FeatureShowcase features={walletFeatures} />
      <SectorsSection />
      <WhyUs />
      <ComparisonSection />
      <PricingTeaser />
      <FaqTeaser />
      <CtaFinal />
    </>
  );
}

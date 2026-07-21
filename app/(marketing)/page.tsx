import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { LogoCloud } from "@/components/home/LogoCloud";
import { DashboardShowcase } from "@/components/home/DashboardShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { FeatureShowcase } from "@/components/fonctionnalites/FeatureShowcase";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { CaseStudies } from "@/components/home/CaseStudies";
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
      <LogoCloud />
      <DashboardShowcase />
      <HowItWorks />
      <WhyUs />
      <FeatureGrid />
      <ComparisonSection />
      <FeatureShowcase features={walletFeatures} />
      <StatsBand />
      <CaseStudies />
      <Testimonials />
      <PricingTeaser />
      <FaqTeaser />
      <CtaFinal />
    </>
  );
}

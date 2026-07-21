import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { site } from "@/lib/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  keywords: [
    "carte de fidélité digitale",
    "Apple Wallet",
    "Google Wallet",
    "programme de fidélité commerçant",
    "fidélisation client",
    "carte de fidélité sans application",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sameAs = [site.social.linkedin, site.social.instagram, site.social.twitter].filter(
  (url): url is string => Boolean(url)
);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.address
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          postalCode: site.address.postalCode,
          addressLocality: site.address.city,
          addressCountry: "FR",
        },
      }
    : {}),
  ...(sameAs.length ? { sameAs } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

type Address = {
  line1: string;
  postalCode: string;
  city: string;
  country: string;
};

/**
 * The canonical site URL, resolved without ever guessing at a domain that
 * isn't actually live. passloyal.fr does not currently resolve (no DNS
 * records) — set NEXT_PUBLIC_SITE_URL once a real production domain is
 * confirmed. Falls back to the Vercel-provided deployment URL, then to
 * localhost for local dev, so canonical/OG/sitemap URLs are never wrong.
 */
function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "PassLoyal",
  tagline: "Le programme de fidélité digital pour les commerces modernes",
  description:
    "PassLoyal transforme votre programme de fidélité en carte Apple Wallet et Google Wallet. Sans application, sans carte plastique.",
  url: getSiteUrl(),
  // TODO: replace with a real, monitored inbox before launch.
  email: "contact@passloyal.fr",
  // TODO: fill in only once a real business line exists — never a placeholder number.
  phone: "",
  // TODO: fill in only once a real registered address exists — never a placeholder address.
  address: undefined as Address | undefined,
  social: {
    // TODO: add real profile URLs once they exist — never guess at a handle.
    linkedin: undefined as string | undefined,
    instagram: undefined as string | undefined,
    twitter: undefined as string | undefined,
  },
  legal: {
    // TODO: every field below is a placeholder — replace with real, verified
    // company information before this site goes into production.
    companyName: "[Raison sociale à compléter]",
    rcs: "[RCS à compléter]",
    siret: "[SIRET à compléter]",
    capital: "[Capital social à compléter]",
    directeurPublication: "Directeur de la publication : [à compléter]",
    hebergeur: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    },
  },
};

export const mainNav = [
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "FAQ", href: "/faq" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  produit: [
    { label: "Fonctionnalités", href: "/fonctionnalites" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "FAQ", href: "/faq" },
  ],
  entreprise: [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/legal/mentions-legales" },
    { label: "CGU", href: "/legal/cgu" },
    { label: "Confidentialité", href: "/legal/confidentialite" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
} as const;

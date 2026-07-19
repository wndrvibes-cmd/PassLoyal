import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/LegalLayout";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site PassLoyal.",
  alternates: { canonical: "/legal/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updatedAt="19 juillet 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site {site.url.replace("https://", "")} est édité par {site.legal.companyName},
          société immatriculée au {site.legal.rcs}, au capital social de {site.legal.capital},
          dont le numéro SIRET est {site.legal.siret}.
        </p>
        <p>
          Siège social : {site.address.line1}, {site.address.postalCode} {site.address.city},{" "}
          {site.address.country}.
        </p>
        <p>
          Contact : <a href={`mailto:${site.email}`}>{site.email}</a> — {site.phone}
        </p>
        <p>{site.legal.directeurPublication}.</p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par {site.legal.hebergeur.name}, {site.legal.hebergeur.address}.
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des éléments présents sur ce site (textes, illustrations, mises en page,
          logos, marques) sont la propriété exclusive de {site.legal.companyName}, sauf mention
          contraire. Toute reproduction, représentation ou diffusion, en tout ou partie, sans
          autorisation préalable est interdite et constituerait une contrefaçon.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          {site.legal.companyName} s'efforce d'assurer l'exactitude des informations diffusées
          sur ce site, mais ne saurait être tenue responsable des erreurs, omissions ou de
          l'indisponibilité temporaire du service.
        </p>
      </section>

      <section>
        <h2>Droit applicable</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. Tout litige relatif à
          leur interprétation ou leur exécution relève de la compétence des tribunaux français.
        </p>
      </section>
    </LegalLayout>
  );
}

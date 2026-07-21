import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/LegalLayout";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Politique de gestion des cookies du site PassLoyal.",
  alternates: { canonical: "/legal/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Politique de cookies" updatedAt="19 juillet 2026">
      <section>
        <h2>Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un
          site web, permettant de reconnaître votre navigateur ou de mémoriser certaines
          informations.
        </p>
      </section>

      <section>
        <h2>Cookies utilisés sur ce site</h2>
        <p>
          Ce site vitrine ne dépose aucun cookie de suivi, publicitaire ou de mesure d'audience à
          ce jour. Il ne comporte ni système de compte, ni back-office, ni traitement de données
          nécessitant un consentement préalable.
        </p>
        <p>
          Si des outils de mesure d'audience ou des cookies fonctionnels venaient à être ajoutés
          ultérieurement, cette page sera mise à jour et un bandeau de consentement conforme à la
          réglementation vous sera présenté.
        </p>
      </section>

      <section>
        <h2>Gestion des cookies</h2>
        <p>
          Vous pouvez à tout moment configurer votre navigateur pour refuser l'installation de
          cookies. Cette configuration s'effectue dans les paramètres de confidentialité de
          chaque navigateur.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question relative à cette politique, contactez-nous à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}

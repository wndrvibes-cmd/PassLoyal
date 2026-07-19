import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/LegalLayout";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données de PassLoyal.",
  alternates: { canonical: "/legal/confidentialite" },
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updatedAt="19 juillet 2026">
      <section>
        <h2>1. Données collectées</h2>
        <p>
          Lorsque vous utilisez notre formulaire de contact, votre client de messagerie s'ouvre
          avec un message pré-rempli à destination de {site.email} : aucune donnée n'est
          transmise ni stockée par notre site à cette occasion. Les seules données que nous
          recevons sont celles que vous choisissez d'envoyer par e-mail.
        </p>
      </section>

      <section>
        <h2>2. Finalité du traitement</h2>
        <p>
          Les informations que vous nous transmettez par e-mail sont utilisées exclusivement pour
          répondre à votre demande (information, démonstration, souscription à une offre).
        </p>
      </section>

      <section>
        <h2>3. Durée de conservation</h2>
        <p>
          Les échanges e-mail sont conservés le temps nécessaire au traitement de votre demande,
          puis archivés ou supprimés conformément à nos obligations légales.
        </p>
      </section>

      <section>
        <h2>4. Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
          d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
          Pour exercer ces droits, contactez-nous à l'adresse{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>

      <section>
        <h2>5. Hébergement</h2>
        <p>
          Le site est hébergé par {site.legal.hebergeur.name}, {site.legal.hebergeur.address}.
        </p>
      </section>
    </LegalLayout>
  );
}

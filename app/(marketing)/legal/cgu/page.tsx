import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/LegalLayout";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du service PassLoyal.",
  alternates: { canonical: "/legal/cgu" },
  robots: { index: false, follow: true },
};

export default function CguPage() {
  return (
    <LegalLayout title="Conditions générales d'utilisation" updatedAt="19 juillet 2026">
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions générales d'utilisation (« CGU ») régissent l'accès et
          l'utilisation du site {site.url.replace("https://", "")} ainsi que du service
          PassLoyal, une plateforme permettant aux commerçants de créer des cartes de fidélité
          numériques compatibles Apple Wallet et Google Wallet.
        </p>
      </section>

      <section>
        <h2>2. Accès au service</h2>
        <p>
          L'accès au site vitrine est libre et gratuit. La souscription à une offre PassLoyal
          (Starter, Pro ou Enterprise) fait l'objet d'un contrat distinct, conclu après échange
          avec notre équipe commerciale.
        </p>
      </section>

      <section>
        <h2>3. Obligations de l'utilisateur</h2>
        <ul>
          <li>Fournir des informations exactes lors de toute demande de contact ou de démonstration.</li>
          <li>Utiliser le site conformément à sa destination et à la réglementation en vigueur.</li>
          <li>
            Ne pas porter atteinte au bon fonctionnement du site (introduction de virus, tentative
            d'intrusion, etc.).
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          Le contenu du site (textes, visuels, marque PassLoyal) reste la propriété exclusive de{" "}
          {site.legal.companyName}. Toute utilisation non autorisée est interdite.
        </p>
      </section>

      <section>
        <h2>5. Modification des CGU</h2>
        <p>
          {site.legal.companyName} se réserve le droit de modifier les présentes CGU à tout
          moment. Les utilisateurs seront informés de toute modification substantielle.
        </p>
      </section>

      <section>
        <h2>6. Droit applicable</h2>
        <p>
          Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux
          tribunaux français compétents.
        </p>
      </section>
    </LegalLayout>
  );
}

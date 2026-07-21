# PassLoyal

Site vitrine premium pour PassLoyal — cartes de fidélité digitales compatibles **Apple Wallet** et **Google Wallet**.

Le dépôt est organisé pour accueillir deux univers distincts sous un même projet Next.js :

- **`app/(marketing)`** — le site vitrine actuel, 100% statique : aucun compte, aucun dashboard connecté à des données, aucune base de données. Le formulaire de contact ouvre le client e-mail de l'utilisateur via un lien `mailto:` — aucune clé API n'est nécessaire. Le tableau de bord affiché sur l'accueil est un mockup illustratif, à but purement marketing.
- **`app/(dashboard)`** — réservé pour la future application SaaS (authentification, gestion des cartes, statistiques réelles…). Actuellement vide : structure de dossiers uniquement, aucune fonctionnalité développée. Voir [app/(dashboard)/README.md](app/(dashboard)/README.md).

Stack : **Next.js 15 (App Router)** · React 19 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui (primitives Radix) · lucide-react · police Geist.

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

Aucune variable d'environnement n'est requise pour faire tourner le site vitrine en local. En production, définis `NEXT_PUBLIC_SITE_URL` (ex. `https://passloyal.fr`) dès qu'un vrai domaine est actif — sans cette variable, le site retombe sur l'URL de déploiement Vercel puis sur `localhost`, jamais sur un domaine deviné (voir `lib/content/site.ts`).

## Structure

```
app/
  layout.tsx                Layout racine global (html/body, polices, métadonnées, JSON-LD) — commun à tous les groupes de routes
  not-found.tsx              404 personnalisée (auto-suffisante : inclut son propre Navbar/Footer)
  sitemap.ts, robots.ts, opengraph-image.tsx

  (marketing)/               Groupe de routes du site vitrine — ne change aucune URL (/, /fonctionnalites, /tarifs…)
    layout.tsx                Ajoute Navbar + Footer autour des pages vitrine
    page.tsx                   Accueil
    fonctionnalites/           Page fonctionnalités
    tarifs/                    Page tarifs
    faq/                       Page FAQ (par thème)
    a-propos/                  Page à propos
    contact/                    Page contact
    legal/                      Mentions légales, CGU, confidentialité, cookies

  (dashboard)/                Réservé pour la future application SaaS — vide, voir son README

components/
  layout/                    Navbar, Footer, Logo
  home/                      Sections de la page d'accueil
  fonctionnalites/, tarifs/, a-propos/, contact/, faq/   Sections propres à chaque page vitrine
  shared/                    Container, SectionHeading, RevealOnScroll, PhoneMockup, PageHero, LegalLayout
  ui/                        Design system shadcn/ui — primitives à plat (button, badge, accordion, tabs, input, textarea, label) + sous-dossiers réservés pour les futures catégories (tables, charts, dialogs, forms, animations, icons), voir components/ui/README.md

lib/
  content/                   Contenu du site vitrine, typé (site, features, pricing, faq, misc, sectors) — aucune fausse preuve sociale : pas de témoignages ni de logos clients tant qu'ils ne sont pas réels
  utils.ts                   Helper cn()

hooks/                       Réservé pour les hooks React de la future application SaaS — vide
types/                       Réservé pour les types partagés de la future application SaaS — vide
services/                    Réservé pour l'intégration Auth/Stripe/Supabase/Wallet/Webhooks/etc. — vide, voir services/README.md
```

## Contenu à personnaliser avant mise en production

Tout le contenu texte du site vitrine vit dans `lib/content/*.ts`.

`lib/content/site.ts` marque explicitement (commentaires `TODO`) tout ce qui reste un **placeholder à remplacer par de vraies informations** — jamais un faux numéro plausible, un champ vide ou masqué le temps qu'une vraie valeur existe :

- `phone`, `address`, `social.*` — vides tant qu'aucune vraie valeur n'existe ; les composants (`Footer`, `ContactInfo`, JSON-LD) masquent automatiquement ce qui n'est pas renseigné plutôt que d'afficher un faux numéro/adresse
- `legal.*` (SIRET, RCS, capital, raison sociale) — littéralement `"[À compléter]"` sur les pages légales tant que l'entreprise n'est pas immatriculée
- `email` — à remplacer par une vraie boîte surveillée avant lancement (le domaine `passloyal.fr` ne résout pas encore)
- `lib/content/pricing.ts` — grille tarifaire Starter / Pro / Enterprise (prix actuels conservés tels quels, ne pas modifier sans validation)
- `app/(marketing)/legal/**` — mentions légales, CGU, confidentialité, cookies (contenu indicatif, à faire valider par un professionnel du droit)

## Prochaine étape : l'application SaaS

Les dossiers `app/(dashboard)/`, `services/`, `hooks/` et `types/` sont des coquilles vides et documentées, prêtes à accueillir la reconstruction de l'application (authentification, Stripe, Supabase, émission Apple/Google Wallet, etc.) sans toucher au site vitrine. Aucune de ces fonctionnalités n'est encore implémentée.

## Build & déploiement

```bash
npm run build
npm run lint
```

Déployé sur Vercel.

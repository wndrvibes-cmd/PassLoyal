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

Aucune variable d'environnement n'est requise pour faire tourner le site vitrine.

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
  ui/                        Design system shadcn/ui — primitives à plat (button, card, badge, accordion, tabs, input, textarea, label) + sous-dossiers réservés pour les futures catégories (tables, charts, dialogs, forms, animations, icons), voir components/ui/README.md

lib/
  content/                   Contenu du site vitrine, typé (site, features, pricing, testimonials, faq, misc, caseStudies)
  utils.ts                   Helper cn()

hooks/                       Réservé pour les hooks React de la future application SaaS — vide
types/                       Réservé pour les types partagés de la future application SaaS — vide
services/                    Réservé pour l'intégration Auth/Stripe/Supabase/Wallet/Webhooks/etc. — vide, voir services/README.md
```

## Contenu à personnaliser

Tout le contenu texte du site vitrine (coordonnées, tarifs, témoignages, mentions légales) vit dans `lib/content/*.ts` et utilise volontairement des valeurs plausibles à remplacer :

- `lib/content/site.ts` — nom, adresse, e-mail, téléphone, réseaux sociaux, informations légales (SIRET, RCS…)
- `lib/content/pricing.ts` — grille tarifaire Starter / Pro / Enterprise
- `app/(marketing)/legal/**` — mentions légales, CGU, confidentialité, cookies (contenu indicatif, à faire valider par un professionnel du droit)

## Prochaine étape : l'application SaaS

Les dossiers `app/(dashboard)/`, `services/`, `hooks/` et `types/` sont des coquilles vides et documentées, prêtes à accueillir la reconstruction de l'application (authentification, Stripe, Supabase, émission Apple/Google Wallet, etc.) sans toucher au site vitrine. Aucune de ces fonctionnalités n'est encore implémentée.

## Build & déploiement

```bash
npm run build
npm run lint
```

Déployé sur Vercel.

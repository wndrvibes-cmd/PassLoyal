# PassLoyal

Site vitrine premium pour PassLoyal — cartes de fidélité digitales compatibles **Apple Wallet** et **Google Wallet**.

C'est un site 100% vitrine : aucun compte, aucun dashboard, aucun back-office, aucune base de données. Le formulaire de contact est statique (il ouvre le client e-mail de l'utilisateur via un lien `mailto:`) — aucune clé API n'est nécessaire.

Stack : **Next.js 15 (App Router)** · React 19 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui (primitives Radix) · lucide-react · police Geist.

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

Aucune variable d'environnement n'est requise pour faire tourner le site.

## Structure

```
app/
  page.tsx                 Accueil
  fonctionnalites/         Page fonctionnalités
  tarifs/                  Page tarifs
  a-propos/                Page à propos
  contact/                 Page contact
  legal/                   Mentions légales, CGU, confidentialité, cookies
  sitemap.ts, robots.ts, opengraph-image.tsx

components/
  layout/                  Navbar, Footer, Logo
  home/                    Sections de la page d'accueil
  fonctionnalites/, tarifs/, a-propos/, contact/   Sections propres à chaque page
  shared/                  Container, SectionHeading, RevealOnScroll, PhoneMockup, PageHero, LegalLayout
  ui/                      Primitives shadcn/ui (button, card, badge, accordion, tabs, input, textarea, label, separator)

lib/
  content/                 Contenu du site typé (site, features, pricing, testimonials, faq, misc)
  utils.ts                 Helper cn()
```

## Contenu à personnaliser

Tout le contenu texte (coordonnées, tarifs, témoignages, mentions légales) vit dans `lib/content/*.ts` et utilise volontairement des valeurs plausibles à remplacer :

- `lib/content/site.ts` — nom, adresse, e-mail, téléphone, réseaux sociaux, informations légales (SIRET, RCS…)
- `lib/content/pricing.ts` — grille tarifaire Starter / Pro / Enterprise
- `app/legal/**` — mentions légales, CGU, confidentialité, cookies (contenu indicatif, à faire valider par un professionnel du droit)

## Build & déploiement

```bash
npm run build
npm run lint
```

Déployé sur Vercel.

# PassLoyal

La fidélité digitale pour commerçants modernes. Cartes de fidélité compatibles **Apple Wallet** et **Google Wallet**, suivi des points, récompenses et tableau de bord en temps réel.

Stack : **Next.js 15 (App Router)** · React 19 · TypeScript · Tailwind CSS · Framer Motion · lucide-react.

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Arborescence

```
app/                  Routes App Router (layout, page, globals.css)
components/
  layout/             Navbar, Footer
  landing/            Sections de la landing page
  ui/                 Composants UI réutilisables (à venir)
lib/                  Helpers (utils.ts → cn())
hooks/                Hooks React personnalisés
services/             Appels API / logique métier
supabase/             Client & schémas Supabase
types/                Types TypeScript partagés
utils/                Fonctions utilitaires diverses
public/               Assets statiques (images, icons, logos)
styles/               Styles additionnels
```

## Alias d'import

`@/*` pointe vers la racine du projet (voir `tsconfig.json`).
Exemples : `@/components/layout/Navbar`, `@/lib/utils`.

## Chapitre 1 — Landing page

Composants livrés et intégrés :

| Composant          | Emplacement                              |
| ------------------ | ---------------------------------------- |
| Navbar             | `components/layout/Navbar.tsx`           |
| Footer             | `components/layout/Footer.tsx`           |
| Hero               | `components/landing/Hero.tsx`            |
| TrustedBrands      | `components/landing/TrustedBrands.tsx`   |
| Features           | `components/landing/Features.tsx`        |
| HowItWorks         | `components/landing/HowItWorks.tsx`      |
| Benefits           | `components/landing/Benefits.tsx`        |
| DashboardPreview   | `components/landing/DashboardPreview.tsx`|
| Pricing            | `components/landing/Pricing.tsx`         |
| Testimonials       | `components/landing/Testimonials.tsx`    |
| FAQ                | `components/landing/FAQ.tsx`             |
| CTA                | `components/landing/CTA.tsx`             |

> `app/page.tsx` monte actuellement `Navbar`, `Hero` et `Footer` (code fourni conservé tel quel). Les autres sections sont présentes dans le dépôt et prêtes à être ajoutées à la page quand tu le souhaites.

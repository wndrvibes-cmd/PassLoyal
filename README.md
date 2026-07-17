# PassLoyal

La fidélité digitale pour commerçants modernes. Cartes de fidélité compatibles **Apple Wallet** et **Google Wallet**, suivi des points, récompenses et tableau de bord en temps réel.

Stack : **Next.js 15 (App Router)** · React 19 · TypeScript · Tailwind CSS · Framer Motion · lucide-react · Supabase.

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

### Configuration Supabase

Copie `.env.local.example` vers `.env.local` et renseigne tes clés (Settings > API dans ton projet Supabase) :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Tant que ces clés ne sont pas définies, `middleware.ts` laisse passer toutes les routes sans vérifier de session — pratique pour développer l'UI avant de brancher Supabase.

## Arborescence

```
app/                  Routes App Router (layout, page, globals.css)
  login/               Page de connexion
  register/            Page d'inscription
  forgot-password/     Page de réinitialisation du mot de passe
  dashboard/           Tableau de bord marchand (layout + page)
components/
  layout/             Navbar, Footer
  landing/            Sections de la landing page
  auth/               LoginForm, RegisterForm, ForgotPasswordForm, AuthShell
  dashboard/          Sidebar, Header, StatsCards, RecentActivity, QuickActions
  ui/                 Composants UI réutilisables (à venir)
lib/                  Helpers (utils.ts → cn(), supabase.ts → clients Supabase)
hooks/                Hooks React personnalisés
services/             Appels API / logique métier
supabase/             Client & schémas Supabase
types/                Types TypeScript partagés
utils/                Fonctions utilitaires diverses
public/               Assets statiques (images, icons, logos)
styles/               Styles additionnels
middleware.ts          Protection des routes /dashboard et redirections auth
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

> `app/page.tsx` monte toutes les sections ci-dessus, dans l'ordre du tableau.

## Chapitre 2 — Authentification & Dashboard

Composants livrés :

| Composant            | Emplacement                                    |
| --------------------- | ----------------------------------------------- |
| AuthShell             | `components/auth/AuthShell.tsx`                 |
| LoginForm             | `components/auth/LoginForm.tsx`                 |
| RegisterForm          | `components/auth/RegisterForm.tsx`              |
| ForgotPasswordForm    | `components/auth/ForgotPasswordForm.tsx`        |
| Sidebar               | `components/dashboard/Sidebar.tsx`              |
| Header                | `components/dashboard/Header.tsx`               |
| StatsCards            | `components/dashboard/StatsCards.tsx`           |
| RecentActivity        | `components/dashboard/RecentActivity.tsx`       |
| QuickActions          | `components/dashboard/QuickActions.tsx`         |

Pages : `/login`, `/register`, `/forgot-password`, `/dashboard`.

L'authentification (email/mot de passe, inscription, connexion, déconnexion, réinitialisation) est câblée via `lib/supabase.ts` et prête à fonctionner dès que les clés Supabase sont renseignées dans `.env.local`. Les données du tableau de bord (`StatsCards`, `RecentActivity`) sont pour l'instant statiques — elles seront branchées sur Supabase dans un prochain chapitre.

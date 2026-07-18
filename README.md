# PassLoyal

La fidélité digitale pour commerçants modernes. Cartes de fidélité compatibles **Apple Wallet** et **Google Wallet**, suivi des points, récompenses et tableau de bord en temps réel.

Stack : **Next.js 15 (App Router)** · React 19 · TypeScript · Tailwind CSS · Framer Motion · lucide-react · Supabase · recharts · papaparse · xlsx · qrcode · qr-scanner · jsonwebtoken.

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

### Apple Wallet / Google Wallet (optionnel)

La génération de vraies cartes Apple/Google Wallet nécessite des identifiants que ce projet ne peut pas générer lui-même :

```
# Apple Wallet — certificats Apple Developer Program (payant)
APPLE_PASS_TYPE_IDENTIFIER=
APPLE_TEAM_IDENTIFIER=
APPLE_PASS_CERTIFICATE=
APPLE_PASS_CERTIFICATE_KEY=
APPLE_WWDR_CERTIFICATE=

# Google Wallet — compte de service Google Cloud avec l'API Wallet Objects
GOOGLE_WALLET_ISSUER_ID=
GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL=
GOOGLE_WALLET_PRIVATE_KEY=
```

Tant qu'elles ne sont pas configurées, les boutons « Ajouter à Apple/Google Wallet » affichent une erreur claire au lieu d'échouer silencieusement. Voir `lib/wallet/apple.ts` et `lib/wallet/google.ts` pour le détail de l'intégration prévue.

### Base de données

Applique les migrations dans l'ordre sur ton projet Supabase (SQL editor, ou `supabase db push` avec la CLI) :

1. `supabase/migrations/20260717000000_merchants_and_loyalty_programs.sql` — tables `merchants` et `loyalty_programs`.
2. `supabase/migrations/20260717010000_customers_crm.sql` — tables `customers`, `customer_visits`, `rewards_history` (dépend de la première).
3. `supabase/migrations/20260717020000_wallet.sql` — tables `wallet_card_designs`, `wallet_passes`, `wallet_scans`, `notifications`, plus deux fonctions `SECURITY DEFINER` (`get_public_wallet_card`, `mark_wallet_pass_added`) pour la page publique `/wallet/[token]`.

Toutes activent Row Level Security avec des policies propriétaire-only (un commerçant ne voit et ne modifie que ses propres données).

## Arborescence

```
app/                  Routes App Router (layout, page, globals.css)
  login/               Page de connexion
  register/            Page d'inscription
  forgot-password/     Page de réinitialisation du mot de passe
  wallet/[token]/       Carte de fidélité publique (pas d'auth) — Add to Wallet
  api/wallet/           Routes .pkpass (Apple) et lien de sauvegarde (Google)
  dashboard/           Tableau de bord marchand (layout + page)
    programs/           Gestion des programmes de fidélité
    customers/           CRM clients (liste + /[id] fiche client)
    wallet/              Design de la carte + statistiques Wallet
    scanner/             Scanner QR Code (caméra + saisie manuelle)
components/
  layout/             Navbar, Footer
  landing/            Sections de la landing page
  auth/               LoginForm, RegisterForm, ForgotPasswordForm, AuthShell
  dashboard/          Sidebar, Header, StatsCards, RecentActivity, QuickActions,
                      CustomerInsights
  programs/           ProgramList, ProgramCard, ProgramForm, ProgramSettings,
                      ProgramPreview, DeleteProgramDialog, EmptyState
  customers/          CustomerCard, CustomerTable, CustomerForm, CustomerDetails,
                      CustomerHistory, CustomerFilters, CustomerStats,
                      CustomerEmptyState, DeleteCustomerDialog, ImportCustomers,
                      ExportCustomers
  wallet/             CardDesignForm, CardPreview, QRCodeCard, WalletStats,
                      ScannerView, AddToWalletButtons
  ui/                 Composants UI réutilisables (Skeleton, …)
lib/                  Helpers (utils.ts → cn())
  supabase/             client.ts (navigateur) et server.ts (Server Components)
  validations/         Schémas de validation zod (program.ts, customer.ts,
                      walletCardDesign.ts)
  wallet/               apple.ts, google.ts — intégrations Apple/Google Wallet
hooks/                Hooks React personnalisés (usePrograms, useCustomers,
                      useCustomerHistory, useWalletCardDesign, useWalletPass)
services/             Appels API / logique métier (programs.ts, customers.ts,
                      wallet.ts, notifications.ts → CRUD Supabase)
supabase/
  migrations/          Schéma SQL + Row Level Security
types/                Types TypeScript partagés (database.ts)
utils/                Fonctions utilitaires diverses
public/               Assets statiques (images, icons, logos)
styles/               Styles additionnels
middleware.ts          Protection des routes /dashboard et redirections auth
                      (/wallet/[token] et /api/wallet/* restent publiques)
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

L'authentification (email/mot de passe, inscription, connexion, déconnexion, réinitialisation) est câblée via `lib/supabase/client.ts` et prête à fonctionner dès que les clés Supabase sont renseignées dans `.env.local`. Les données du tableau de bord (`StatsCards`, `RecentActivity`) sont pour l'instant statiques — elles seront branchées sur Supabase dans un prochain chapitre.

## Chapitre 3 — Programmes de fidélité

Composants livrés :

| Composant             | Emplacement                                       |
| ---------------------- | -------------------------------------------------- |
| ProgramList            | `components/programs/ProgramList.tsx`              |
| ProgramCard            | `components/programs/ProgramCard.tsx`              |
| ProgramForm            | `components/programs/ProgramForm.tsx`              |
| ProgramSettings        | `components/programs/ProgramSettings.tsx`          |
| ProgramPreview         | `components/programs/ProgramPreview.tsx`           |
| DeleteProgramDialog    | `components/programs/DeleteProgramDialog.tsx`      |
| EmptyState             | `components/programs/EmptyState.tsx`               |

Page : `/dashboard/programs`.

Un commerçant peut créer, modifier, dupliquer, activer/désactiver et supprimer des programmes de fidélité (carte à points, à tampons, ou récompense personnalisée), avec aperçu Apple Wallet / Google Wallet en temps réel pendant la saisie. Toutes les opérations passent par `services/programs.ts` (CRUD Supabase) et sont validées côté client avec `lib/validations/program.ts` (zod). `hooks/usePrograms.ts` centralise le chargement des données pour éviter toute duplication entre `ProgramList` et `StatsCards`. Les actions déclenchent des toasts (`sonner`) et affichent des skeletons pendant le chargement.

`StatsCards` sur `/dashboard` affiche des données réelles issues de Supabase (nombre de programmes, programme actif, dernière modification, statut Apple/Google Wallet).

## Chapitre 4 — CRM clients

Composants livrés :

| Composant             | Emplacement                                       |
| ---------------------- | -------------------------------------------------- |
| CustomerCard           | `components/customers/CustomerCard.tsx`            |
| CustomerTable          | `components/customers/CustomerTable.tsx`           |
| CustomerForm           | `components/customers/CustomerForm.tsx`            |
| CustomerDetails        | `components/customers/CustomerDetails.tsx`         |
| CustomerHistory        | `components/customers/CustomerHistory.tsx`         |
| CustomerFilters        | `components/customers/CustomerFilters.tsx`         |
| CustomerStats          | `components/customers/CustomerStats.tsx`           |
| CustomerEmptyState     | `components/customers/CustomerEmptyState.tsx`      |
| DeleteCustomerDialog   | `components/customers/DeleteCustomerDialog.tsx`    |
| ImportCustomers        | `components/customers/ImportCustomers.tsx`         |
| ExportCustomers        | `components/customers/ExportCustomers.tsx`         |
| CustomerInsights       | `components/dashboard/CustomerInsights.tsx`        |

Pages : `/dashboard/customers` (liste, filtres, stats, import/export) et `/dashboard/customers/[id]` (fiche client complète).

Un commerçant peut ajouter, modifier, supprimer, activer/désactiver, rechercher, trier et filtrer (niveau de fidélité, points, visites, date d'inscription) ses clients. La fiche client affiche toutes ses informations, ses statistiques et un historique chronologique complet (visites, points ajoutés/retirés manuellement, récompenses échangées), avec un panneau permettant d'ajouter/retirer des points, d'ajouter une récompense, et d'annuler n'importe quelle opération (suppression de la ligne, les totaux du client se recalculent automatiquement côté base de données). L'import CSV valide chaque ligne et ignore les doublons par email ; l'export propose CSV et Excel. `CustomerStats` inclut deux graphiques interactifs (recharts) et un top 10.

Deux écarts volontaires par rapport au schéma fourni, documentés dans la migration SQL :
- `customers.is_active` (booléen) — nécessaire pour « désactiver un client » sans le supprimer.
- `customer_visits.source` (`visit` | `manual`) — distingue une vraie visite d'un ajustement manuel de points, pour que « nombre de visites » reste exact.

Aucune colonne de photo n'a été ajoutée (non listée dans le schéma fourni) : `CustomerCard` et `CustomerDetails` affichent des initiales à la place.

## Audit — Correction de bugs (post-Chapitre 4)

Un audit complet, testé sur le déploiement de production, a révélé et corrigé :

- **Cause racine critique** : `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` ne sont pas configurées sur Vercel. `createSupabaseBrowserClient()` lève alors une exception synchrone (« Your project's URL and API key are required… ») à la construction du client. **À corriger côté utilisateur** : ajouter ces deux variables dans Vercel → Project Settings → Environment Variables, puis redéployer.
- **Bug systémique** : cette exception était appelée hors de tout `try/catch` sur ~22 sites d'appel dans toute l'app (formulaires auth, hooks de données, actions CRUD programmes/clients), ce qui laissait boutons et écrans bloqués indéfiniment en chargement, sans aucun message d'erreur. C'est la cause réelle du bouton « Créer un compte » qui semblait ne rien faire. Corrigé partout : le client Supabase est maintenant créé à l'intérieur du bloc `try`, avec un message d'erreur visible (toast ou texte) en cas d'échec.
- **Navbar** : « Connexion » et « Créer un compte » pointaient vers des ancres mortes (`#connexion`, `#creer-un-compte`) au lieu de `/login` et `/register`.
- **Ancres de la landing page** : aucune section n'avait d'`id` correspondant à `#fonctionnalites`, `#tarifs`, `#demo`, `#faq` — ajoutés sur `Features`, `Pricing`, `DashboardPreview`, `FAQ`. `#contact` n'ayant pas de section dédiée, remplacé par un lien `mailto:`.
- **Boutons inertes** : les CTA de `CTA.tsx` et les 3 boutons de `Pricing.tsx` n'avaient ni `href` ni `onClick` — ils ne faisaient rien. Convertis en liens vers `/register` (et `#demo`).
- **Footer** : les liens sans destination réelle (À propos, Carrières, Blog, Centre d'aide, Documentation, etc., + réseaux sociaux) sont maintenant du texte non cliquable plutôt que des liens `href="#"` trompeurs — créer ce contenu (pages légales, blog…) est hors du périmètre d'une correction de bugs.
- **Navigation dashboard cassée** : `QuickActions` pointait vers `/dashboard/clients` (inexistant) au lieu de `/dashboard/customers`. `Sidebar`, `QuickActions` et `Header` pointaient vers `/dashboard/recompenses` et `/dashboard/parametres`, qui n'existaient pas (404). Deux pages « Bientôt disponible » ont été créées pour ces routes.

## Chapitre 5 — Apple Wallet, Google Wallet & QR Code intelligent

Composants livrés :

| Composant             | Emplacement                                     |
| ---------------------- | ------------------------------------------------ |
| CardDesignForm         | `components/wallet/CardDesignForm.tsx`            |
| CardPreview            | `components/wallet/CardPreview.tsx`               |
| QRCodeCard             | `components/wallet/QRCodeCard.tsx`                |
| WalletStats            | `components/wallet/WalletStats.tsx`               |
| ScannerView            | `components/wallet/ScannerView.tsx`               |
| AddToWalletButtons     | `components/wallet/AddToWalletButtons.tsx`        |

Pages : `/dashboard/wallet` (design de la carte + stats), `/dashboard/scanner` (scan caméra + saisie manuelle), `/wallet/[token]` (carte publique, sans authentification — c'est le lien que le client ouvre sur son téléphone).

Chaque client obtient automatiquement une carte Wallet (`wallet_passes`, un token unique) dès que le commerçant a configuré sa carte sur `/dashboard/wallet`. Le QR Code encode l'URL publique de la carte ; le scanner du dashboard décode ce QR (caméra via `qr-scanner`, avec repli en saisie manuelle), identifie le client, et permet d'ajouter/retirer des points ou de valider une récompense — en réutilisant directement `services/customers.ts` du Chapitre 4. Chaque scan est journalisé (`wallet_scans`) avec une fenêtre anti-doublon de 5 secondes, et apparaît dans l'historique du client aux côtés des visites et récompenses.

La page publique `/wallet/[token]` n'utilise **aucun accès direct** aux tables `customers`/`wallet_passes` pour les visiteurs anonymes : elle passe par une fonction Postgres `SECURITY DEFINER` (`get_public_wallet_card`) qui ne renvoie que les colonnes nécessaires à l'affichage de la carte (nom, points, niveau, design) — jamais l'email, le téléphone ou la date de naissance du client. Marquer une carte comme ajoutée à Apple/Google Wallet passe par une seconde fonction du même type (`mark_wallet_pass_added`), elle aussi strictement scoping par token exact.

**Apple Wallet et Google Wallet** : l'architecture complète est en place (`lib/wallet/apple.ts`, `lib/wallet/google.ts`, routes `app/api/wallet/{apple,google}/[token]/route.ts`) mais aucune des deux plateformes ne peut fonctionner sans identifiants que je ne peux pas générer :
- **Apple Wallet** nécessite un compte Apple Developer Program (payant) et des certificats Pass Type ID + WWDR — la génération de `.pkpass` reste un point d'intégration clairement identifié (voir le commentaire en tête de `lib/wallet/apple.ts`), pas encore implémentée.
- **Google Wallet** est plus simple (pas de signature binaire, juste un JWT signé) — le code de `lib/wallet/google.ts` est **entièrement fonctionnel**, il ne manque que les identifiants d'un compte de service Google Cloud (`GOOGLE_WALLET_*`, voir plus haut) et la création ponctuelle d'une classe de fidélité via l'API Wallet Objects.

Tant que ces variables ne sont pas configurées, les boutons « Ajouter à Apple/Google Wallet » affichent un message d'erreur clair (HTTP 501) plutôt que d'échouer silencieusement.

**Notifications** : architecture posée (table `notifications`, `services/notifications.ts`) et déclenchée automatiquement lors d'un ajout de points ou d'une récompense débloquée. Aucun canal de livraison (push, email, SMS) n'est branché — c'est un journal en base, pas encore une notification réellement envoyée, comme demandé (« préparer une architecture »).

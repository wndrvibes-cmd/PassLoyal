# components/ui — design system

Les primitives existantes (`button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `accordion.tsx`, `tabs.tsx`) restent **à plat** dans ce dossier : c'est la convention shadcn/ui standard, et elles sont déjà importées dans une quinzaine de fichiers — les déplacer dans des sous-dossiers casserait ces imports sans bénéfice fonctionnel.

Les sous-dossiers suivants sont réservés pour les catégories qui n'existent pas encore, à construire au fil des besoins du futur dashboard SaaS :

| Dossier | Contenu prévu |
|---|---|
| `tables/` | Tables de données (clients, transactions…) |
| `charts/` | Graphiques (statistiques de fidélisation) |
| `dialogs/` | Modales et drawers (`@radix-ui/react-dialog` à ajouter) |
| `forms/` | Compositions de champs de formulaire réutilisables |
| `animations/` | Primitives d'animation propres au dashboard |
| `icons/` | Wrappers d'icônes spécifiques au produit, au-delà de `lucide-react` |

`layout` et `navigation` n'ont volontairement pas de sous-dossier ici : ces primitives existent déjà dans `components/layout/` (Navbar, Footer, Logo) et `components/shared/` (Container, PageHero, LegalLayout) — en créer un doublon irait à l'encontre de la règle "aucun doublon".

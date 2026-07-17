import Link from "next/link";
import { Wallet, Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Navigation",
    links: [
      { label: "Fonctionnalités", href: "#fonctionnalites" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Démo", href: "#demo" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: null },
      { label: "Carrières", href: null },
      { label: "Blog", href: null },
      { label: "Contact", href: "mailto:contact@passloyal.fr" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Centre d'aide", href: null },
      { label: "Documentation", href: null },
      { label: "Statut du service", href: null },
      { label: "Contact commercial", href: null },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: null },
      { label: "Politique de confidentialité", href: null },
      { label: "CGU", href: null },
      { label: "Cookies", href: null },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { label: "Twitter (bientôt disponible)", icon: Twitter },
  { label: "LinkedIn (bientôt disponible)", icon: Linkedin },
  { label: "Instagram (bientôt disponible)", icon: Instagram },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="PassLoyal — accueil">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/30">
                <Wallet className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                PassLoyal
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              La fidélité digitale pensée pour les commerçants modernes. Cartes Apple Wallet
              et Google Wallet, sans friction, prêtes en quelques minutes.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-white text-slate-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-1">
              <h3 className="text-[13px] font-semibold text-slate-900">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-slate-500 transition-colors hover:text-slate-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <span
                        title="Bientôt disponible"
                        className="cursor-not-allowed text-[13.5px] text-slate-300"
                      >
                        {link.label}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row">
          <p className="text-[13px] text-slate-400">
            © {new Date().getFullYear()} PassLoyal. Tous droits réservés.
          </p>
          <p className="text-[13px] text-slate-400">
            Fait avec soin pour les commerçants qui fidélisent autrement.
          </p>
        </div>
      </div>
    </footer>
  );
}

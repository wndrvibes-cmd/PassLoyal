import Link from "next/link";
import { ArrowRight, Bell, Gift, UserPlus } from "lucide-react";

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: typeof UserPlus;
}

const ACTIONS: QuickAction[] = [
  {
    label: "Ajouter un client",
    description: "Créer une nouvelle fiche client",
    href: "/dashboard/customers",
    icon: UserPlus,
  },
  {
    label: "Créer une récompense",
    description: "Nouvelle offre ou réduction",
    href: "/dashboard/recompenses",
    icon: Gift,
  },
  {
    label: "Envoyer une notification",
    description: "Alerter vos clients Wallet",
    href: "/dashboard/parametres",
    icon: Bell,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">
        Actions rapides
      </h2>

      <ul className="mt-5 space-y-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <li key={action.label}>
              <Link
                href={action.href}
                className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:border-indigo-100 hover:bg-indigo-50/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/25">
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-slate-900">{action.label}</p>
                  <p className="text-[12px] text-slate-500">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

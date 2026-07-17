import { Award, Gift, ScanLine, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  name: string;
  action: string;
  time: string;
  icon: typeof UserPlus;
  accent: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "1",
    name: "Camille Dubois",
    action: "a gagné 40 points chez Café des Halles",
    time: "Il y a 2 min",
    icon: Award,
    accent: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "2",
    name: "Karim Belkacem",
    action: "a utilisé une récompense « Café offert »",
    time: "Il y a 18 min",
    icon: Gift,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "3",
    name: "Léa Martin",
    action: "a scanné sa carte de fidélité",
    time: "Il y a 34 min",
    icon: ScanLine,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    id: "4",
    name: "Nicolas Petit",
    action: "a rejoint le programme Maison Ferrand",
    time: "Il y a 1 h",
    icon: UserPlus,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    id: "5",
    name: "Sofia Rossi",
    action: "a atteint le niveau Or",
    time: "Il y a 2 h",
    icon: Award,
    accent: "bg-fuchsia-50 text-fuchsia-600",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">
          Activité récente
        </h2>
        <button
          type="button"
          className="text-[13px] font-medium text-indigo-600 hover:text-indigo-700"
        >
          Tout voir
        </button>
      </div>

      <ul className="mt-5 space-y-1">
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon;
          return (
            <li
              key={activity.id}
              className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  activity.accent
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] text-slate-700">
                  <span className="font-medium text-slate-900">{activity.name}</span>{" "}
                  {activity.action}
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">{activity.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

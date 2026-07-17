import { CreditCard, Footprints, Gift, TrendingDown, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: typeof Users;
  accent: string;
}

const STATS: Stat[] = [
  {
    label: "Clients",
    value: "4 812",
    delta: "+12,4%",
    trend: "up",
    icon: Users,
    accent: "from-indigo-500 to-blue-400",
  },
  {
    label: "Cartes actives",
    value: "3 265",
    delta: "+6,8%",
    trend: "up",
    icon: CreditCard,
    accent: "from-emerald-500 to-teal-400",
  },
  {
    label: "Visites",
    value: "18 940",
    delta: "+9,1%",
    trend: "up",
    icon: Footprints,
    accent: "from-amber-500 to-orange-400",
  },
  {
    label: "Récompenses",
    value: "1 204",
    delta: "-2,3%",
    trend: "down",
    icon: Gift,
    accent: "from-fuchsia-500 to-pink-400",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]"
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                  stat.accent
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-medium",
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                )}
              >
                <TrendIcon className="h-3 w-3" /> {stat.delta}
              </span>
            </div>
            <p className="mt-4 text-[13px] font-medium text-slate-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

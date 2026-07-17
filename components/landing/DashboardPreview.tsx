"use client";

import { motion } from "framer-motion";
import { Users, CreditCard, Footprints, Gift, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Clients", value: "2 481", change: "+12,4%", icon: Users },
  { label: "Cartes actives", value: "1 903", change: "+8,1%", icon: CreditCard },
  { label: "Visites ce mois", value: "6 742", change: "+21,6%", icon: Footprints },
  { label: "Récompenses", value: "312", change: "+5,9%", icon: Gift },
];

const chartValues = [38, 52, 46, 61, 58, 72, 68, 81, 76, 90, 85, 97];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const recentActivity = [
  { label: "Amélie R. a gagné 20 points", time: "il y a 2 min" },
  { label: "Nouveau client : Le Petit Café", time: "il y a 14 min" },
  { label: "Récompense échangée par Karim B.", time: "il y a 38 min" },
  { label: "Sofia L. a scanné son QR Code", time: "il y a 1 h" },
];

const latestClients = [
  { name: "Amélie Roussel", points: 240, initials: "AR" },
  { name: "Karim Benali", points: 180, initials: "KB" },
  { name: "Sofia Lambert", points: 95, initials: "SL" },
  { name: "Julien Marchand", points: 60, initials: "JM" },
];

export default function DashboardPreview() {
  const maxValue = Math.max(...chartValues);

  return (
    <section className="bg-[#0F1729] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#1FAE6B]">
            Dashboard
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Toute votre fidélité, sous vos yeux
          </h2>
          <p className="mt-4 text-base text-white/60">
            Un pilotage précis, pensé pour prendre des décisions en un coup
            d'œil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] sm:mt-20"
        >
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-xs text-white/40">
              app.passloyal.com/dashboard
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {/* stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className="h-4 w-4 text-white/40" strokeWidth={1.75} />
                    <span className="flex items-center gap-0.5 font-mono text-[11px] text-[#1FAE6B]">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* chart + activity */}
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/80">
                    Progression mensuelle
                  </p>
                  <p className="font-mono text-xs text-white/40">
                    12 derniers mois
                  </p>
                </div>
                <div className="mt-6 flex h-40 items-end gap-2 sm:gap-3">
                  {chartValues.map((value, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(value / maxValue) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.04 }}
                        className="w-full rounded-t-sm bg-gradient-to-t from-[#1B8A5A] to-[#1FAE6B]/70"
                        style={{ minHeight: 4 }}
                      />
                      <span className="font-mono text-[10px] text-white/30">
                        {months[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm font-medium text-white/80">
                  Activité récente
                </p>
                <ul className="mt-4 space-y-4">
                  {recentActivity.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1FAE6B]" />
                      <div>
                        <p className="text-xs leading-relaxed text-white/70">
                          {item.label}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-white/35">
                          {item.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* latest clients */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white/80">
                Derniers clients
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {latestClients.map((client) => (
                  <div
                    key={client.name}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B8A5A]/20 font-mono text-[11px] font-semibold text-[#1FAE6B]">
                      {client.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-white/80">
                        {client.name}
                      </p>
                      <p className="font-mono text-[10px] text-white/40">
                        {client.points} pts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

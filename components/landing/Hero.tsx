"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  QrCode,
  Bell,
  LayoutDashboard,
  Timer,
  Wallet,
  TrendingUp,
  Users,
} from "lucide-react";

const FEATURES = [
  { label: "Apple Wallet", icon: Wallet },
  { label: "Google Wallet", icon: Wallet },
  { label: "QR Code", icon: QrCode },
  { label: "Notifications Push", icon: Bell },
  { label: "Tableau de bord", icon: LayoutDashboard },
  { label: "Installation en quelques minutes", icon: Timer },
] as const;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pointer-driven parallax for the illustration cluster
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((e.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((e.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-10 mx-auto h-[560px] max-w-4xl bg-[radial-gradient(closest-side,rgba(79,70,229,0.16),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.14),transparent)] blur-2xl"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Left column — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[12.5px] font-medium text-indigo-700"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nouveau
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
          >
            La fidélité digitale pensée pour les{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              commerçants modernes
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-slate-500"
          >
            PassLoyal remplace vos cartes de fidélité papier par des cartes Apple Wallet et
            Google Wallet. Suivez les points de vos clients, distribuez des récompenses et
            pilotez tout depuis un tableau de bord clair, en temps réel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="#demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-[14.5px] font-medium text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/20"
            >
              Demander une démonstration
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#tarifs"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[14.5px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Découvrir les tarifs
            </Link>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
            }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3"
          >
            {FEATURES.map(({ label, icon: Icon }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-2 text-[13.5px] text-slate-600"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right column — illustration */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative mx-auto h-[440px] w-full max-w-lg [perspective:1400px] sm:h-[520px] lg:mx-0"
        >
          <DashboardWindow rotateX={rotateX} rotateY={rotateY} />
          <WalletStack rotateX={rotateX} rotateY={rotateY} />
        </div>
      </div>
    </section>
  );
}

function DashboardWindow({
  rotateX,
  rotateY,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_40px_80px_-30px_rgba(30,41,59,0.35)] backdrop-blur-xl"
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 text-[11.5px] font-medium text-slate-400">
          Tableau de bord — PassLoyal
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        {/* Stat cards */}
        <div className="col-span-1 rounded-xl bg-slate-50 p-3.5">
          <p className="text-[11px] font-medium text-slate-400">Clients actifs</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-slate-900">4 812</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3" /> +12,4%
          </p>
        </div>
        <div className="col-span-1 rounded-xl bg-slate-50 p-3.5">
          <p className="text-[11px] font-medium text-slate-400">Points cumulés</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-slate-900">92 340</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3" /> +8,1%
          </p>
        </div>

        {/* Chart */}
        <div className="col-span-2 rounded-xl bg-slate-50 p-3.5">
          <p className="text-[11px] font-medium text-slate-400">Activité — 7 derniers jours</p>
          <svg viewBox="0 0 280 70" className="mt-2 h-16 w-full">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 C30,20 50,55 80,35 C110,15 130,45 160,30 C190,15 210,40 240,22 C255,14 265,20 280,10"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M0,50 C30,20 50,55 80,35 C110,15 130,45 160,30 C190,15 210,40 240,22 C255,14 265,20 280,10 L280,70 L0,70 Z"
              fill="url(#chartFill)"
            />
          </svg>
        </div>

        {/* Recent customers */}
        <div className="col-span-2 rounded-xl bg-slate-50 p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-400">Derniers clients</p>
            <Users className="h-3.5 w-3.5 text-slate-300" />
          </div>
          <div className="mt-2 space-y-2">
            {[
              { name: "Camille D.", action: "a gagné 40 points", time: "2 min" },
              { name: "Karim B.", action: "a utilisé une récompense", time: "18 min" },
            ].map((row) => (
              <div key={row.name} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-[10px] font-semibold text-white">
                  {row.name.charAt(0)}
                </span>
                <p className="flex-1 text-[11.5px] text-slate-600">
                  <span className="font-medium text-slate-800">{row.name}</span> {row.action}
                </p>
                <span className="text-[10.5px] text-slate-400">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WalletStack({
  rotateX,
  rotateY,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  const cardRotateX = useTransform(rotateX, (v) => v * 0.6);
  const cardRotateY = useTransform(rotateY, (v) => v * 0.6);

  return (
    <div
      style={{ transformStyle: "preserve-3d" }}
      className="absolute -bottom-6 -right-2 z-10 sm:-right-6"
    >
      {/* Google Wallet card */}
      <motion.div
        style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
        initial={{ opacity: 0, y: 20, rotate: -14 }}
        animate={{ opacity: 1, y: 0, rotate: -14 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -left-16 bottom-6 h-[104px] w-[172px] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-4 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.5)] sm:-left-20"
      >
        <p className="text-[10px] font-medium tracking-wide text-slate-300">GOOGLE WALLET</p>
        <p className="mt-4 text-[13px] font-semibold text-white">Café des Halles</p>
        <p className="mt-1 text-[10.5px] text-slate-400">320 points · Niveau Argent</p>
      </motion.div>

      {/* Apple Wallet card */}
      <motion.div
        style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ opacity: 1, y: [0, -6, 0], rotate: 6 }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          rotate: { duration: 0.6, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
        className="relative h-[112px] w-[184px] rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 p-4 shadow-[0_25px_50px_-15px_rgba(79,70,229,0.55)]"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium tracking-wide text-white/80">APPLE WALLET</p>
          <Smartphone className="h-3.5 w-3.5 text-white/70" />
        </div>
        <p className="mt-5 text-[14px] font-semibold text-white">Maison Ferrand</p>
        <p className="mt-1 text-[10.5px] text-white/70">1 240 points · Niveau Or</p>
      </motion.div>

      {/* QR code chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="absolute -right-4 -top-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_35px_-12px_rgba(30,41,59,0.3)] sm:-right-8"
      >
        <QrCode className="h-full w-full text-slate-800" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}

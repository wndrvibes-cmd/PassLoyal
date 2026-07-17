import type { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ComingSoon({ icon: Icon, title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/25">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h1 className="mt-5 text-[17px] font-semibold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-1.5 max-w-sm text-[13.5px] text-slate-500">{description}</p>
      <span className="mt-6 rounded-full bg-indigo-50 px-3 py-1 text-[12px] font-medium text-indigo-700">
        Bientôt disponible
      </span>
    </div>
  );
}

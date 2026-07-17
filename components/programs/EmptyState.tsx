import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/25">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[13.5px] text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="group relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
          <span className="relative">{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

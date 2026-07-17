import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden className={cn("animate-pulse rounded-xl bg-slate-100", className)} />;
}

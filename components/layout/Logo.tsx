import Link from "next/link";
import { WalletCards } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-800 text-white shadow-soft transition-transform group-hover:scale-105">
        <WalletCards className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
      <span
        className={cn(
          "text-[17px] font-semibold tracking-tight",
          tone === "dark" ? "text-white" : "text-foreground"
        )}
      >
        PassLoyal
      </span>
    </Link>
  );
}

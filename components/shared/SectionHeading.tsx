import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <RevealOnScroll
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <Badge variant={tone === "dark" ? "outline-light" : "default"}>{eyebrow}</Badge>
      ) : null}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-balance text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink-muted" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </RevealOnScroll>
  );
}

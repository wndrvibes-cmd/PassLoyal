type GlowVariant = "hero" | "page" | "cta" | "side";

/**
 * Centralizes the ambient background glow used on dark sections, instead of
 * repeating the same blurred blob markup in every file. Each variant is
 * deliberately shaped/positioned differently — paired with a touch of the
 * gold signature accent alongside primary indigo — so dark sections don't
 * all read as one identical recycled blob.
 */
export function AmbientGlow({ variant = "page" }: { variant?: GlowVariant }) {
  if (variant === "hero") {
    return (
      <>
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary-600/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-gold-400/10 blur-[110px]" />
      </>
    );
  }

  if (variant === "cta") {
    return (
      <>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-16 left-1/2 h-[200px] w-[420px] -translate-x-1/2 rounded-full bg-gold-400/10 blur-[100px]" />
      </>
    );
  }

  if (variant === "side") {
    return (
      <>
        <div className="pointer-events-none absolute -top-24 right-[-8%] h-[380px] w-[560px] rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-[300px] w-[440px] rounded-full bg-gold-400/10 blur-[100px]" />
      </>
    );
  }

  return (
    <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/25 blur-[120px]" />
  );
}

"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Wraps a card with a very subtle mouse-parallax tilt — the pointer position
 * drives a small rotateX/rotateY via spring physics. No-op (plain div) under
 * prefers-reduced-motion, and inert on touch since no mousemove fires there.
 */
export function TiltCard({
  children,
  className,
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 300,
    damping: 30,
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

/**
 * Animates a number counting up when it scrolls into view. Used for points
 * balances and reward figures — the "un chiffre qui augmente" moments.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export function CountUp({
  value,
  duration = 1.1,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("fr-FR")}
    </span>
  );
}

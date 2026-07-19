"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const numericValue = Number.parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1]?.length ?? 0 : 0;

  useEffect(() => {
    if (!isInView || Number.isNaN(numericValue)) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, numericValue, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(latest.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, decimals, duration, reduceMotion, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

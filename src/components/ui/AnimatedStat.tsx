"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  /** numeric target, e.g. 15 */
  value: number;
  /** suffix shown after the number, e.g. "+" or "K+" */
  suffix?: string;
  /** label below the number */
  label: string;
  /** accent colour for the number */
  color?: string;
  /** delay before counting starts (ms) */
  delay?: number;
  /** whether to trigger immediately or wait for inView */
  inView: boolean;
}

export function AnimatedStat({
  value,
  suffix = "+",
  label,
  color = "var(--accent)",
  delay = 0,
  inView,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      const duration = 1400; // ms
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        // ease-out cubic
        const progress = 1 - Math.pow(1 - step / steps, 3);
        current = Math.round(value * progress);
        setCount(current);
        if (step >= steps) {
          setCount(value);
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, value, delay]);

  return (
    <div className="group flex flex-col">
      {/* Number row */}
      <div className="flex items-end gap-1 mb-3">
        <span
          className="tabular-nums leading-none font-bold"
          style={{
            fontSize: "clamp(3rem, 5vw, 4.5rem)",
            color,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          className="font-light mb-1"
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
            color,
            opacity: 0.7,
          }}
        >
          {suffix}
        </span>
      </div>

      {/* Thin accent line */}
      <div
        className="h-px mb-3 transition-all duration-700"
        style={{
          width: inView ? "2.5rem" : "0px",
          background: color,
          transitionDelay: `${delay + 600}ms`,
        }}
      />

      {/* Label */}
      <span
        className="text-[11px] tracking-[0.45em] uppercase font-medium"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {label}
      </span>
    </div>
  );
}

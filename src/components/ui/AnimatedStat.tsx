"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  color?: string;
  delay?: number;
  inView: boolean;
}

export function AnimatedStat({
  value,
  suffix = "+",
  label,
  color = "#4CC8E8",
  delay = 0,
  inView,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const t = setTimeout(() => {
      const duration = 1800;
      const steps = 70;
      let step = 0;

      const iv = setInterval(() => {
        step++;
        // ease-out cubic
        const progress = 1 - Math.pow(1 - step / steps, 3);
        setCount(Math.round(value * progress));
        if (step >= steps) {
          setCount(value);
          clearInterval(iv);
        }
      }, duration / steps);

      return () => clearInterval(iv);
    }, delay);

    return () => clearTimeout(t);
  }, [inView, value, delay]);

  return (
    <div className="flex flex-col items-start">

      {/* Number */}
      <div
        style={{
          fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color,
          textShadow: `0 0 60px ${color}55, 0 0 20px ${color}33`,
          marginBottom: "0.6rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>

      {/* Accent line */}
      <div
        style={{
          height: "2px",
          width: inView ? "2rem" : "0",
          background: color,
          opacity: 0.75,
          borderRadius: "2px",
          transition: `width 0.7s cubic-bezier(0.77,0,0.175,1) ${delay + 800}ms`,
          marginBottom: "0.7rem",
        }}
      />

      {/* Label */}
      <span
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(255,255,255,0.52)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

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
  const [filled, setFilled] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const t = setTimeout(() => {
      const duration = 1600;
      const steps = 60;
      let step = 0;

      const iv = setInterval(() => {
        step++;
        const progress = 1 - Math.pow(1 - step / steps, 3);
        setCount(Math.round(value * progress));
        if (step >= steps) {
          setCount(value);
          clearInterval(iv);
          setTimeout(() => setFilled(true), 180);
        }
      }, duration / steps);
    }, delay);

    return () => clearTimeout(t);
  }, [inView, value, delay]);

  return (
    <div className="relative flex flex-col items-start">

      {/* Number container */}
      <div className="relative mb-4" style={{ lineHeight: 1 }}>

        {/* Ghost outline — always visible as backdrop */}
        <span
          aria-hidden
          style={{
            display: "block",
            fontSize: "clamp(4rem, 6.5vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: `1.5px ${color}`,
            opacity: 0.22,
            position: "absolute",
            top: 0,
            left: 0,
            userSelect: "none",
          }}
        >
          {value.toLocaleString()}{suffix}
        </span>

        {/* Solid counted number — fades + slides in */}
        <span
          style={{
            display: "block",
            fontSize: "clamp(4rem, 6.5vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color,
            opacity: filled ? 1 : 0,
            transform: filled ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
            textShadow: `0 0 50px ${color}44`,
          }}
        >
          {count.toLocaleString()}{suffix}
        </span>
      </div>

      {/* Gradient accent line */}
      <div
        style={{
          height: "2px",
          width: inView ? "2.5rem" : "0",
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          transition: `width 0.8s cubic-bezier(0.77,0,0.175,1) ${delay + 900}ms`,
          marginBottom: "0.55rem",
        }}
      />

      {/* Label */}
      <span
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.48em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(255,255,255,0.58)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

"use client";

import { useState } from "react";

interface GridItemProps {
  title: string;
  desc: string;
}

export function GridItem({ title, desc }: GridItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative p-10 bg-[#0a0a0a] transition-all duration-500 group overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? "inset 0 0 60px color-mix(in srgb, var(--accent) 8%, transparent)"
          : "none",
      }}
    >
      {/* Accent glow corner */}
      <div
        className="absolute top-0 left-0 w-px h-12 transition-all duration-700"
        style={{
          background: hovered ? "var(--accent)" : "rgba(255,255,255,0.1)",
          height: hovered ? "100%" : "48px",
        }}
      />

      <div className="pl-6">
        <h3
          className="text-xl font-light text-white/80 mb-3 transition-all duration-500"
          style={{
            color: hovered ? "var(--accent)" : undefined,
            transform: hovered ? "translateX(8px)" : "none",
          }}
        >
          {title}
        </h3>
        <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
      </div>

      {/* Background radial on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background:
            "radial-gradient(circle at 0% 50%, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PAGE_COLORS, DEFAULT_COLOR } from "@/lib/colors";

interface ColorContextValue {
  color: string;
  setColor: (c: string) => void;
}

const ColorContext = createContext<ColorContextValue>({
  color: DEFAULT_COLOR,
  setColor: () => {},
});

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const pathname = usePathname();

  useEffect(() => {
    const target =
      PAGE_COLORS[pathname] ??
      (pathname.startsWith("/blog") ? PAGE_COLORS["/blog"] : DEFAULT_COLOR);
    setColor(target);

    // Tween the CSS variable smoothly — never sudden
    const el = document.documentElement;
    const start = getComputedStyle(el).getPropertyValue("--accent").trim() || DEFAULT_COLOR;

    // Simple tween using requestAnimationFrame
    let startTime: number | null = null;
    const duration = 1200;

    const lerp = (a: string, b: string, t: number) => {
      const parse = (hex: string) => {
        const h = hex.replace("#", "");
        return [
          parseInt(h.slice(0, 2), 16),
          parseInt(h.slice(2, 4), 16),
          parseInt(h.slice(4, 6), 16),
        ];
      };
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      const [r1, g1, b1] = parse(a);
      const [r2, g2, b2] = parse(b);
      return `#${toHex(Math.round(r1 + (r2 - r1) * t))}${toHex(Math.round(g1 + (g2 - g1) * t))}${toHex(Math.round(b1 + (b2 - b1) * t))}`;
    };

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      el.style.setProperty("--accent", lerp(start, target, eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [pathname]);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext);

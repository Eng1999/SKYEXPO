"use client";

import { useEffect } from "react";

export function SmoothScroller() {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let rafId: number;

    const init = async () => {
      // Disable Lenis on touch/mobile — use native scroll for better performance
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Expose lenis globally for scroll lock during intro
      (window as unknown as Record<string, unknown>).__lenis = lenis;
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}

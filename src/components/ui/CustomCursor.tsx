"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /* Hide on touch devices */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let currentX = -100, currentY = -100;
    let targetX  = -100, targetY  = -100;
    let rafId: number;
    let ticking = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);
      cursor.style.left = `${currentX}px`;
      cursor.style.top  = `${currentY}px`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          targetX  = e.clientX;
          targetY  = e.clientY;
          ticking  = false;
        });
        ticking = true;
      }
    };

    /* Event delegation — one listener on document instead of per-element */
    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [data-cursor-hover]")) {
        cursor.classList.add("cursor-hover");
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [data-cursor-hover]")) {
        cursor.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout",  onMouseOut,  { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout",  onMouseOut);
    };
  }, []);

  return <div id="sky-cursor" ref={cursorRef} aria-hidden="true" />;
}

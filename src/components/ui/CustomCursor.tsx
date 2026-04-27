"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const addHover = (el: Element) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
    };

    window.addEventListener("mousemove", onMove);

    // Attach hover states to interactive elements (with MutationObserver for dynamic elements)
    const attachInteractive = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach(addHover);
    };
    attachInteractive();

    const observer = new MutationObserver(attachInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return <div id="sky-cursor" ref={cursorRef} aria-hidden="true" />;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { HeroVideo } from "./HeroVideo";
import { HeroText } from "./HeroText";

export function HeroSection() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intro sequence:
    // 0s: black
    // 1s: logo fades in
    // 2.2s: content + text sequence begins
    // 3.5s: scroll unlocked

    const t1 = setTimeout(() => setLogoVisible(true), 1000);
    const t2 = setTimeout(() => setContentVisible(true), 2200);
    const t3 = setTimeout(() => {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { start?: () => void } | undefined;
      lenis?.start?.();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Cinematic video background */}
      {contentVisible && <HeroVideo />}

      {/* Initial logo reveal */}
      <div
        ref={logoRef}
        className="absolute z-20 flex flex-col items-center"
        style={{
          opacity: logoVisible && !contentVisible ? 1 : 0,
          transform: `scale(${logoVisible && !contentVisible ? 1 : 0.95})`,
          transition: "opacity 0.8s cubic-bezier(0.77,0,0.175,1), transform 0.8s cubic-bezier(0.77,0,0.175,1)",
          pointerEvents: "none",
        }}
      >
        <div className="text-5xl font-light tracking-[0.5em] uppercase text-white">
          <span style={{ color: "var(--accent)" }}>SKY</span>
          <span className="text-white/70"> EXPO</span>
        </div>
      </div>

      {/* Main hero content */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <HeroText />
      </div>
    </section>
  );
}

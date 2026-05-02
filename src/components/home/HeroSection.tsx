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
      {/* Real video background */}
      {contentVisible && <HeroVideo src="/videos/sirc.mp4" />}

      {/* Initial logo reveal — real logo */}
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
        {/* Logo on white pill — real brand colours visible on black hero */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.97)",
            borderRadius: "12px",
            padding: "10px 20px",
            boxShadow: "0 0 60px rgba(76,200,232,0.25), 0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/skyexpo-logo.png"
            alt="Sky Expo"
            style={{ height: 90, width: "auto", display: "block" }}
          />
        </span>
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

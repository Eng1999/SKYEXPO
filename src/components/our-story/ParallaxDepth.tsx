"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function ParallaxDepth() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const mid = midRef.current;
    const fg = fgRef.current;
    if (!container || !bg || !mid || !fg) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const progress = -rect.top / window.innerHeight;

          bg.style.transform = `translateY(${progress * 60}px)`;
          mid.style.transform = `translateY(${progress * 30}px)`;
          fg.style.transform = `translateY(${progress * 10}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background layer — moves slowest */}
      <div
        ref={bgRef}
        className="parallax-layer absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, #FED17218 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #23165012 0%, transparent 50%)",
        }}
      />

      {/* Mid layer — decorative ring */}
      <div
        ref={midRef}
        className="parallax-layer absolute"
        style={{
          width: "60vw",
          height: "60vw",
          border: "1px solid rgba(254,209,114,0.08)",
          borderRadius: "50%",
          left: "-10vw",
          top: "10%",
        }}
      />

      {/* Foreground text — moves fastest */}
      <div ref={fgRef} className="parallax-layer relative z-10 max-w-4xl px-8 text-center">
        <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6">
          {lang === "en" ? "Our Story" : "قصتنا"}
        </p>
        <h2 className="text-5xl md:text-7xl font-semibold text-white leading-tight mb-8">
          {lang === "en" ? (
            <>
              We turn
              <span style={{ color: "#FED172" }}> exhibitions</span>
              <br />into experiences
            </>
          ) : (
            <>
              نحوّل
              <span style={{ color: "#FED172" }}> المعارض</span>
              <br />إلى تجارب
            </>
          )}
        </h2>
        <p className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto">
          {lang === "en"
            ? "Sky Expo is a Saudi-based exhibition and events company delivering world-class brand experiences since our founding."
            : "سكاي اكسبو شركة سعودية متخصصة في المعارض والفعاليات، تقدم تجارب علامات تجارية عالمية المستوى."}
        </p>
      </div>
    </div>
  );
}

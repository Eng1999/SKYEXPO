"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

const STATS = [
  { value: 900, suffix: "+", labelEn: "Projects Delivered",  labelAr: "مشروعاً منفذاً",    color: "#F3742B" },
  { value: 70,  suffix: "+", labelEn: "Specialist Team",     labelAr: "كادر متخصص",         color: "#FED172" },
  { value: 17,  suffix: "+", labelEn: "Years of Experience", labelAr: "سنة من الخبرة",      color: "#4CC8E8" },
];

export function HomeIntro() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 1.2s cubic-bezier(0.77,0,0.175,1) ${delay}s,
                 transform 1.2s cubic-bezier(0.77,0,0.175,1) ${delay}s`,
  });

  return (
    <section
      ref={ref}
      className="relative bg-black overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(76,200,232,0.05) 0%, transparent 70%)" }} />

      {/* ── TOP: text block ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 lg:pt-28 pb-10 md:pb-16
                      grid md:grid-cols-2 gap-8 md:gap-16 items-end border-b border-white/[0.06]">

        {/* Left */}
        <div style={fadeIn(0)}>
          <p className="text-[11px] tracking-[0.55em] uppercase font-semibold mb-5"
             style={{ color: "#4CC8E8" }}>
            {isAr ? "قصتنا" : "Our Story"}
          </p>
          <h2
            className="font-bold text-white leading-[1.05]"
            style={{ fontSize: "clamp(3.2rem,6vw,6.5rem)" }}
          >
            {isAr ? (
              <>تجارب تتجاوز<br /><span style={{ color: "#4CC8E8" }}>الحدود</span></>
            ) : (
              <>Experiences that<br /><span style={{ color: "#4CC8E8" }}>transcend borders</span></>
            )}
          </h2>
        </div>

        {/* Right */}
        <div style={fadeIn(0.2)}>
          <p className="text-base leading-relaxed mb-8"
             style={{ color: "rgba(255,255,255,0.82)" }}>
            {isAr
              ? "سكاي إكسبو شركة سعودية رائدة في تصميم وتنفيذ المعارض والفعاليات الدولية. نحن لا نُقيم فعاليات — بل نصنع لحظات تُعمَّر."
              : "Sky Expo — Saudi Arabia's premier exhibitions and events company. We don't produce events, we craft moments that endure."}
          </p>
          <a href="/our-story"
            className="inline-flex items-center gap-4 text-xs tracking-[0.35em] uppercase font-semibold
                       text-white/60 hover:text-white transition-colors duration-400 group"
            data-cursor-hover>
            {isAr ? "اكتشف قصتنا" : "Discover our story"}
            <span className="block w-8 h-px bg-current transition-all duration-400 group-hover:w-16" />
          </a>
        </div>
      </div>

      {/* ── BOTTOM: creative stats row ───────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20">

        {/* Decorative label */}
        <p className="text-[10px] tracking-[0.65em] uppercase font-medium mb-14"
           style={{ color: "rgba(255,255,255,0.35)", ...fadeIn(0.35) }}>
          {isAr ? "بالأرقام" : "By the numbers"}
        </p>

        {/* Stats grid */}
        <div
          className="relative grid grid-cols-3 gap-y-10 gap-x-6 md:gap-12 max-w-3xl mx-auto justify-items-center"
          style={fadeIn(0.45)}
        >
          {STATS.map((s, i) => (
            <div
              key={s.labelEn}
              className="relative px-5 md:px-8 lg:px-10 first:ps-0"
              style={{
                borderInlineStart: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <AnimatedStat
                value={s.value}
                suffix={s.suffix}
                label={isAr ? s.labelAr : s.labelEn}
                color={s.color}
                delay={i * 160}
                inView={inView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

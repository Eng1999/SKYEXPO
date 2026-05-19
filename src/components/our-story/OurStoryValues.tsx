"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const VALUES = [
  { iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", labelEn: "Creativity", labelAr: "الإبداع", color: "#FED172" },
  { iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", labelEn: "Reliability", labelAr: "الموثوقية", color: "#F3742B" },
  { iconPath: "M13 10V3L4 14h7v7l9-11h-7z", labelEn: "Efficiency", labelAr: "الكفاءة", color: "#B83A14" },
  { iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", labelEn: "Challenge", labelAr: "تقبّل التحدي", color: "#612E37" },
  { iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", labelEn: "Safety", labelAr: "الأمان", color: "#231650" },
];

export function OurStoryValues() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-black py-12 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.06]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.5em] uppercase text-white/55 mb-3">
            {isAr ? "قيمنا" : "Our Values"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            {isAr ? "ما يُعرّفنا" : "What defines us"}
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {VALUES.map((v, i) => (
            <ValueCard key={i} value={v} isAr={isAr} index={i} inView={inView} />
          ))}
        </div>

        {/* Quote */}
        <div
          className="mt-24 max-w-3xl"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1.5s ease 0.6s",
          }}
        >
          <blockquote
            className="text-xl sm:text-2xl md:text-4xl font-normal text-white/75 leading-relaxed"
            style={{
              borderColor: "#FED172",
              borderInlineStartWidth: "2px",
              borderInlineStartStyle: "solid",
              paddingInlineStart: "clamp(1.25rem,3vw,2rem)",
            }}
          >
            {isAr
              ? '"نحن لا نُقيم فعاليات — بل نصنع لحظات تُعمَّر."'
              : '"We don\'t produce events — we craft moments that endure."'}
          </blockquote>
          <p className="mt-4 text-xs tracking-widest uppercase text-white/55"
             style={{ paddingInlineStart: "clamp(1.25rem,3vw,2rem)" }}>
            {isAr ? "— رؤية سكاي إكسبو التأسيسية" : "— Sky Expo Founding Vision"}
          </p>
        </div>

        {/* CTA */}
        <div
          className="mt-16 flex items-center gap-8"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1.5s ease 0.8s",
          }}
        >
          <a
            href="/capabilities"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-400 group"
            data-cursor-hover
          >
            {isAr ? "استكشف قدراتنا" : "Explore our capabilities"}
            <span className="block w-8 h-px bg-current transition-all duration-400 group-hover:w-14" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase px-6 py-3 border border-white/20 hover:border-white/60 text-white/50 hover:text-white transition-all duration-400"
            data-cursor-hover
          >
            {isAr ? "تواصل معنا" : "Get in touch"}
          </a>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  value,
  isAr,
  index,
  inView,
}: {
  value: (typeof VALUES)[0];
  isAr: boolean;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center text-center p-6 border border-white/[0.06] transition-all duration-500 cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s ease ${index * 0.1}s, transform 0.9s ease ${index * 0.1}s, border-color 0.4s ease, background 0.4s ease`,
        borderColor: hovered ? `${value.color}40` : undefined,
        background: hovered ? `${value.color}06` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className="mb-4 w-10 h-10 flex items-center justify-center"
        style={{
          color: hovered ? value.color : "rgba(255,255,255,0.25)",
          transition: "color 0.4s ease",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={value.iconPath} />
        </svg>
      </div>

      {/* Label */}
      <span
        className="text-xs tracking-[0.3em] uppercase transition-colors duration-400"
        style={{ color: hovered ? value.color : "rgba(255,255,255,0.4)" }}
      >
        {isAr ? value.labelAr : value.labelEn}
      </span>
    </div>
  );
}

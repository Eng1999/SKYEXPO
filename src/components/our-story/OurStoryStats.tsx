"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STATS = [
  { numEn: "15+",   numAr: "+١٥",  labelEn: "Years of Experience", labelAr: "عاماً من الخبرة",        color: "#FED172" },
  { numEn: "60+",   numAr: "+٦٠",  labelEn: "Satisfied Clients",   labelAr: "عميل راضٍ",              color: "#F3742B" },
  { numEn: "70+",   numAr: "+٧٠",  labelEn: "Team Members",        labelAr: "عضو في الفريق",           color: "#B83A14" },
  { numEn: "1500+", numAr: "+١٥٠٠",labelEn: "Tools & Equipment",   labelAr: "أداة ومعدة متخصصة",      color: "#612E37" },
];

export function OurStoryStats() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-black border-t border-white/[0.06] py-24 px-16"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 1s cubic-bezier(0.77,0,0.175,1) ${i * 0.12}s, transform 1s cubic-bezier(0.77,0,0.175,1) ${i * 0.12}s`,
            }}
          >
            <span
              className="block text-5xl md:text-6xl font-extralight mb-2"
              style={{ color: s.color }}
            >
              {isAr ? s.numAr : s.numEn}
            </span>
            <span className="text-xs tracking-[0.3em] uppercase text-white/35">
              {isAr ? s.labelAr : s.labelEn}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

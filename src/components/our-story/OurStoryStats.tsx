"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

const STATS = [
  { value: 15,   suffix: "+", labelEn: "Years of Experience", labelAr: "عاماً من الخبرة",   color: "#4CC8E8" },
  { value: 60,   suffix: "+", labelEn: "Satisfied Clients",   labelAr: "عميل راضٍ",         color: "#F3742B" },
  { value: 70,   suffix: "+", labelEn: "Team Members",        labelAr: "عضو في الفريق",      color: "#FED172" },
  { value: 1500, suffix: "+", labelEn: "Tools & Equipment",   labelAr: "أداة ومعدة متخصصة", color: "#ffffff" },
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
      className="relative bg-black border-t border-white/[0.06] py-28 px-16"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {STATS.map((s, i) => (
          <AnimatedStat
            key={i}
            value={s.value}
            suffix={s.suffix}
            label={isAr ? s.labelAr : s.labelEn}
            color={s.color}
            delay={i * 150}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}

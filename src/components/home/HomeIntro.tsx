"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

export function HomeIntro() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isAr = lang === "ar";

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 70%)",
          transition: "background 1.4s ease",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: big number + label */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 1.4s cubic-bezier(0.77,0,0.175,1), transform 1.4s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          <span
            className="block text-[10rem] md:text-[14rem] font-extralight leading-none select-none"
            style={{ color: "var(--accent)", opacity: 0.12, transition: "color 0.8s ease" }}
          >
            {isAr ? "١" : "1"}
          </span>
          <div className="-mt-8">
            <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-3">
              {isAr ? "قصتنا" : "Our Story"}
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight text-white leading-tight">
              {isAr
                ? <>تجارب تتجاوز<br /><span style={{ color: "var(--accent)", transition: "color 0.8s ease" }}>الحدود</span></>
                : <>Experiences that<br /><span style={{ color: "var(--accent)", transition: "color 0.8s ease" }}>transcend borders</span></>
              }
            </h2>
          </div>
        </div>

        {/* Right: description */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 1.4s cubic-bezier(0.77,0,0.175,1) 0.3s, transform 1.4s cubic-bezier(0.77,0,0.175,1) 0.3s",
          }}
        >
          <p className="text-base font-light leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            {isAr
              ? "سكاي إكسبو شركة سعودية متخصصة في تصميم وتنفيذ المعارض والفعاليات الدولية بمعايير عالمية استثنائية. نحن لا نُقيم فعاليات — بل نصنع لحظات تُعمَّر."
              : "Sky Expo is a Saudi company specializing in designing and executing international exhibitions and events to exceptional global standards. We don't produce events — we craft moments that endure."}
          </p>

          {/* Stat row — animated counters */}
          <div className="flex gap-12">
            {[
              { value: 15,  suffix: "+", labelEn: "Years",   labelAr: "عاماً",   color: "#4CC8E8", delay: 0   },
              { value: 60,  suffix: "+", labelEn: "Clients",  labelAr: "عميل",   color: "#F3742B", delay: 150 },
              { value: 70,  suffix: "+", labelEn: "Experts",  labelAr: "متخصص",  color: "#FED172", delay: 300 },
            ].map((s) => (
              <AnimatedStat
                key={s.labelEn}
                value={s.value}
                suffix={s.suffix}
                label={isAr ? s.labelAr : s.labelEn}
                color={s.color}
                delay={s.delay}
                inView={inView}
              />
            ))}
          </div>

          {/* CTA */}
          <a
            href="/our-story"
            className="inline-flex items-center gap-3 mt-10 text-xs tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-400 group"
            data-cursor-hover
          >
            {isAr ? "اكتشف قصتنا" : "Discover our story"}
            <span className="block w-8 h-px bg-current transition-all duration-400 group-hover:w-14" />
          </a>
        </div>
      </div>
    </section>
  );
}

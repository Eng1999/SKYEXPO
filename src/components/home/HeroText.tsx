"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  { id: "eyebrow", delay: 0.0 },
  { id: "title1",  delay: 0.8 },
  { id: "title2",  delay: 1.6 },
  { id: "title3",  delay: 2.2 },
  { id: "desc",    delay: 3.2 },
  { id: "cta",     delay: 4.0 },
];

export function HeroText() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisible({});

    STEPS.forEach(({ id, delay }) => {
      const t = setTimeout(
        () => setVisible((prev) => ({ ...prev, [id]: true })),
        (delay + 1.4) * 1000,
      );
      timersRef.current.push(t);
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, [lang]);

  const isAr = lang === "ar";

  const fadeUp = (key: string): React.CSSProperties => ({
    opacity: visible[key] ? 1 : 0,
    transform: visible[key] ? "translateY(0)" : "translateY(40px)",
    filter: visible[key] ? "blur(0px)" : "blur(10px)",
    transition: `opacity 1.4s cubic-bezier(0.77,0,0.175,1), transform 1.4s cubic-bezier(0.77,0,0.175,1), filter 1.2s cubic-bezier(0.77,0,0.175,1)`,
  });

  return (
    <div className="absolute inset-0 flex" dir={isAr ? "rtl" : "ltr"}>

      {/* ── Vertical side label — hidden on small screens ── */}
      <div
        className="hidden md:flex absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3"
        style={{
          opacity: visible["eyebrow"] ? 0.35 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase text-white whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {isAr ? "معارض العالم" : "World Exhibitions"}
        </span>
        <span className="block w-px h-16 bg-white/30" />
      </div>

      {/* ── Vertical right-side counter — hidden on mobile ── */}
      <div
        className="hidden md:flex absolute right-6 lg:right-8 bottom-24 flex-col items-center gap-4"
        style={{
          opacity: visible["cta"] ? 0.35 : 0,
          transition: "opacity 1.5s ease",
        }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white">01</span>
        <span className="block w-px h-8 bg-white/30" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">05</span>
      </div>

      {/* ── Main content block — responsive padding ── */}
      <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 md:px-16 pb-10 md:pb-16 flex flex-col gap-3">

        {/* Small eyebrow label */}
        <div style={fadeUp("eyebrow")}>
          <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-3 md:mb-4">
            {isAr ? "سكاي إكسبو" : "Sky Expo"}
          </p>
        </div>

        {/* BIG cinematic title */}
        <div
          className="font-bold tracking-tight uppercase mb-5 md:mb-8"
          style={{
            fontSize: isAr ? "clamp(2.4rem,8vw,8rem)" : "clamp(2.8rem,10vw,10rem)",
            lineHeight: isAr ? 1.15 : 0.9,
          }}
        >
          <span
            className="block"
            style={{
              ...fadeUp("title1"),
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.85)",
            }}
          >
            {isAr ? "حيث" : "Where"}
          </span>
          <span
            className="block"
            style={{
              ...fadeUp("title2"),
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.85)",
            }}
          >
            {isAr ? "تتحول" : "Moments"}
          </span>
          <span
            className="block"
            style={{
              ...fadeUp("title3"),
              color: "transparent",
              WebkitTextStroke: isAr ? "1px rgba(255,255,255,0.6)" : "1.5px rgba(255,255,255,0.6)",
              fontSize: isAr ? "clamp(1.4rem,5vw,5rem)" : undefined,
            }}
          >
            {isAr ? "اللحظات إلى إرث" : "Become Legacy"}
          </span>
        </div>

        {/* Bottom row: description + play button */}
        <div className="flex items-end justify-between gap-4">
          {/* Description */}
          <div className="max-w-[260px] md:max-w-xs" style={fadeUp("desc")}>
            <p className="text-xs md:text-sm font-normal leading-relaxed"
               style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
              {isAr
                ? "شركة سعودية رائدة في المعارض والفعاليات منذ ٢٠٠٩ — نصنع اللحظات."
                : "Saudi Arabia's premier exhibitions & events company since 2009 — crafting moments."}
            </p>
          </div>

          {/* Play button + scroll hint */}
          <div className="flex flex-col items-end gap-4 md:gap-6" style={fadeUp("cta")}>
            {/* Circular play button — 44px minimum touch target */}
            <button
              className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 hover:border-white/80 transition-all duration-500"
              data-cursor-video
              aria-label="Play reel"
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: "var(--accent)" }}
              />
              <svg width="12" height="14" viewBox="0 0 14 16" fill="none" className="ml-0.5">
                <path d="M1 1l12 7-12 7V1z" fill="white" fillOpacity="0.9" />
              </svg>
            </button>

            {/* Scroll indicator — hidden on mobile to reduce clutter */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
                {isAr ? "اسحب" : "Scroll"}
              </span>
              <div className="w-px h-10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent animate-[scrollBar_2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom-right hint — hidden on mobile ── */}
      <div
        className="hidden sm:block absolute bottom-6 md:bottom-8 right-5 md:right-8 text-[10px] tracking-[0.35em] uppercase text-white/55"
        style={{ opacity: visible["cta"] ? 1 : 0, transition: "opacity 2s ease" }}
      >
        {isAr ? "اضغط واستكشف" : "Click & Explore"}
      </div>

      {/* ── Roman numerals — hidden on mobile ── */}
      <div
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-4"
        style={{ opacity: visible["cta"] ? 0.25 : 0, transition: "opacity 2s ease 0.5s" }}
      >
        <span className="text-xs tracking-widest text-white">I</span>
        <span className="block w-16 h-px bg-white/40" />
        <span className="text-xs tracking-widest text-white">V</span>
      </div>
    </div>
  );
}

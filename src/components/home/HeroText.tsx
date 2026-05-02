"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Cinematic text sequence — each word/phrase appears on its own timeline
const STEPS = [
  { id: "eyebrow", delay: 0.0 },   // "SKY EXPO" small label
  { id: "title1",  delay: 0.8 },   // "WHERE"
  { id: "title2",  delay: 1.6 },   // "MOMENTS"
  { id: "title3",  delay: 2.2 },   // "BECOME LEGACY"
  { id: "desc",    delay: 3.2 },   // description paragraph
  { id: "cta",     delay: 4.0 },   // scroll + play button
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
        (delay + 1.4) * 1000, // +1.4 s for logo intro
      );
      timersRef.current.push(t);
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, [lang]);

  const isAr = lang === "ar";

  const fadeUp = (key: string, extra?: string): React.CSSProperties => ({
    opacity: visible[key] ? 1 : 0,
    transform: visible[key] ? "translateY(0)" : "translateY(40px)",
    filter: visible[key] ? "blur(0px)" : "blur(10px)",
    transition: `opacity 1.4s cubic-bezier(0.77,0,0.175,1), transform 1.4s cubic-bezier(0.77,0,0.175,1), filter 1.2s cubic-bezier(0.77,0,0.175,1) ${extra ?? ""}`,
  });

  return (
    <div className="absolute inset-0 flex" dir={isAr ? "rtl" : "ltr"}>

      {/* ── Vertical side label ── */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
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

      {/* ── Vertical right-side counter ── */}
      <div
        className="absolute right-8 bottom-24 flex flex-col items-center gap-4"
        style={{
          opacity: visible["cta"] ? 0.35 : 0,
          transition: "opacity 1.5s ease",
        }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white">01</span>
        <span className="block w-px h-8 bg-white/30" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">05</span>
      </div>

      {/* ── Main content block — bottom-left anchored ── */}
      <div className="absolute bottom-0 left-0 right-0 px-16 pb-16 flex flex-col gap-3">

        {/* Small eyebrow label */}
        <div style={fadeUp("eyebrow")}>
          <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-4">
            {isAr ? "سكاي إكسبو" : "Sky Expo"}
          </p>
        </div>

        {/* BIG cinematic title — staggered lines */}
        {/* No overflow-hidden — Arabic glyphs extend beyond em-box and get clipped */}
        <div className="mb-1 pb-2">
          <h1
            className="font-bold leading-[1.05] tracking-tight uppercase text-white"
            style={{
              ...fadeUp("title1"),
              fontSize: isAr ? "clamp(3rem,8vw,8rem)" : "clamp(3.5rem,10vw,10rem)",
              textShadow: "0 2px 30px rgba(0,0,0,0.7)",
              wordBreak: "keep-all",
            }}
          >
            {isAr ? "حيث" : "Where"}
          </h1>
        </div>
        <div className="mb-1 pb-2">
          <h1
            className="font-bold leading-[1.05] tracking-tight uppercase"
            style={{
              ...fadeUp("title2"),
              fontSize: isAr ? "clamp(3rem,8vw,8rem)" : "clamp(3.5rem,10vw,10rem)",
              color: "var(--accent)",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
              wordBreak: "keep-all",
            }}
          >
            {isAr ? "تتحول" : "Moments"}
          </h1>
        </div>
        <div className="mb-8 pb-2">
          <h1
            className="font-light leading-[1.05] tracking-tight uppercase text-white/80"
            style={{
              ...fadeUp("title3"),
              fontSize: isAr ? "clamp(2rem,5.5vw,5.5rem)" : "clamp(3.5rem,10vw,10rem)",
              textShadow: "0 2px 30px rgba(0,0,0,0.7)",
              wordBreak: "keep-all",
            }}
          >
            {isAr ? "اللحظات إلى إرث" : "Become Legacy"}
          </h1>
        </div>

        {/* Bottom row: description + play button */}
        <div className="flex items-end justify-between">
          {/* Description */}
          <div
            className="max-w-xs"
            style={fadeUp("desc")}
          >
            <p className="text-sm font-normal leading-relaxed"
               style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
              {isAr
                ? "شركة سعودية رائدة في المعارض والفعاليات منذ ٢٠٠٩ — نصنع اللحظات."
                : "Saudi Arabia's premier exhibitions & events company since 2009 — crafting moments."}
            </p>
          </div>

          {/* Play button + scroll hint */}
          <div
            className="flex flex-col items-end gap-6"
            style={fadeUp("cta")}
          >
            {/* Circular play button */}
            <button
              className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-white/30 hover:border-white/80 transition-all duration-500"
              data-cursor-video
              aria-label="Play reel"
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: "var(--accent)" }}
              />
              {/* Play triangle */}
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="ml-1">
                <path d="M1 1l12 7-12 7V1z" fill="white" fillOpacity="0.9" />
              </svg>
            </button>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
                {isAr ? "اسحب" : "Scroll"}
              </span>
              <div className="w-px h-10 overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent animate-[scrollBar_2s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom-right "Click and hold" hint ── */}
      <div
        className="absolute bottom-8 right-8 text-[10px] tracking-[0.35em] uppercase text-white/20"
        style={{
          opacity: visible["cta"] ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      >
        {isAr ? "اضغط واستكشف" : "Click & Explore"}
      </div>

      {/* ── Roman numerals bottom-center (like Blue Planet) ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4"
        style={{
          opacity: visible["cta"] ? 0.25 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      >
        <span className="text-xs tracking-widest text-white">I</span>
        <span className="block w-16 h-px bg-white/40" />
        <span className="text-xs tracking-widest text-white">V</span>
      </div>
    </div>
  );
}

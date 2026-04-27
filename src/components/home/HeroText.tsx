"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SEQUENCE_EN = ["Sky Expo", "Where", "moments", "become", "legacy"];
const SEQUENCE_AR = ["سكاي اكسبو", "حيث", "تتحول", "اللحظات", "إلى إرث"];
const WORD_DELAYS = [0, 1.5, 2.8, 3.8, 4.8]; // seconds each word appears

export function HeroText() {
  const { lang } = useLanguage();
  const [visibleWords, setVisibleWords] = useState<boolean[]>([false, false, false, false, false]);
  const sequence = lang === "en" ? SEQUENCE_EN : SEQUENCE_AR;
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear previous timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleWords([false, false, false, false, false]);

    WORD_DELAYS.forEach((delay, i) => {
      const t = setTimeout(() => {
        setVisibleWords((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay * 1000 + 1200); // +1200ms for the logo fade first
      timersRef.current.push(t);
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, [lang]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
      {/* Brand name */}
      <div className="overflow-hidden mb-6">
        <h1
          className="text-7xl md:text-9xl font-light tracking-[0.15em] uppercase"
          style={{
            transform: visibleWords[0] ? "translateY(0)" : "translateY(60px)",
            opacity: visibleWords[0] ? 1 : 0,
            filter: visibleWords[0] ? "blur(0px)" : "blur(12px)",
            transition: "transform 1.4s cubic-bezier(0.77,0,0.175,1), opacity 1.4s cubic-bezier(0.77,0,0.175,1), filter 1.4s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          {sequence[0]}
        </h1>
      </div>

      {/* Tagline — words appear one by one */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {sequence.slice(1).map((word, i) => (
          <span
            key={`${lang}-${i}`}
            className="text-2xl md:text-4xl font-extralight text-white/80 tracking-wider"
            style={{
              transform: visibleWords[i + 1] ? "translateY(0)" : "translateY(30px)",
              opacity: visibleWords[i + 1] ? 1 : 0,
              filter: visibleWords[i + 1] ? "blur(0px)" : "blur(8px)",
              transition: "transform 1.2s cubic-bezier(0.77,0,0.175,1), opacity 1.2s cubic-bezier(0.77,0,0.175,1), filter 1.2s cubic-bezier(0.77,0,0.175,1)",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Sub-tagline */}
      <p
        className="mt-8 text-sm tracking-[0.4em] uppercase text-white/30"
        style={{
          opacity: visibleWords[4] ? 1 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      >
        {lang === "en" ? "Where moments become legacy" : "حيث تتحول اللحظات إلى إرث"}
      </p>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: visibleWords[4] ? 1 : 0,
          transition: "opacity 2s ease 1s",
        }}
      >
        <span className="text-xs tracking-widest text-white/30 uppercase">
          {lang === "en" ? "Scroll" : "اسحب"}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

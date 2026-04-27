"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="relative text-white/50 hover:text-white text-sm tracking-widest uppercase transition-colors duration-400 px-2 py-1"
      data-cursor-hover
      aria-label="Toggle language"
    >
      {lang === "en" ? "عربي" : "EN"}
    </button>
  );
}

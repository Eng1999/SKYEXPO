"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ar";
type Dir = "ltr" | "rtl";

interface LanguageContextValue {
  lang: Lang;
  dir: Dir;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  dir: "ltr",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("skyexpo-lang") as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next = l === "en" ? "ar" : "en";
      localStorage.setItem("skyexpo-lang", next);
      return next;
    });

  const dir: Dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, dir, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

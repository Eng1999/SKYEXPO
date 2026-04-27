"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function HtmlDirSync() {
  const { lang, dir } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return null;
}

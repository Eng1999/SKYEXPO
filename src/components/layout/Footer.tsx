"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <footer
      dir={isAr ? "rtl" : "ltr"}
      className="relative border-t"
      style={{ background: "#060608", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 md:px-16 py-6">

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()}{" "}
            {isAr
              ? "سكاي إكسبو لحلول الفعاليات. جميع الحقوق محفوظة."
              : "SKY EXPO Event Solutions. All rights reserved."}
          </p>
          <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.2)" }}>
            {isAr ? "السجل التجاري" : "CR"}: 7002257322
          </p>
        </div>

      </div>
    </footer>
  );
}

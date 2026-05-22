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

        {/* ── Developer Signature ── */}
        <div className="mt-8 flex justify-center">
          <a
            href="tel:0502230235"
            className="group relative flex items-center gap-4 px-6 py-3 transition-all duration-500"
            style={{ borderTop: "none" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Left line */}
            <span
              className="block h-px w-8 transition-all duration-500 group-hover:w-12"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />

            {/* Monogram */}
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-wide shrink-0 transition-all duration-500 group-hover:scale-110"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              AH
            </span>

            {/* Text block */}
            <div className="text-center">
              <p
                className="text-[9px] tracking-[0.5em] uppercase font-light transition-colors duration-500 group-hover:text-white/40"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {isAr ? "تصميم وبرمجة" : "Designed & Developed by"}
              </p>
              <p
                className="text-[11px] tracking-[0.25em] uppercase font-medium mt-1 transition-colors duration-500 group-hover:text-white/60"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Eng. Alhassan Ahmed
              </p>
            </div>

            {/* Right line */}
            <span
              className="block h-px w-8 transition-all duration-500 group-hover:w-12"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
          </a>
        </div>

      </div>
    </footer>
  );
}

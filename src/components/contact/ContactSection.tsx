"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-8"
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 2s ease, transform 2s cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        <p className="text-xs tracking-[0.6em] uppercase text-white/20 mb-10">
          {lang === "en" ? "Let's Connect" : "لنتواصل"}
        </p>

        <h2 className="text-5xl md:text-8xl font-extralight text-white leading-none mb-6">
          {lang === "en" ? (
            <>
              Let&apos;s build
              <br />
              <span style={{ color: "var(--accent)" }}>something</span>
              <br />
              remarkable.
            </>
          ) : (
            <>
              لنبني
              <br />
              <span style={{ color: "var(--accent)" }}>شيئاً</span>
              <br />
              استثنائياً.
            </>
          )}
        </h2>

        <p className="text-sm text-white/30 tracking-widest mt-12 mb-16">
          {lang === "en"
            ? "hello@skyexpo.com"
            : "hello@skyexpo.com"}
        </p>

        <a
          href="mailto:hello@skyexpo.com"
          className="relative inline-block text-xs tracking-[0.4em] uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-10 py-5 transition-all duration-700"
          style={{
            boxShadow: "0 0 0 0 var(--accent)",
            transition: "all 0.7s cubic-bezier(0.77,0,0.175,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 30px color-mix(in srgb, var(--accent) 30%, transparent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
          data-cursor-hover
        >
          {lang === "en" ? "Get in touch" : "تواصل معنا"}
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function JoinSection() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0808] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
      {/* Deep navy authority glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #23165040 0%, transparent 60%)",
        }}
      />

      {/* Decorative ring */}
      <div
        className="absolute"
        style={{
          width: "80vw",
          height: "80vw",
          border: "1px solid rgba(35,22,80,0.4)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "60vw",
          border: "1px solid rgba(35,22,80,0.25)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div
        className="relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 2s ease, transform 2s cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        <p className="text-xs tracking-[0.6em] uppercase text-white/20 mb-10">
          {lang === "en" ? "Join Our Team" : "انضم إلى فريقنا"}
        </p>

        <h2 className="text-5xl md:text-8xl font-extralight text-white leading-none mb-6">
          {lang === "en" ? (
            <>
              Build the
              <br />
              <span style={{ color: "#231650", textShadow: "0 0 40px #231650, 0 0 80px #231650aa" }}>
                future
              </span>
              <br />
              with us.
            </>
          ) : (
            <>
              ابنِ
              <br />
              <span style={{ color: "#b8a8e8", textShadow: "0 0 40px #231650, 0 0 80px #231650aa" }}>
                المستقبل
              </span>
              <br />
              معنا.
            </>
          )}
        </h2>

        <p className="text-sm text-white/30 max-w-md mx-auto mt-8 leading-relaxed">
          {lang === "en"
            ? "We're always looking for exceptional talent to join our world-class team."
            : "نبحث دائماً عن مواهب استثنائية للانضمام إلى فريقنا العالمي."}
        </p>

        <a
          href="mailto:careers@skyexpo.com"
          className="inline-block mt-12 text-xs tracking-[0.4em] uppercase text-white/50 hover:text-white border border-white/10 hover:border-[#231650] px-10 py-5 transition-all duration-700"
          style={{ boxShadow: "0 0 0 transparent" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px #23165066";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
          data-cursor-hover
        >
          {lang === "en" ? "Apply Now" : "قدّم الآن"}
        </a>
      </div>
    </div>
  );
}

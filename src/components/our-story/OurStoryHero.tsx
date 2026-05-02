"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function OurStoryHero() {
  const { lang } = useLanguage();
  const [vis, setVis] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 300);
    return () => clearTimeout(t);
  }, []);

  const in1: React.CSSProperties = {
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 1.2s cubic-bezier(0.77,0,0.175,1), transform 1.2s cubic-bezier(0.77,0,0.175,1)",
  };
  const in2: React.CSSProperties = {
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 1.2s cubic-bezier(0.77,0,0.175,1) 0.2s, transform 1.2s cubic-bezier(0.77,0,0.175,1) 0.2s",
  };
  const in3: React.CSSProperties = {
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 1.2s cubic-bezier(0.77,0,0.175,1) 0.4s, transform 1.2s cubic-bezier(0.77,0,0.175,1) 0.4s",
  };

  return (
    <section
      className="relative min-h-screen flex items-end pb-20 overflow-hidden bg-black"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 70% 30%, #FED17210 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 20% 80%, #23165018 0%, transparent 60%)",
        }}
      />

      {/* Decorative circle */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
        style={{
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          border: "1px solid rgba(254,209,114,0.06)",
        }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3"
        style={{
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          border: "1px solid rgba(254,209,114,0.04)",
        }}
      />

      <div className="relative z-10 w-full px-16">
        {/* Page label */}
        <div style={in1}>
          <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-8">
            {isAr ? "قصتنا" : "Our Story"}
          </p>
        </div>

        {/* Big headline */}
        <div style={in2}>
          <div
            className="font-extralight tracking-tight uppercase text-white mb-6"
            style={{
              fontSize: "clamp(3rem,8vw,9rem)",
              lineHeight: isAr ? 1.2 : 0.9,
            }}
          >
            {isAr ? (
              <>
                <span className="block">صنّاع</span>
                <span className="block" style={{ color: "#FED172" }}>اللحظات</span>
                <span className="block" style={{ color: "rgba(255,255,255,0.65)" }}>منذ ٢٠٠٩</span>
              </>
            ) : (
              <>
                <span className="block">Crafting</span>
                <span className="block" style={{ color: "#FED172" }}>Moments</span>
                <span className="block" style={{ color: "rgba(255,255,255,0.65)" }}>Since 2009</span>
              </>
            )}
          </div>
        </div>

        {/* Sub-description */}
        <div style={in3} className="max-w-xl">
          <p className="text-base font-light leading-relaxed text-white/45">
            {isAr
              ? "سكاي إكسبو شركة سعودية رائدة في صناعة المعارض وإدارة الفعاليات، تأسست عام ٢٠٠٩ بهدف تقديم تجارب استثنائية تجمع بين الإبداع والكفاءة والأمان. نعمل من الرياض وجدة والدمام لنخدم عملاءنا في المملكة والعالم."
              : "Sky Expo is a leading Saudi company in exhibition production and event management, founded in 2009 with a mission to deliver extraordinary experiences that combine creativity, efficiency, and safety. We operate from Riyadh, Jeddah, and Dammam — serving clients across the Kingdom and beyond."}
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-16 flex flex-col items-center gap-2"
          style={{ opacity: vis ? 0.3 : 0, transition: "opacity 2s ease 1s" }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-white">
            {isAr ? "اسحب" : "Scroll"}
          </span>
          <div className="w-px h-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent animate-[scrollBar_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}

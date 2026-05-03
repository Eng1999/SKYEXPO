"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

const MSG_EN = `Peace be upon you,

Our success in the conferences, exhibitions, and events industry has not come by chance. It is the result of integrated efforts from diverse talents united by one goal: excellence and creating impact.

We believe our true strength lies in the diversity of our team's expertise. Together, we share knowledge, innovate, and deliver experiences that reflect the ambition of this nation.

Aligned with Saudi Vision 2030, we are committed to empowering local talent while leveraging global expertise to build a world-class events industry.

We do not just organize events… we create value, craft experiences, and leave a lasting impact.

Thank you.`;

const MSG_AR = `السلام عليكم ورحمة الله وبركاته،

نجاحنا في قطاع المؤتمرات والمعارض لم يكن وليد الصدفة، بل هو نتيجة تكامل الجهود بين كفاءات متعددة، اجتمعت على هدف واحد: التميز وصناعة الأثر.

نؤمن أن قوتنا الحقيقية تكمن في تنوع خبرات فريقنا، حيث يعمل الجميع بروح واحدة، ينقلون المعرفة، ويبتكرون، ويصنعون تجارب تليق بطموح هذا الوطن.

وانطلاقًا من رؤية السعودية 2030، نحرص على تمكين الكفاءات الوطنية، والاستفادة من الخبرات العالمية، لبناء صناعة فعاليات تنافس على مستوى العالم.

نحن لا نبني فعاليات فقط… بل نبني قيمة، ونصنع تجربة، ونترك أثرًا.

شكرًا لكم.`;

export function CEOMessage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const paragraphs = (isAr ? MSG_AR : MSG_EN).split("\n\n").filter(Boolean);

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen flex items-center"
      style={{ background: "#050505" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(184,58,20,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
        <div
          className={`flex flex-col ${isAr ? "md:flex-row-reverse" : "md:flex-row"} gap-16 md:gap-24 items-center`}
        >

          {/* ── Photo column ── */}
          <div
            className="shrink-0 flex flex-col items-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0)"
                : isAr ? "translateX(40px)" : "translateX(-40px)",
              transition:
                "opacity 1.2s cubic-bezier(0.77,0,0.175,1), transform 1.2s cubic-bezier(0.77,0,0.175,1)",
            }}
          >
            {/* Portrait frame */}
            <div className="relative" style={{ width: "clamp(200px,26vw,320px)" }}>
              {/* Gradient border */}
              <div
                className="absolute -inset-[3px] rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #B83A14 0%, #FED172 50%, #231650 100%)",
                  opacity: 0.65,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ceo.jpg"
                alt="CEO & Chairman — Sky Expo"
                className="relative rounded-2xl w-full"
                style={{
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "brightness(0.92) contrast(1.05)",
                }}
              />
            </div>

            {/* Name + title */}
            <div className="mt-6 text-center">
              <p
                className="text-sm font-semibold text-white"
                style={{ letterSpacing: "0.12em" }}
              >
                {isAr ? "المالك والرئيس التنفيذي" : "CEO & Chairman"}
              </p>
              <p
                className="text-[10px] tracking-[0.45em] uppercase mt-1"
                style={{ color: "#B83A14" }}
              >
                SKY EXPO
              </p>
              <div
                className="mx-auto mt-4 h-px"
                style={{
                  width: 80,
                  background:
                    "linear-gradient(to right, transparent, #B83A14, transparent)",
                }}
              />
            </div>
          </div>

          {/* ── Message column ── */}
          <div
            className="flex-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition:
                "opacity 1.2s 0.28s cubic-bezier(0.77,0,0.175,1), transform 1.2s 0.28s cubic-bezier(0.77,0,0.175,1)",
            }}
          >
            {/* Label */}
            <p
              className="text-[10px] tracking-[0.55em] uppercase mb-8"
              style={{ color: "#B83A14" }}
            >
              {isAr ? "كلمة القيادة" : "Chairman's Message"}
            </p>

            {/* Opening quote */}
            <div
              className="text-[5rem] leading-none font-bold select-none mb-1"
              style={{
                color: "rgba(184,58,20,0.2)",
                fontFamily: "Georgia, serif",
                lineHeight: 0.75,
              }}
            >
              &ldquo;
            </div>

            {/* Paragraphs */}
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    fontSize:
                      i === 0
                        ? "clamp(0.95rem,1.35vw,1.1rem)"
                        : "clamp(0.85rem,1.05vw,0.97rem)",
                    color:
                      i === 0
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.6)",
                    lineHeight: isAr ? 2.1 : 1.9,
                    fontWeight: i === 0 ? 400 : 300,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(14px)",
                    transition: `opacity 1s ${0.38 + i * 0.1}s ease, transform 1s ${0.38 + i * 0.1}s ease`,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Closing signature */}
            <div
              className="mt-10 pt-8 flex items-center gap-4"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                opacity: visible ? 1 : 0,
                transition: "opacity 1.4s 1s ease",
              }}
            >
              <div
                className="h-px"
                style={{
                  width: 72,
                  background: "linear-gradient(to right, #B83A14, transparent)",
                }}
              />
              <p
                className="text-[11px] font-light tracking-[0.4em] uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {isAr ? "سكاي إكسبو — ١٥ عامًا من التميز" : "Sky Expo — 15 Years of Excellence"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

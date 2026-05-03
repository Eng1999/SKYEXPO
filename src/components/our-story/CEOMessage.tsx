"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

const MSG_EN = [
  "Peace be upon you,",
  "Our success in the conferences, exhibitions, and events industry has not come by chance. It is the result of integrated efforts from diverse talents united by one goal: excellence and creating impact.",
  "We believe our true strength lies in the diversity of our team's expertise. Together, we share knowledge, innovate, and deliver experiences that reflect the ambition of this nation.",
  "Aligned with Saudi Vision 2030, we are committed to empowering local talent while leveraging global expertise to build a world-class events industry.",
  "We do not just organize events… we create value, craft experiences, and leave a lasting impact.",
  "Thank you.",
];

const MSG_AR = [
  "السلام عليكم ورحمة الله وبركاته،",
  "نجاحنا في قطاع المؤتمرات والمعارض لم يكن وليد الصدفة، بل هو نتيجة تكامل الجهود بين كفاءات متعددة، اجتمعت على هدف واحد: التميز وصناعة الأثر.",
  "نؤمن أن قوتنا الحقيقية تكمن في تنوع خبرات فريقنا، حيث يعمل الجميع بروح واحدة، ينقلون المعرفة، ويبتكرون، ويصنعون تجارب تليق بطموح هذا الوطن.",
  "وانطلاقًا من رؤية السعودية 2030، نحرص على تمكين الكفاءات الوطنية، والاستفادة من الخبرات العالمية، لبناء صناعة فعاليات تنافس على مستوى العالم.",
  "نحن لا نبني فعاليات فقط… بل نبني قيمة، ونصنع تجربة، ونترك أثرًا.",
  "شكرًا لكم.",
];

export function CEOMessage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible]   = useState(false);
  const [imgErr, setImgErr]     = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const paragraphs = isAr ? MSG_AR : MSG_EN;

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden"
      style={{ background: "#06060a" }}
    >
      {/* ── Background texture ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background: isAr
            ? "radial-gradient(ellipse 55% 70% at 80% 50%, rgba(184,58,20,0.09) 0%, transparent 65%)"
            : "radial-gradient(ellipse 55% 70% at 20% 50%, rgba(184,58,20,0.09) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg,transparent 0px,transparent 80px,rgba(255,255,255,0.012) 80px,rgba(255,255,255,0.012) 81px)",
        }} />
      </div>

      {/* ── Top divider ── */}
      <div className="relative h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,58,20,0.4), transparent)" }} />

      <div className="relative w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16 py-20 md:py-28">

        {/* Section eyebrow */}
        <div
          className="mb-14 md:mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <p className="text-[10px] tracking-[0.6em] uppercase font-medium"
             style={{ color: "#B83A14" }}>
            {isAr ? "كلمة القيادة" : "Chairman's Message"}
          </p>
          <div className="mt-3 h-px w-16" style={{ background: "linear-gradient(to right, #B83A14, transparent)" }} />
        </div>

        <div className={`flex flex-col ${isAr ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-start`}>

          {/* ── PHOTO COLUMN ── */}
          <div
            className="shrink-0 flex flex-col items-center w-full lg:w-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : isAr ? "translateX(50px)" : "translateX(-50px)",
              transition: "opacity 1.2s cubic-bezier(0.77,0,0.175,1), transform 1.2s cubic-bezier(0.77,0,0.175,1)",
            }}
          >
            {/* Frame */}
            <div
              className="relative"
              style={{ width: "clamp(200px,24vw,300px)", maxWidth: "300px" }}
            >
              {/* Glow */}
              <div style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "24px",
                background: "radial-gradient(ellipse at center, rgba(184,58,20,0.25) 0%, transparent 70%)",
                filter: "blur(20px)",
              }} />

              {/* Gradient border ring */}
              <div
                className="absolute -inset-[2px] rounded-2xl"
                style={{ background: "linear-gradient(145deg, #B83A14 0%, #FED172 45%, #231650 100%)", opacity: 0.7 }}
              />

              {/* Photo or fallback */}
              {!imgErr ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/ceo.jpg"
                  alt="CEO & Chairman — Sky Expo"
                  onError={() => setImgErr(true)}
                  className="relative rounded-2xl w-full block"
                  style={{
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "brightness(0.93) contrast(1.04)",
                  }}
                />
              ) : (
                /* Artistic fallback */
                <div
                  className="relative rounded-2xl w-full flex flex-col items-center justify-end"
                  style={{
                    aspectRatio: "3/4",
                    background: "linear-gradient(160deg, #1a0e08 0%, #0d0810 60%, #090610 100%)",
                  }}
                >
                  {/* Abstract CEO silhouette */}
                  <div style={{
                    position: "absolute", top: "18%", left: "50%",
                    transform: "translateX(-50%)",
                    width: 80, height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(184,58,20,0.3), rgba(254,209,114,0.2))",
                    border: "1px solid rgba(184,58,20,0.3)",
                  }} />
                  <div style={{
                    position: "absolute", top: "42%", left: "50%",
                    transform: "translateX(-50%)",
                    width: 120, height: 90,
                    borderRadius: "60px 60px 0 0",
                    background: "linear-gradient(180deg, rgba(184,58,20,0.2), transparent)",
                    border: "1px solid rgba(184,58,20,0.2)",
                    borderBottom: "none",
                  }} />
                  <div className="relative pb-6 text-center">
                    <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(184,58,20,0.6)" }}>
                      PHOTO COMING SOON
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Title block */}
            <div className="mt-6 text-center">
              <p className="text-sm font-semibold text-white" style={{ letterSpacing: "0.1em" }}>
                {isAr ? "المالك والرئيس التنفيذي" : "CEO & Chairman"}
              </p>
              <p className="text-[10px] tracking-[0.45em] uppercase mt-1" style={{ color: "#B83A14" }}>
                SKY EXPO
              </p>
              <div className="mx-auto mt-4 h-px" style={{
                width: 72,
                background: "linear-gradient(to right, transparent, #B83A14, transparent)",
              }} />
            </div>
          </div>

          {/* ── MESSAGE COLUMN ── */}
          <div
            className="flex-1 min-w-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 1.2s 0.22s cubic-bezier(0.77,0,0.175,1), transform 1.2s 0.22s cubic-bezier(0.77,0,0.175,1)",
            }}
          >
            {/* Large decorative quote mark */}
            <div
              className="select-none mb-2"
              style={{
                fontSize: "clamp(4rem,8vw,7rem)",
                lineHeight: 0.8,
                color: "rgba(184,58,20,0.18)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                marginInlineStart: isAr ? 0 : "-0.1em",
              }}
            >
              &ldquo;
            </div>

            {/* Message paragraphs */}
            <div className="space-y-4 md:space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: i === 0
                      ? "clamp(1rem,1.5vw,1.15rem)"
                      : "clamp(0.875rem,1.1vw,1rem)",
                    color: i === 0
                      ? "rgba(255,255,255,0.92)"
                      : i === paragraphs.length - 1
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.65)",
                    lineHeight: isAr ? 2.1 : 1.95,
                    fontWeight: i === 0 ? 500 : 300,
                    fontStyle: i === 0 ? "italic" : "normal",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 1s ${0.3 + i * 0.12}s ease, transform 1s ${0.3 + i * 0.12}s ease`,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Bottom signature bar */}
            <div
              className="mt-10 pt-8"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                opacity: visible ? 1 : 0,
                transition: "opacity 1.5s 1.1s ease",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-16" style={{ background: "linear-gradient(to right, #B83A14, transparent)" }} />
                <p className="text-[10px] font-light tracking-[0.45em] uppercase"
                   style={{ color: "rgba(255,255,255,0.28)" }}>
                  {isAr ? "سكاي إكسبو — ١٥ عامًا من التميز" : "Sky Expo — 15 Years of Excellence"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div className="relative h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
    </section>
  );
}

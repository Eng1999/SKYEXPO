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

        <div className={`flex flex-col ${isAr ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center`}>

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
              style={{ width: "clamp(210px,24vw,300px)", maxWidth: "300px" }}
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

              {/* Fallback — always rendered behind the photo */}
              <div
                className="relative rounded-2xl w-full flex flex-col items-center justify-end overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(160deg, #1c0e06 0%, #100810 55%, #07060f 100%)",
                }}
              >
                {/* Silhouette shapes */}
                <div style={{
                  position: "absolute", top: "15%", left: "50%",
                  transform: "translateX(-50%)",
                  width: 88, height: 88, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(184,58,20,0.35), rgba(254,209,114,0.15))",
                  border: "1px solid rgba(184,58,20,0.25)",
                }} />
                <div style={{
                  position: "absolute", top: "40%", left: "50%",
                  transform: "translateX(-50%)",
                  width: 130, height: 100, borderRadius: "65px 65px 0 0",
                  background: "linear-gradient(180deg, rgba(184,58,20,0.18), transparent)",
                  border: "1px solid rgba(184,58,20,0.18)",
                  borderBottom: "none",
                }} />
                <p className="relative pb-5 text-[8px] tracking-[0.5em] uppercase"
                   style={{ color: "rgba(184,58,20,0.45)" }}>
                  {isAr ? "الصورة قريبًا" : "PHOTO COMING SOON"}
                </p>
              </div>

              {/* Real photo — overlays fallback when loaded */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ceo.jpg"
                alt=""
                aria-hidden="true"
                onError={() => setImgErr(true)}
                className="absolute inset-0 rounded-2xl w-full h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "brightness(0.93) contrast(1.04)",
                  display: imgErr ? "none" : "block",
                }}
              />
            </div>

            {/* Title block */}
            <div className="mt-6 text-center" dir="ltr">
              <p
                className="text-sm font-semibold text-white"
                style={{ letterSpacing: isAr ? "0.04em" : "0.1em", fontFamily: isAr ? "inherit" : undefined }}
              >
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
                color: "rgba(184,58,20,0.2)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                textAlign: isAr ? "right" : "left",
              }}
            >
              {isAr ? "\u201D" : "\u201C"}
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

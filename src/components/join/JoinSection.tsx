"use client";

import { useLanguage } from "@/context/LanguageContext";

/* ── Why SKY EXPO ─────────────────────────────────────────────────────── */
const WHY = [
  {
    numEn: "01",
    numAr: "٠١",
    titleEn: "Saudi-first talent",
    titleAr: "كفاءات سعودية أولاً",
    bodyEn: "A team built on ambition, skill, and a shared vision for Vision 2030.",
    bodyAr: "فريق مبني على الطموح والكفاءة ورؤية مشتركة تتماشى مع رؤية 2030.",
  },
  {
    numEn: "02",
    numAr: "٠٢",
    titleEn: "World-class projects",
    titleAr: "مشاريع على مستوى عالمي",
    bodyEn: "Work alongside top-tier clients — Aramco, PIF, NEOM, Flynas, and more.",
    bodyAr: "اعمل مع عملاء من الصف الأول — أرامكو، صندوق الاستثمارات العامة، نيوم، فلاي ناس، وغيرهم.",
  },
  {
    numEn: "03",
    numAr: "٠٣",
    titleEn: "Creative freedom",
    titleAr: "حرية إبداعية",
    bodyEn: "We trust our people to own their work. Your ideas shape the outcome.",
    bodyAr: "نثق في موظفينا ونمنحهم ملكية عملهم. أفكارك تُشكّل النتيجة.",
  },
  {
    numEn: "04",
    numAr: "٠٤",
    titleEn: "Culture of excellence",
    titleAr: "ثقافة التميّز",
    bodyEn: "A disciplined, precise environment where quality is non-negotiable.",
    bodyAr: "بيئة منضبطة ودقيقة، الجودة فيها ليست خياراً.",
  },
];

const ACCENT = "#231650";

/* ── Main ─────────────────────────────────────────────────────────────── */
export function JoinSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="bg-black min-h-screen" dir={isAr ? "rtl" : "ltr"}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-[70vh] flex flex-col justify-end px-16 pb-24 pt-36 overflow-hidden">
        {/* Navy glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}35 0%, transparent 60%)`,
          }}
        />

        {/* Decorative grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden>
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.6em] uppercase font-medium mb-6"
             style={{ color: ACCENT }}>
            {isAr ? "الانضمام إلى سكاي اكسبو" : "Join SKY EXPO"}
          </p>
          <h1
            className="font-bold uppercase leading-[0.88] mb-8"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 10rem)",
              color: "#ffffff",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
            }}
          >
            {isAr ? (
              <>
                اصنع
                <br />
                <span style={{ color: ACCENT }}>شيئاً</span>
                <br />
                يدوم
              </>
            ) : (
              <>
                BUILD
                <br />
                <span style={{ color: ACCENT }}>WHAT</span>
                <br />
                LASTS
              </>
            )}
          </h1>
          <p className="text-base text-white/70 max-w-md font-light leading-relaxed">
            {isAr
              ? "لسنا مجرد شركة فعاليات — نحن بيت إبداعي يصنع لحظات تبقى في الذاكرة. إذا كنت تؤمن بالتميّز، فمكانك هنا."
              : "We're not just an events company — we're a creative house that builds moments that endure. If you believe in excellence, you belong here."}
          </p>
        </div>
      </div>

      {/* ── Why join ──────────────────────────────────────────────────── */}
      <div className="px-16 py-24 border-t border-white/[0.06]">
        <p className="text-[11px] tracking-[0.6em] uppercase font-medium mb-16"
           style={{ color: ACCENT }}>
          {isAr ? "لماذا سكاي اكسبو؟" : "Why SKY EXPO"}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY.map((w) => (
            <div key={w.numEn} className="group">
              <p className="text-[11px] tracking-[0.4em] mb-6 font-medium"
                 style={{ color: ACCENT }}>
                {isAr ? w.numAr : w.numEn}
              </p>
              <p className="text-base font-semibold text-white mb-3">
                {isAr ? w.titleAr : w.titleEn}
              </p>
              <p className="text-sm text-white/65 leading-relaxed font-light">
                {isAr ? w.bodyAr : w.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team placeholder — content coming soon ─────────────────────── */}
      {/* Team section will be added here once assets are provided */}

      {/* ── Quote strip ───────────────────────────────────────────────── */}
      <div
        className="px-16 py-20 border-t border-white/[0.06]"
        style={{ background: `${ACCENT}08` }}
      >
        <p
          className="text-2xl md:text-4xl font-extralight text-center leading-relaxed"
          style={{ color: `${ACCENT}cc` }}
        >
          {isAr
            ? '"نحن لا نبني فعاليات — نحن نبني ذكريات لا تُنسى."'
            : '"We don\'t build events — we build memories."'}
        </p>
        <p className="text-center text-[10px] tracking-[0.5em] uppercase text-white/20 mt-6">
          — SKY EXPO
        </p>
      </div>
    </div>
  );
}

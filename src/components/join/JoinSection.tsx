"use client";

import { useLanguage } from "@/context/LanguageContext";

/* ── Why SKY EXPO ─────────────────────────────────────────────────────── */
const WHY = [
  {
    numEn: "01", numAr: "٠١",
    titleEn: "Saudi-first talent",   titleAr: "كفاءات سعودية أولاً",
    bodyEn: "A team built on ambition, skill, and a shared vision for Vision 2030.",
    bodyAr: "فريق مبني على الطموح والكفاءة ورؤية مشتركة تتماشى مع رؤية 2030.",
  },
  {
    numEn: "02", numAr: "٠٢",
    titleEn: "World-class projects", titleAr: "مشاريع على مستوى عالمي",
    bodyEn: "Work alongside top-tier clients — Aramco, PIF, NEOM, Flynas, and more.",
    bodyAr: "اعمل مع عملاء من الصف الأول — أرامكو، صندوق الاستثمارات العامة، نيوم، فلاي ناس.",
  },
  {
    numEn: "03", numAr: "٠٣",
    titleEn: "Creative freedom",     titleAr: "حرية إبداعية",
    bodyEn: "We trust our people to own their work. Your ideas shape the outcome.",
    bodyAr: "نثق في موظفينا ونمنحهم ملكية عملهم. أفكارك تُشكّل النتيجة.",
  },
  {
    numEn: "04", numAr: "٠٤",
    titleEn: "Culture of excellence",titleAr: "ثقافة التميّز",
    bodyEn: "A disciplined, precise environment where quality is non-negotiable.",
    bodyAr: "بيئة منضبطة ودقيقة، الجودة فيها ليست خياراً.",
  },
];

/* Visible accent — cyan-blue from the SKY EXPO logo */
const ACCENT = "#4CC8E8";

/* ── Main ─────────────────────────────────────────────────────────────── */
export function JoinSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="bg-black min-h-screen" dir={isAr ? "rtl" : "ltr"}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-[70vh] flex flex-col justify-end px-16 pb-24 pt-36 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(76,200,232,0.08) 0%, transparent 60%)` }} />

        {/* Decorative grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden>
          <defs>
            <pattern id="grid-join" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-join)" />
        </svg>

        <div className="relative z-10">
          {/* Eyebrow — visible cyan */}
          <p className="text-[11px] tracking-[0.6em] uppercase font-semibold mb-6"
             style={{ color: ACCENT }}>
            {isAr ? "الانضمام إلى سكاي اكسبو" : "Join SKY EXPO"}
          </p>

          {/* Big heading — WHITE, each line as block span for tight control */}
          <div
            className="font-bold mb-10"
            style={{
              fontSize: isAr ? "clamp(3rem,8.5vw,9.5rem)" : "clamp(3.5rem,9vw,10rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              lineHeight: isAr ? 1.15 : 0.92,
            }}
          >
            {isAr ? (
              <>
                <span className="block text-white">اصنع</span>
                <span className="block" style={{ color: ACCENT }}>شيئاً</span>
                <span className="block text-white">يدوم</span>
              </>
            ) : (
              <>
                <span className="block text-white uppercase tracking-tight">BUILD</span>
                <span className="block uppercase tracking-tight" style={{ color: ACCENT }}>WHAT</span>
                <span className="block text-white uppercase tracking-tight">LASTS</span>
              </>
            )}
          </div>

          {/* Description — visible white */}
          <p className="text-base max-w-lg font-light leading-relaxed"
             style={{ color: "rgba(255,255,255,0.75)" }}>
            {isAr
              ? "لسنا مجرد شركة فعاليات — نحن بيت إبداعي يصنع لحظات تبقى في الذاكرة. إذا كنت تؤمن بالتميّز، فمكانك هنا."
              : "We're not just an events company — we're a creative house that builds moments that endure. If you believe in excellence, you belong here."}
          </p>
        </div>
      </div>

      {/* ── Why join ──────────────────────────────────────────────────── */}
      <div className="px-16 py-24 border-t border-white/[0.06]">

        {/* Section label — visible */}
        <p className="text-[12px] tracking-[0.55em] uppercase font-semibold mb-16"
           style={{ color: ACCENT }}>
          {isAr ? "لماذا سكاي اكسبو؟" : "Why SKY EXPO"}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {WHY.map((w) => (
            <div key={w.numEn}>
              {/* Number */}
              <p className="text-[13px] tracking-[0.35em] font-bold mb-5"
                 style={{ color: ACCENT }}>
                {isAr ? w.numAr : w.numEn}
              </p>
              {/* Title — full white */}
              <p className="text-lg font-semibold text-white mb-3 leading-snug">
                {isAr ? w.titleAr : w.titleEn}
              </p>
              {/* Body — visible grey */}
              <p className="text-sm leading-relaxed font-light"
                 style={{ color: "rgba(255,255,255,0.70)" }}>
                {isAr ? w.bodyAr : w.bodyEn}
              </p>
              {/* Thin accent line */}
              <div className="mt-5 h-px w-8" style={{ background: ACCENT, opacity: 0.5 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Team placeholder ────────────────────────────────────────────── */}
      {/* Team section will be added here once assets are provided */}

      {/* ── Quote strip ───────────────────────────────────────────────── */}
      <div className="px-16 py-20 border-t border-white/[0.06]"
           style={{ background: "rgba(76,200,232,0.04)" }}>
        <p className="text-2xl md:text-4xl font-light text-center leading-relaxed text-white">
          {isAr
            ? '"نحن لا نبني فعاليات — نحن نبني ذكريات لا تُنسى."'
            : '"We don\'t build events — we build memories."'}
        </p>
        <p className="text-center text-[11px] tracking-[0.55em] uppercase mt-6 font-medium"
           style={{ color: ACCENT }}>
          — SKY EXPO
        </p>
      </div>
    </div>
  );
}

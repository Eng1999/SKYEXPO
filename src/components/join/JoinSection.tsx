"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/lib/social";

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

/* ── Open roles ───────────────────────────────────────────────────────── */
const ROLES = [
  { dept: "Production", deptAr: "الإنتاج",      titleEn: "Senior Event Producer",         titleAr: "منتج فعاليات أول",          type: "Full-time", loc: "Riyadh" },
  { dept: "Creative",   deptAr: "الإبداع",       titleEn: "Art Director — Exhibitions",    titleAr: "مدير فني — معارض",           type: "Full-time", loc: "Riyadh" },
  { dept: "Tech",       deptAr: "التقنية",       titleEn: "AV & Lighting Specialist",      titleAr: "متخصص صوت وصورة وإضاءة",    type: "Full-time", loc: "Jeddah" },
  { dept: "Media",      deptAr: "الإعلام",       titleEn: "Videographer & Editor",         titleAr: "مصور ومونتير",              type: "Full-time", loc: "Riyadh" },
  { dept: "Design",     deptAr: "التصميم",       titleEn: "Motion Graphics Designer",      titleAr: "مصمم جرافيك متحرك",         type: "Contract", loc: "Remote" },
  { dept: "Operations", deptAr: "العمليات",     titleEn: "Project Coordinator",           titleAr: "منسق مشاريع",               type: "Full-time", loc: "Riyadh" },
];

const ACCENT = "#231650";

/* ── Role card ────────────────────────────────────────────────────────── */
function RoleCard({ role, isAr }: { role: typeof ROLES[0]; isAr: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group border-b border-white/[0.06] py-6 px-4 cursor-pointer transition-all duration-400"
      style={{
        background: hovered ? `${ACCENT}08` : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          {/* Dept badge */}
          <span
            className="text-[9px] tracking-[0.4em] uppercase shrink-0 px-2 py-1 rounded"
            style={{
              color: ACCENT,
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}25`,
            }}
          >
            {isAr ? role.deptAr : role.dept}
          </span>

          {/* Title */}
          <p
            className="text-sm font-light text-white/60 transition-colors duration-300 truncate"
            style={{ color: hovered ? "#fff" : undefined }}
          >
            {isAr ? role.titleAr : role.titleEn}
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <span className="text-[10px] tracking-widest text-white/25 uppercase hidden sm:block">
            {role.type}
          </span>
          <span className="text-[10px] tracking-widest text-white/25 uppercase hidden sm:block">
            {role.loc}
          </span>

          {/* Arrow */}
          <div
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-400"
            style={{
              borderColor: hovered ? `${ACCENT}60` : "rgba(255,255,255,0.08)",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke={hovered ? ACCENT : "rgba(255,255,255,0.3)"} strokeWidth="1.5">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 mb-6">
            {isAr ? "الانضمام إلى سكاي اكسبو" : "Join SKY EXPO"}
          </p>
          <h1
            className="font-extralight uppercase leading-[0.88] mb-8"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 10rem)",
              color: ACCENT,
              textShadow: `0 0 120px ${ACCENT}60, 0 0 40px ${ACCENT}30`,
            }}
          >
            {isAr ? (
              <>
                اصنع
                <br />
                شيئاً
                <br />
                يدوم
              </>
            ) : (
              <>
                BUILD
                <br />
                WHAT
                <br />
                LASTS
              </>
            )}
          </h1>
          <p className="text-sm text-white/30 max-w-md font-light leading-relaxed">
            {isAr
              ? "لسنا مجرد شركة فعاليات — نحن بيت إبداعي يصنع لحظات تبقى في الذاكرة. إذا كنت تؤمن بالتميّز، فمكانك هنا."
              : "We're not just an events company — we're a creative house that builds moments that endure. If you believe in excellence, you belong here."}
          </p>
        </div>
      </div>

      {/* ── Why join ──────────────────────────────────────────────────── */}
      <div className="px-16 py-24 border-t border-white/[0.06]">
        <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 mb-16">
          {isAr ? "لماذا سكاي اكسبو؟" : "Why SKY EXPO"}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY.map((w) => (
            <div key={w.numEn} className="group">
              <p
                className="text-[10px] tracking-[0.4em] mb-6 font-light"
                style={{ color: `${ACCENT}80` }}
              >
                {isAr ? w.numAr : w.numEn}
              </p>
              <p className="text-sm font-light text-white mb-3">
                {isAr ? w.titleAr : w.titleEn}
              </p>
              <p className="text-xs text-white/30 leading-relaxed font-light">
                {isAr ? w.bodyAr : w.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Open positions ────────────────────────────────────────────── */}
      <div className="px-16 py-24 border-t border-white/[0.06]">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 mb-4">
              {isAr ? "الوظائف المتاحة" : "Open Positions"}
            </p>
            <h2
              className="text-3xl font-extralight text-white"
            >
              {isAr ? "وظائف مفتوحة" : "Current openings"}
            </h2>
          </div>
          <p className="text-xs text-white/25 font-light">
            {isAr ? `${ROLES.length} وظائف` : `${ROLES.length} roles`}
          </p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-3 pb-4 border-b border-white/[0.06] mb-2">
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 col-span-2">
            {isAr ? "الدور" : "Role"}
          </p>
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 text-right hidden sm:block">
            {isAr ? "النوع / الموقع" : "Type / Location"}
          </p>
        </div>

        <div>
          {ROLES.map((role) => (
            <a
              key={role.titleEn}
              href={`mailto:${CONTACT.email}?subject=Application: ${role.titleEn}`}
              className="block"
            >
              <RoleCard role={role} isAr={isAr} />
            </a>
          ))}
        </div>

        {/* Open application */}
        <div className="mt-16 pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-sm text-white/50 font-light mb-2">
              {isAr ? "لم تجد ما يناسبك؟" : "Don't see a fit?"}
            </p>
            <p className="text-xs text-white/25 font-light">
              {isAr
                ? "أرسل لنا ملفك الشخصي — نحن دائماً نبحث عن مواهب استثنائية."
                : "Send us your profile — we're always looking for exceptional people."}
            </p>
          </div>
          <a
            href={`mailto:${CONTACT.email}?subject=General Application — SKY EXPO`}
            className="group inline-flex items-center gap-4 text-xs tracking-[0.4em] uppercase text-white/40 hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 transition-all duration-500 shrink-0"
            data-cursor-hover
          >
            {isAr ? "تقديم مفتوح" : "Open Application"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>

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

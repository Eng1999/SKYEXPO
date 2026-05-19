"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/* ─── Project Photos ────────────────────────────────────────────────────────
   احفظ الصور في: public/images/projects/
   الأسماء المطلوبة موضّحة في src بكل بطاقة
   ─────────────────────────────────────────────────────────────────────────── */
const FEATURED = [
  {
    src:     "/images/projects/gaca.jpg",
    labelEn: "GACA — Aviation Strategy Forum",
    labelAr: "الهيئة العامة للطيران المدني",
    catEn:   "Government Forum",
    catAr:   "منتدى حكومي",
    color:   "#F59E0B",
    span:    "md:col-span-7",
  },
  {
    src:     "/images/projects/kafd-rise.jpg",
    labelEn: "KAFD Rise — Graduation Ceremony",
    labelAr: "حفل تخرج مؤسسة KAFD",
    catEn:   "Ceremony",
    catAr:   "احتفالية",
    color:   "#A78BFA",
    span:    "md:col-span-5",
  },
  {
    src:     "/images/projects/ejlal.jpg",
    labelEn: "Ejlal — Eastern Province",
    labelAr: "إجلال — المنطقة الشرقية",
    catEn:   "Gala Dinner",
    catAr:   "حفل تكريم",
    color:   "#3B82F6",
    span:    "md:col-span-5",
  },
  {
    src:     "/images/projects/misk-global-forum.jpg",
    labelEn: "Misk Global Forum",
    labelAr: "منتدى مسك العالمي",
    catEn:   "Conference",
    catAr:   "مؤتمر",
    color:   "#8B5CF6",
    span:    "md:col-span-7",
  },
  {
    src:     "/images/projects/badael.jpg",
    labelEn: "Badael — Saudi Founding Day",
    labelAr: "بدائل — يوم التأسيس",
    catEn:   "National Exhibition",
    catAr:   "معرض وطني",
    color:   "#FED172",
    span:    "md:col-span-7",
  },
  {
    src:     "/images/projects/king-faisal.jpg",
    labelEn: "King Faisal Center — Conference",
    labelAr: "مركز الملك فيصل للبحوث",
    catEn:   "Academic Conference",
    catAr:   "مؤتمر أكاديمي",
    color:   "#10B981",
    span:    "md:col-span-5",
  },
];

function FeaturedCard({
  item,
  isAr,
}: {
  item: (typeof FEATURED)[0];
  isAr: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg cursor-none group"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Photo */}
      {inView && (
        <Image
          src={item.src}
          alt={isAr ? item.labelAr : item.labelEn}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: hovered ? "brightness(0.55) saturate(1.1)" : "brightness(0.35) saturate(0.8)",
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />

      {/* Hover colour bloom */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 100%, ${item.color}25 0%, transparent 65%)`,
        }}
      />

      {/* Category badge */}
      <div
        className="absolute top-4 left-4 transition-all duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <span
          className="text-[9px] tracking-[0.4em] uppercase px-2.5 py-1 rounded-sm font-medium"
          style={{
            background: `${item.color}20`,
            color: item.color,
            border: `1px solid ${item.color}40`,
          }}
        >
          {isAr ? item.catAr : item.catEn}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-sm font-medium transition-colors duration-500"
          style={{ color: hovered ? item.color : "rgba(255,255,255,0.70)" }}
        >
          {isAr ? item.labelAr : item.labelEn}
        </p>
      </div>

      {/* Hover arrow */}
      <div
        className="absolute top-4 right-4 pointer-events-none transition-all duration-500"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.6)" }}
      >
        <div
          className="w-9 h-9 rounded-full border flex items-center justify-center"
          style={{ borderColor: `${item.color}60`, background: `${item.color}15` }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={item.color} strokeWidth="2">
            <path d="M2 12L12 2M12 2H5M12 2v7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function HomeFeaturedWork() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-12 md:py-24 px-4 sm:px-8 md:px-16"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className="flex items-end justify-between mb-10 md:mb-14"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div>
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/45 mb-3">
            {isAr ? "من أعمالنا" : "Selected Work"}
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white leading-none">
            {isAr ? "لحظات حقيقية" : "Real Moments"}
          </h2>
        </div>
        <a
          href="/work"
          className="group inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-white/35 hover:text-white transition-colors duration-500"
          data-cursor-hover
        >
          {isAr ? "كل الأعمال" : "View All Work"}
          <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-12" />
        </a>
      </div>

      {/* Row 1 — GACA wide + KAFD narrow */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 1.2s ease 0.15s, transform 1.2s ease 0.15s",
        }}
      >
        <div className="md:col-span-7"><FeaturedCard item={FEATURED[0]} isAr={isAr} /></div>
        <div className="md:col-span-5"><FeaturedCard item={FEATURED[1]} isAr={isAr} /></div>
      </div>

      {/* Row 2 — Ejlal narrow + Misk wide */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
        }}
      >
        <div className="md:col-span-5"><FeaturedCard item={FEATURED[2]} isAr={isAr} /></div>
        <div className="md:col-span-7"><FeaturedCard item={FEATURED[3]} isAr={isAr} /></div>
      </div>

      {/* Row 3 — Badael wide + King Faisal narrow */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(48px)",
          transition: "opacity 1.2s ease 0.45s, transform 1.2s ease 0.45s",
        }}
      >
        <div className="md:col-span-7"><FeaturedCard item={FEATURED[4]} isAr={isAr} /></div>
        <div className="md:col-span-5"><FeaturedCard item={FEATURED[5]} isAr={isAr} /></div>
      </div>

      {/* CTA strip */}
      <div
        className="mt-14 md:mt-20 pt-10 border-t border-white/[0.06] flex items-center justify-center"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 1.2s ease 0.5s",
        }}
      >
        <a
          href="/work"
          className="group inline-flex items-center gap-4 md:gap-6 text-xs tracking-[0.5em] uppercase text-white/30 hover:text-white border border-white/[0.08] hover:border-white/25 px-8 md:px-14 py-4 md:py-5 transition-all duration-700"
          data-cursor-hover
        >
          {isAr ? "استكشف كل مشاريعنا" : "Explore All Projects"}
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            className={isAr ? "group-hover:-translate-x-1 transition-transform duration-500" : "group-hover:translate-x-1 transition-transform duration-500"}
            style={{ transform: isAr ? "scaleX(-1)" : undefined }}
          >
            <path d="M1 7h12M8 2l5 5-5 5" />
          </svg>
        </a>
      </div>
    </section>
  );
}

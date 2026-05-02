"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const FEATURED = [
  {
    video: "/videos/skyexpo-work-2025.mp4",
    labelEn: "SKY EXPO Showreel 2025",
    labelAr: "شوريل SKY EXPO 2025",
    catEn: "Production",
    catAr: "إنتاج",
    color: "#FED172",
    span: "col-span-7",
  },
  {
    video: "/videos/abraj-alolaya.mp4",
    labelEn: "Abraj Al Olaya",
    labelAr: "أبراج العلية",
    catEn: "Exhibition",
    catAr: "معرض",
    color: "#F3742B",
    span: "col-span-5",
  },
  {
    video: "/videos/misk-mgf25.mp4",
    labelEn: "Misk MGF 25",
    labelAr: "منتدى مسك 25",
    catEn: "Conference",
    catAr: "مؤتمر",
    color: "#B83A14",
    span: "col-span-5",
  },
  {
    video: "/videos/flynas-event.mp4",
    labelEn: "Flynas Event",
    labelAr: "فعالية فلاي ناس",
    catEn: "Event",
    catAr: "فعالية",
    color: "#612E37",
    span: "col-span-7",
  },
];

function FeaturedCard({ item }: { item: typeof FEATURED[0] }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (hovered) videoRef.current?.play().catch(() => {});
  }, [hovered]);

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-none group"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: hovered ? "brightness(0.65) saturate(0.9)" : "brightness(0.45) saturate(0.7)",
          transition: "filter 0.7s ease",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
        }}
      />

      {/* Hover accent bloom */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 100%, ${item.color}20 0%, transparent 60%)`,
        }}
      />

      {/* Category badge */}
      <div
        className="absolute top-4 left-4 transition-all duration-500"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-6px)" }}
      >
        <span
          className="text-[9px] tracking-[0.4em] uppercase px-2 py-1 rounded"
          style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
        >
          {item.catEn}
        </span>
      </div>

      {/* Label bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-sm font-light transition-colors duration-500"
          style={{ color: hovered ? item.color : "rgba(255,255,255,0.55)" }}
        >
          {item.labelEn}
        </p>
      </div>

      {/* Play icon on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)" }}
      >
        <div
          className="w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-sm"
          style={{ borderColor: `${item.color}50`, background: `${item.color}15` }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill={item.color}>
            <path d="M3 2l9 5-9 5V2z" />
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-24 px-8 md:px-16"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className="flex items-end justify-between mb-12"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div>
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/55 mb-3">
            {isAr ? "من أعمالنا" : "Selected Work"}
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white leading-none">
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

      {/* Grid — row 1: wide + narrow */}
      <div
        className="grid grid-cols-12 gap-3 mb-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s",
        }}
      >
        <div className="col-span-7"><FeaturedCard item={FEATURED[0]} /></div>
        <div className="col-span-5"><FeaturedCard item={FEATURED[1]} /></div>
      </div>

      {/* Grid — row 2: narrow + wide */}
      <div
        className="grid grid-cols-12 gap-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
        }}
      >
        <div className="col-span-5"><FeaturedCard item={FEATURED[2]} /></div>
        <div className="col-span-7"><FeaturedCard item={FEATURED[3]} /></div>
      </div>

      {/* CTA strip */}
      <div
        className="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-center"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 1.2s ease 0.6s",
        }}
      >
        <a
          href="/work"
          className="group inline-flex items-center gap-6 text-xs tracking-[0.5em] uppercase text-white/30 hover:text-white border border-white/[0.08] hover:border-white/20 px-12 py-5 transition-all duration-700"
          data-cursor-hover
        >
          {isAr ? "استكشف كل مشاريعنا" : "Explore All Projects"}
          <svg
            width="14"
            height="14"
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
    </section>
  );
}

"use client";

import { useRef, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ClientLogos } from "@/components/shared/ClientLogos";

/* ── Gallery items — placeholders until real photos are added ──────── */
const ITEMS = [
  { id: 1,  ratio: "4/5",  label: "SIRC Event",                  year: "2024", cat: "Conference",  color: "#B83A14", video: "/videos/sirc.mp4" },
  { id: 2,  ratio: "1/1",  label: "SKY EXPO Showreel 2025",      year: "2025", cat: "Production",  color: "#FED172", video: "/videos/skyexpo-work-2025.mp4" },
  { id: 3,  ratio: "16/9", label: "Abraj Al Olaya",              year: "2024", cat: "Exhibition",  color: "#F3742B", video: "/videos/abraj-alolaya.mp4" },
  { id: 4,  ratio: "3/4",  label: "Promo Reel",                  year: "2024", cat: "Media",       color: "#612E37", video: "/videos/promo-alt.mp4" },
  { id: 5,  ratio: "1/1",  label: "Flynas Event",                year: "2024", cat: "Event",       color: "#231650", video: "/videos/flynas-event.mp4" },
  { id: 6,  ratio: "4/5",  label: "ANB Celebration",             year: "2024", cat: "Corporate",   color: "#B83A14", video: "/videos/anb-celebration.mp4" },
  { id: 7,  ratio: "9/16", label: "Flag Ceremony",               year: "2024", cat: "Event",       color: "#FED172", video: "/videos/flag.mp4" },
  { id: 8,  ratio: "16/9", label: "Fairmont Ramadan",            year: "2024", cat: "Hospitality", color: "#F3742B", video: "/videos/fairmont-ramadan.mp4" },
  { id: 9,  ratio: "3/4",  label: "Misk MGF 25",                 year: "2025", cat: "Conference",  color: "#612E37", video: "/videos/misk-mgf25.mp4" },
  { id: 10, ratio: "1/1",  label: "SKY EXPO Team Culture",       year: "2024", cat: "Culture",     color: "#231650", video: "/videos/sirc.mp4" },
  { id: 11, ratio: "4/5",  label: "Saudi Vision Production",     year: "2025", cat: "Exhibition",  color: "#B83A14", video: "/videos/skyexpo-work-2025.mp4" },
  { id: 12, ratio: "16/9", label: "Corporate Events 2024",       year: "2024", cat: "Corporate",   color: "#FED172", video: "/videos/promo-alt.mp4" },
];

/* ── Tilt card ─────────────────────────────────────────────────────── */
function GalleryCard({ item }: { item: { id: number; ratio: string; label: string; year: string; cat: string; color: string; video: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;   // 0–1
    const cy = (e.clientY - rect.top)  / rect.height;  // 0–1
    const rx =  (cy - 0.5) * -16;  // tilt X axis  (up/down tilt)
    const ry =  (cx - 0.5) *  16;  // tilt Y axis  (left/right tilt)
    setTilt({ x: rx, y: ry, px: cx * 100, py: cy * 100 });
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => { setHovered(false); setTilt({ x: 0, y: 0, px: 50, py: 50 }); }, []);

  return (
    <div
      ref={cardRef}
      className="relative cursor-none group"
      style={{
        aspectRatio: item.ratio,
        perspective: "800px",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      {/* Card inner — tilts */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0a0a]"
        style={{
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: hovered
            ? "transform 0.15s ease-out"
            : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          transformStyle: "preserve-3d",
          border: `1px solid ${hovered ? item.color + "30" : "rgba(255,255,255,0.04)"}`,
          boxShadow: hovered
            ? `0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px ${item.color}20`
            : "0 8px 24px rgba(0,0,0,0.5)",
          willChange: "transform",
        }}
      >
        {/* Real video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={item.video}
          muted
          loop
          playsInline
          autoPlay
          style={{ filter: "brightness(0.7) saturate(0.85)" }}
        />

        {/* Shimmer highlight — follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, ${item.color}18 0%, transparent 60%)`,
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          }}
        />

        {/* Category badge — top */}
        <div
          className="absolute top-3 left-3 flex items-center gap-2 transition-all duration-400"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-6px)" }}
        >
          <span
            className="text-[9px] tracking-[0.35em] uppercase px-2 py-1 rounded"
            style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
          >
            {item.cat}
          </span>
          <span className="text-[9px] tracking-widest text-white/40">{item.year}</span>
        </div>

        {/* Label — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="text-sm font-light leading-tight transition-all duration-400"
            style={{
              color: hovered ? item.color : "rgba(255,255,255,0.55)",
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {item.label}
          </p>
        </div>

        {/* Floating plus icon — center on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.6)" }}
        >
          <div
            className="w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-sm"
            style={{ borderColor: `${item.color}50`, background: `${item.color}10` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={item.color} strokeWidth="1.5">
              <path d="M7 1v12M1 7h12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main gallery ───────────────────────────────────────────────────── */
export function WorkGallery() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="bg-black min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="pt-32 pb-12 px-16">
        <p className="text-xs tracking-[0.5em] uppercase text-white/25 mb-4">
          {isAr ? "معرض الأعمال" : "Portfolio"}
        </p>
        <div className="flex items-end justify-between">
          <h1
            className="text-[clamp(3rem,8vw,8rem)] font-extralight uppercase leading-none"
            style={{ color: "#B83A14" }}
          >
            {isAr ? "أعمالنا" : "Our Work"}
          </h1>
          <p className="text-sm text-white/30 max-w-xs font-light leading-relaxed pb-2">
            {isAr
              ? "لحظات حقيقية من مشاريع SKY EXPO — من المفهوم إلى التنفيذ."
              : "Real moments from SKY EXPO projects — from concept to execution."}
          </p>
        </div>
      </div>

      {/* Gallery grid — organic masonry-like layout */}
      <div className="px-8 pb-24">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-4"><GalleryCard item={ITEMS[0]} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[2]} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[1]} /></div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3"><GalleryCard item={ITEMS[4]} /></div>
          <div className="col-span-4"><GalleryCard item={ITEMS[3]} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[7]} /></div>
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-5"><GalleryCard item={ITEMS[5]} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[6]} /></div>
          <div className="col-span-4"><GalleryCard item={ITEMS[8]} /></div>
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4"><GalleryCard item={ITEMS[9]} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[11]} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[10]} /></div>
        </div>
      </div>

      {/* Real client logos strip */}
      <ClientLogos />
    </div>
  );
}

/* ── Scrolling client logos ─────────────────────────────────────────── */
const CLIENTS = [
  "ALSAYEGH WORLDWIDE", "VISION 2030", "NEOM", "RED SEA GLOBAL",
  "ARAMCO", "SABIC", "STC", "SAMBA", "PIF", "DIRIYAH",
  "ALSAYEGH WORLDWIDE", "VISION 2030", "NEOM", "RED SEA GLOBAL",
  "ARAMCO", "SABIC", "STC", "SAMBA", "PIF", "DIRIYAH",
];

function ClientsStrip({ isAr }: { isAr: boolean }) {
  return (
    <div className="border-t border-white/[0.06] py-10 overflow-hidden">
      <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 text-center mb-8">
        {isAr ? "عملاؤنا" : "Trusted by"}
      </p>
      {/* Auto-scrolling ticker */}
      <div className="relative flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div
          className="flex items-center gap-16 shrink-0 animate-[ticker_30s_linear_infinite]"
          style={{ paddingRight: "4rem" }}
        >
          {CLIENTS.map((c, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.5em] uppercase text-white/25 whitespace-nowrap font-light hover:text-white/60 transition-colors duration-300 cursor-default"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

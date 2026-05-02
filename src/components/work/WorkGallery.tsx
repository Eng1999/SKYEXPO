"use client";

import { useRef, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ClientLogos } from "@/components/shared/ClientLogos";

/* ── Gallery items ─────────────────────────────────────────────────── */
const ITEMS = [
  { id: 1,  ratio: "4/5",  labelEn: "SIRC Event",                       labelAr: "فعالية SIRC",                         year: "2024", catEn: "Conference",  catAr: "مؤتمر",     color: "#B83A14", video: "/videos/sirc.mp4" },
  { id: 2,  ratio: "1/1",  labelEn: "SKY EXPO Showreel 2025",           labelAr: "شوريل SKY EXPO 2025",                 year: "2025", catEn: "Production",  catAr: "إنتاج",     color: "#FED172", video: "/videos/skyexpo-work-2025.mp4" },
  { id: 3,  ratio: "16/9", labelEn: "Abraj Al Olaya",                   labelAr: "أبراج العلية",                         year: "2024", catEn: "Exhibition",  catAr: "معرض",      color: "#F3742B", video: "/videos/abraj-alolaya.mp4" },
  { id: 4,  ratio: "3/4",  labelEn: "Martyrs & Wounded Fund",           labelAr: "صندوق الشهداء والمصابين",              year: "2024", catEn: "Event",       catAr: "فعالية",    color: "#612E37", video: "/videos/shuhada-fund.mp4" },
  { id: 5,  ratio: "1/1",  labelEn: "King Abdullah City for Energy",    labelAr: "مدينة الملك عبد الله للطاقة",          year: "2024", catEn: "Exhibition",  catAr: "معرض",      color: "#231650", video: "/videos/kacare.mp4" },
  { id: 6,  ratio: "4/5",  labelEn: "ANB Celebration",                  labelAr: "احتفالية بنك العربي الوطني",           year: "2024", catEn: "Corporate",   catAr: "شركات",     color: "#B83A14", video: "/videos/anb-celebration.mp4" },
  { id: 7,  ratio: "9/16", labelEn: "Flag Ceremony",                    labelAr: "حفل العلم",                            year: "2024", catEn: "Event",       catAr: "فعالية",    color: "#FED172", video: "/videos/flag.mp4" },
  { id: 8,  ratio: "16/9", labelEn: "Fairmont Ramadan",                 labelAr: "فيرمونت رمضان",                        year: "2024", catEn: "Hospitality", catAr: "ضيافة",     color: "#F3742B", video: "/videos/fairmont-ramadan.mp4" },
  { id: 9,  ratio: "3/4",  labelEn: "Misk MGF 25",                      labelAr: "منتدى مسك MGF 25",                     year: "2025", catEn: "Conference",  catAr: "مؤتمر",     color: "#612E37", video: "/videos/misk-mgf25.mp4" },
  { id: 10, ratio: "1/1",  labelEn: "Mawhiba",                          labelAr: "موهبة",                                year: "2024", catEn: "Corporate",   catAr: "شركات",     color: "#231650", video: "/videos/mawhiba.mp4" },
  { id: 11, ratio: "4/5",  labelEn: "Oxford Center",                    labelAr: "مركز أكسفورد",                         year: "2024", catEn: "Conference",  catAr: "مؤتمر",     color: "#B83A14", video: "/videos/oxford-center.mp4" },
  { id: 12, ratio: "16/9", labelEn: "Roshn",                            labelAr: "واجهة روشن",                           year: "2024", catEn: "Event",       catAr: "فعالية",    color: "#FED172", video: "/videos/roshn.mp4" },
];

/* ── Tilt card ─────────────────────────────────────────────────────── */
function GalleryCard({ item, isAr }: {
  item: typeof ITEMS[0];
  isAr: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (cy - 0.5) * -16, y: (cx - 0.5) * 16, px: cx * 100, py: cy * 100 });
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => { setHovered(false); setTilt({ x: 0, y: 0, px: 50, py: 50 }); }, []);

  return (
    <div
      ref={cardRef}
      className="relative cursor-none group"
      style={{ aspectRatio: item.ratio, perspective: "800px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
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
        {/* Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={item.video}
          muted loop playsInline autoPlay
          style={{ filter: "brightness(0.7) saturate(0.85)" }}
        />

        {/* Cursor shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, ${item.color}18 0%, transparent 60%)`,
          }}
        />

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
        />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-2 transition-all duration-400"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-6px)" }}
        >
          <span
            className="text-[9px] tracking-[0.35em] uppercase px-2 py-1 rounded"
            style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
          >
            {isAr ? item.catAr : item.catEn}
          </span>
          <span className="text-[9px] tracking-widest text-white/40">{item.year}</span>
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="text-sm font-light leading-tight transition-all duration-400"
            style={{
              color: hovered ? item.color : "rgba(255,255,255,0.55)",
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {isAr ? item.labelAr : item.labelEn}
          </p>
        </div>

        {/* Plus icon */}
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
      <div className="pt-28 md:pt-32 pb-10 md:pb-12 px-5 sm:px-8 md:px-16">
        <p className="text-xs tracking-[0.5em] uppercase text-white/55 mb-4">
          {isAr ? "معرض الأعمال" : "Portfolio"}
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1
            className="text-[clamp(3rem,8vw,8rem)] font-extralight uppercase leading-none"
            style={{ color: "#B83A14" }}
          >
            {isAr ? "أعمالنا" : "Our Work"}
          </h1>
          <p className="text-sm text-white/30 max-w-xs font-light leading-relaxed md:pb-2">
            {isAr
              ? "لحظات حقيقية من مشاريع SKY EXPO — من المفهوم إلى التنفيذ."
              : "Real moments from SKY EXPO projects — from concept to execution."}
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="px-3 sm:px-5 md:px-8 pb-24">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="col-span-4"><GalleryCard item={ITEMS[0]}  isAr={isAr} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[2]}  isAr={isAr} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[1]}  isAr={isAr} /></div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="col-span-3"><GalleryCard item={ITEMS[4]}  isAr={isAr} /></div>
          <div className="col-span-4"><GalleryCard item={ITEMS[3]}  isAr={isAr} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[7]}  isAr={isAr} /></div>
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="col-span-5"><GalleryCard item={ITEMS[5]}  isAr={isAr} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[6]}  isAr={isAr} /></div>
          <div className="col-span-4"><GalleryCard item={ITEMS[8]}  isAr={isAr} /></div>
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3">
          <div className="col-span-4"><GalleryCard item={ITEMS[9]}  isAr={isAr} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[10]} isAr={isAr} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[11]} isAr={isAr} /></div>
        </div>
      </div>

      {/* Client logos */}
      <ClientLogos />
    </div>
  );
}

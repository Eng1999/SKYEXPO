"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ClientLogos } from "@/components/shared/ClientLogos";

/* ── Gallery items ─────────────────────────────────────────────────── */
const ITEMS = [
  { id: 1,  ratio: "4/5",  labelEn: "SIRC Event",                       labelAr: "فعالية SIRC",                         year: "2024", catEn: "Conference",  catAr: "مؤتمر",     color: "#B83A14", video: "/videos/sirc.mp4" },
  { id: 2,  ratio: "1/1",  labelEn: "SKY EXPO Showreel 2025",           labelAr: "شوريل SKY EXPO 2025",                 year: "2025", catEn: "Production",  catAr: "إنتاج",     color: "#FED172", video: "/videos/skyexpo-work-2025.mp4" },
  { id: 3,  ratio: "16/9", labelEn: "Abraj Al Olya",                    labelAr: "أبراج العليا",                         year: "2024", catEn: "Exhibition",  catAr: "معرض",      color: "#F3742B", video: "/videos/abraj-alolaya.mp4" },
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
function GalleryCard({ item, isAr, soundOn }: {
  item: typeof ITEMS[0];
  isAr: boolean;
  soundOn: boolean;
}) {
  const cardRef      = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const expandedRef  = useRef<HTMLVideoElement>(null);
  const rafRef       = useRef<number>(0);
  const [tilt, setTilt]         = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [hovered, setHovered]   = useState(false);
  const [loaded, setLoaded]     = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* Lazy-load when card enters viewport */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoaded(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Play / pause thumbnail video on hover */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !loaded) return;
    if (hovered && !expanded) {
      v.muted = !soundOn;
      v.play().catch(() => {});
    } else {
      v.muted = true;
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered, loaded, soundOn, expanded]);

  /* Sync mute on expanded video */
  useEffect(() => {
    const v = expandedRef.current;
    if (!v) return;
    v.muted = !soundOn;
  }, [soundOn]);

  /* Lock body scroll when expanded */
  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  /* Throttled tilt */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top)  / rect.height;
      setTilt({ x: (cy - 0.5) * -12, y: (cx - 0.5) * 12, px: cx * 100, py: cy * 100 });
    });
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setHovered(false);
    setTilt({ x: 0, y: 0, px: 50, py: 50 });
  }, []);

  return (
    <>
    {/* ── Expanded lightbox ─────────────────────────────────────── */}
    {expanded && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          animation: "fadeIn 0.35s ease",
        }}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setExpanded(false)}
      >
        <div
          className="relative flex flex-col"
          style={{
            width: "min(82vw, 1280px)",
            maxHeight: "82vh",
            animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
          onClick={e => e.stopPropagation()}
          onMouseLeave={() => setExpanded(false)}
        >
          {/* Video */}
          <video
            ref={expandedRef}
            src={item.video}
            autoPlay
            muted={!soundOn}
            loop
            playsInline
            className="w-full rounded-2xl"
            style={{
              maxHeight: "74vh",
              objectFit: "contain",
              background: "#000",
              boxShadow: `0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px ${item.color}25`,
            }}
          />

          {/* Info bar */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-3">
              <span
                className="text-[9px] tracking-[0.4em] uppercase px-2 py-1 rounded"
                style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
              >
                {isAr ? item.catAr : item.catEn}
              </span>
              <span className="text-[10px] tracking-widest text-white/40">{item.year}</span>
            </div>
            <p className="text-sm font-light" style={{ color: item.color }}>
              {isAr ? item.labelAr : item.labelEn}
            </p>
          </div>

          {/* Close hint */}
          <p className="text-center text-[10px] tracking-[0.4em] uppercase text-white/25 mt-3">
            {isAr ? "حرّك الماوس للخارج للإغلاق" : "Move mouse out to close"}
          </p>
        </div>
      </div>
    )}

    <div
      ref={cardRef}
      className="relative cursor-none group"
      style={{ aspectRatio: item.ratio, perspective: "800px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => setExpanded(true)}
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
        {/* Thumbnail video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={loaded ? item.video : undefined}
          muted loop playsInline preload="none"
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

        {/* Expand icon on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.6)" }}
        >
          <div
            className="w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-sm"
            style={{ borderColor: `${item.color}60`, background: `${item.color}15` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.8" strokeLinecap="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

/* ── Main gallery ───────────────────────────────────────────────────── */
export function WorkGallery() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [soundOn, setSoundOn] = useState(false);

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
          <div className="flex items-center gap-6 md:pb-2">
            <p className="text-sm text-white/30 max-w-xs font-light leading-relaxed">
              {isAr
                ? "لحظات حقيقية من مشاريع SKY EXPO — من المفهوم إلى التنفيذ."
                : "Real moments from SKY EXPO projects — from concept to execution."}
            </p>
            {/* Sound toggle */}
            <button
              onClick={() => setSoundOn(s => !s)}
              className="flex items-center gap-2 shrink-0 group"
              aria-label={soundOn ? "Mute" : "Enable sound"}
            >
              <span className="text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
                style={{ color: soundOn ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}>
                {soundOn ? (isAr ? "الصوت شغال" : "SOUND ON") : (isAr ? "الصوت مكتوم" : "SOUND OFF")}
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-400"
                style={{
                  borderColor: soundOn ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                  background: soundOn ? "rgba(255,255,255,0.08)" : "transparent",
                }}>
                {soundOn ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="px-3 sm:px-5 md:px-8 pb-24">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="col-span-4"><GalleryCard item={ITEMS[0]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[2]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[1]}  isAr={isAr} soundOn={soundOn} /></div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="col-span-3"><GalleryCard item={ITEMS[4]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-4"><GalleryCard item={ITEMS[3]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[7]}  isAr={isAr} soundOn={soundOn} /></div>
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="col-span-5"><GalleryCard item={ITEMS[5]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[6]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-4"><GalleryCard item={ITEMS[8]}  isAr={isAr} soundOn={soundOn} /></div>
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-12 gap-2 md:gap-3">
          <div className="col-span-4"><GalleryCard item={ITEMS[9]}  isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-3"><GalleryCard item={ITEMS[10]} isAr={isAr} soundOn={soundOn} /></div>
          <div className="col-span-5"><GalleryCard item={ITEMS[11]} isAr={isAr} soundOn={soundOn} /></div>
        </div>
      </div>

      {/* Client logos */}
      <ClientLogos />
    </div>
  );
}

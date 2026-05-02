"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

/* ── Data ─────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 0,
    titleEn: "Events &\nActivations",
    titleAr: "الفعاليات\nوالتجارب التفاعلية",
    descEn: "Immersive experiences designed to create meaningful and lasting connections.",
    descAr: "تجارب غامرة تُصمَّم لخلق تواصل حقيقي وأثر يدوم.",
    color: "#F3742B",
    bg: "radial-gradient(ellipse at 35% 65%, #6b2d0a 0%, #2a1000 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 30% 70%, #8B3A0A 0%, #3A1500 45%, #080808 100%)",
    video: "/videos/flynas-event.mp4",
  },
  {
    id: 1,
    titleEn: "Experience\nDevelopment",
    titleAr: "تطوير\nالتجارب",
    descEn: "End-to-end journeys that shape engagement, interaction, and memory.",
    descAr: "تصميم رحلات متكاملة تُشكّل طريقة التفاعل والانخراط وترسّخ في الذاكرة.",
    color: "#FED172",
    bg: "radial-gradient(ellipse at 40% 60%, #2a3d1a 0%, #0d1808 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 40% 60%, #3a5020 0%, #182410 45%, #080808 100%)",
    video: "/videos/sirc.mp4",
  },
  {
    id: 2,
    titleEn: "Conferences &\nExhibitions",
    titleAr: "المؤتمرات\nوالمعارض",
    descEn: "Large-scale platforms delivered with operational precision and refined presentation.",
    descAr: "إدارة منصات كبرى بدقة تشغيلية عالية وحضور بصري راقٍ.",
    color: "#F3742B",
    bg: "radial-gradient(ellipse at 50% 45%, #0f2040 0%, #060d20 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 50% 45%, #162a50 0%, #0a1428 45%, #080808 100%)",
    video: "/videos/misk-mgf25.mp4",
  },
  {
    id: 3,
    titleEn: "Branding &\nCreative Design",
    titleAr: "الهوية\nوالتصميم الإبداعي",
    descEn: "Distinctive visual identities built with clarity, consistency, and longevity.",
    descAr: "بناء هويات بصرية مميزة تتسم بالوضوح والاتساق والاستمرارية.",
    color: "#FED172",
    bg: "radial-gradient(ellipse at 60% 40%, #3d1a2a 0%, #1a0a12 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 60% 40%, #4d2035 0%, #22101a 45%, #080808 100%)",
    video: "/videos/promo-alt.mp4",
  },
  {
    id: 4,
    titleEn: "Media\nProduction",
    titleAr: "الإنتاج\nالإعلامي",
    descEn: "Cinematic storytelling with a strong narrative perspective, adapted across platforms.",
    descAr: "محتوى بصري بأسلوب سينمائي قائم على سرد مدروس، مهيأ لمختلف المنصات.",
    color: "#F3742B",
    bg: "radial-gradient(ellipse at 50% 30%, #12103a 0%, #07061d 45%, #000 100%)",
    lightBg: "radial-gradient(ellipse at 50% 30%, #1a1850 0%, #0c0a28 45%, #000 100%)",
    video: "/videos/skyexpo-work-2025.mp4",
  },
  {
    id: 5,
    titleEn: "Social\nMedia",
    titleAr: "إدارة المحتوى\nالرقمي",
    descEn: "Curated digital presence defined by relevance, consistency, and cultural awareness.",
    descAr: "حضور رقمي مُنسّق يعكس الملاءمة واتساقًا وفهمًا عميقًا للمشهد الثقافي.",
    color: "#FED172",
    bg: "radial-gradient(ellipse at 45% 55%, #3a1015 0%, #180608 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 45% 55%, #4a1520 0%, #200a0d 45%, #080808 100%)",
    video: "/videos/anb-celebration.mp4",
  },
  {
    id: 6,
    titleEn: "Website\nDevelopment",
    titleAr: "تطوير المواقع\nالإلكترونية",
    descEn: "Digital platforms crafted with attention to form, function, and performance.",
    descAr: "منصات رقمية تُبنى بعناية، تجمع بين الجمال والوظيفة والأداء.",
    color: "#F3742B",
    bg: "radial-gradient(ellipse at 50% 50%, #0a1a30 0%, #040d18 45%, #000 100%)",
    lightBg: "radial-gradient(ellipse at 50% 50%, #102240 0%, #061020 45%, #000 100%)",
    video: "/videos/fairmont-ramadan.mp4",
  },
  {
    id: 7,
    titleEn: "Printing\nSolutions",
    titleAr: "حلول\nالطباعة",
    descEn: "High-quality physical outputs translating vision into tangible detail.",
    descAr: "مخرجات مادية عالية الجودة تُجسّد الرؤية وتمنحها حضورًا ملموسًا.",
    color: "#FED172",
    bg: "radial-gradient(ellipse at 50% 60%, #2a1f10 0%, #120d06 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 50% 60%, #382a14 0%, #1a1108 45%, #080808 100%)",
    video: "/videos/abraj-alolaya.mp4",
  },
  {
    id: 8,
    titleEn: "Catering\nServices",
    titleAr: "خدمات\nالضيافة",
    descEn: "Refined catering solutions delivered with precision and care, designed to complement each event.",
    descAr: "حلول ضيافة راقية تُقدَّم بعناية عالية، مصممة لتتكامل مع طبيعة الحدث.",
    color: "#F3742B",
    bg: "radial-gradient(ellipse at 35% 65%, #0f2415 0%, #071008 45%, #080808 100%)",
    lightBg: "radial-gradient(ellipse at 35% 65%, #142e1a 0%, #09150a 45%, #080808 100%)",
    video: "/videos/flag.mp4",
  },
];

/* ── Card geometry ───────────────────────────────────────────────────── */
const SPREAD_PX = [0, 230, 400, 540, 650];

function cardTransform(offset: number) {
  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;
  if (abs > 4) return null;
  const rotateY   = sign * Math.min(abs * 20, 80);
  const translateX = sign * (SPREAD_PX[abs] ?? 650);
  const translateZ = -abs * 80;
  const scale     = 1 - abs * 0.06;
  const opacity   = Math.max(0, 1 - abs * 0.2);
  const zIndex    = 10 - abs;
  return { rotateY, translateX, translateZ, scale, opacity, zIndex };
}

/* ── Individual card with real video ────────────────────────────────── */
function ServiceCard({
  svc,
  isActive,
  isAr,
  onEnter,
  onLeave,
  onClick,
}: {
  svc: (typeof SERVICES)[0];
  isActive: boolean;
  isAr: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden border cursor-pointer"
      style={{
        background: isActive ? svc.lightBg : svc.bg,
        borderColor: isActive ? `${svc.color}55` : "rgba(255,255,255,0.06)",
        boxShadow: isActive
          ? `0 0 80px ${svc.color}25, 0 40px 80px rgba(0,0,0,0.85)`
          : "0 20px 40px rgba(0,0,0,0.6)",
        transition: "all 0.55s cubic-bezier(0.77,0,0.175,1)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor-hover
    >
      {/* Real video */}
      <video
        ref={videoRef}
        src={svc.video}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isActive ? 0.55 : 0.2,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Gradient overlays — strong for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)`
            : `linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* Accent color bloom on active */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${svc.color}15 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Service label — bottom, always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="font-light leading-snug whitespace-pre-line"
          style={{
            color: isActive ? svc.color : "rgba(255,255,255,0.75)",
            fontSize: "clamp(0.72rem, 1.2vw, 1rem)",
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
            transition: "color 0.4s ease",
            letterSpacing: "0.02em",
          }}
        >
          {isAr ? svc.titleAr : svc.titleEn}
        </p>
      </div>

      {/* Top: active indicator */}
      {isActive && (
        <div className="absolute top-4 left-4">
          <span
            className="text-[8px] tracking-[0.4em] uppercase px-2.5 py-1 rounded-full font-light"
            style={{
              background: `${svc.color}22`,
              color: svc.color,
              border: `1px solid ${svc.color}40`,
            }}
          >
            {isAr ? "نشط" : "Active"}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export function CapabilitiesSlide() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [activeIdx, setActiveIdx] = useState(4);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const displayIdx = hoveredIdx ?? activeIdx;
  const active = SERVICES[displayIdx];

  /* Auto-scroll on hover zones */
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback((dir: "left" | "right") => {
    if (autoScrollRef.current) return;
    const step = dir === "left" ? -1 : 1;
    autoScrollRef.current = setInterval(() => {
      setActiveIdx((i) => {
        const next = i + step;
        if (next < 0 || next >= SERVICES.length) {
          if (autoScrollRef.current) clearInterval(autoScrollRef.current);
          autoScrollRef.current = null;
          return i;
        }
        return next;
      });
    }, 900);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  useEffect(() => () => stopAutoScroll(), [stopAutoScroll]);

  const prev = useCallback(() => setActiveIdx((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActiveIdx((i) => Math.min(SERVICES.length - 1, i + 1)), []);

  return (
    <div
      className="min-h-screen bg-black"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Page heading ──────────────────────────────────────────── */}
      <div className="pt-32 pb-12 px-16 max-w-6xl">
        <p className="text-[10px] tracking-[0.6em] uppercase text-white/25 mb-5">
          {isAr ? "ما نقدّمه" : "What we deliver"}
        </p>
        <h1
          className="font-extralight leading-[0.88] uppercase mb-5"
          style={{ fontSize: "clamp(3rem,6vw,6.5rem)", color: "#F3742B" }}
        >
          {isAr ? "منظومة" : "A Complete"}
          <br />
          <span style={{ color: "#F3742B", opacity: 0.65 }}>
            {isAr ? "إبداعية متكاملة" : "Creative Ecosystem"}
          </span>
        </h1>
        <p className="text-sm font-light text-white/35 max-w-lg leading-relaxed">
          {isAr
            ? "منظومة داخلية متكاملة تجمع بين الاستراتيجية والتصميم والإنتاج والتنفيذ."
            : "In-house ecosystem — strategy, design, production, and execution in one seamless process."}
        </p>
      </div>

      {/* ── 3D Fan Carousel ───────────────────────────────────────── */}
      <div
        className="relative select-none"
        style={{ height: "56vh", perspective: "1400px", perspectiveOrigin: "50% 50%", overflow: "visible" }}
      >
        {/* ── Hover zone LEFT → scroll left ── */}
        <div
          className="absolute left-0 top-0 bottom-0 z-30"
          style={{ width: "15%" }}
          onMouseEnter={() => startAutoScroll(isAr ? "right" : "left")}
          onMouseLeave={stopAutoScroll}
        />
        {/* ── Hover zone RIGHT → scroll right ── */}
        <div
          className="absolute right-0 top-0 bottom-0 z-30"
          style={{ width: "15%" }}
          onMouseEnter={() => startAutoScroll(isAr ? "left" : "right")}
          onMouseLeave={stopAutoScroll}
        />

        {/* Cards */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d", overflow: "visible" }}
        >
          {SERVICES.map((svc, i) => {
            const offset = i - displayIdx;
            const geo = cardTransform(offset);
            if (!geo) return null;

            return (
              <div
                key={svc.id}
                className="absolute"
                style={{
                  width: "clamp(160px, 18vw, 260px)",
                  height: "clamp(230px, 30vw, 400px)",
                  transform: `translateX(${geo.translateX}px) translateZ(${geo.translateZ}px) rotateY(${geo.rotateY}deg) scale(${geo.scale})`,
                  opacity: geo.opacity,
                  zIndex: geo.zIndex,
                  transition: "all 0.55s cubic-bezier(0.77,0,0.175,1)",
                  transformStyle: "preserve-3d",
                }}
              >
                <ServiceCard
                  svc={svc}
                  isActive={offset === 0}
                  isAr={isAr}
                  onEnter={() => { setHoveredIdx(i); setActiveIdx(i); }}
                  onLeave={() => setHoveredIdx(null)}
                  onClick={() => setActiveIdx(i)}
                />
              </div>
            );
          })}
        </div>

        {/* ── Arrow buttons (still available) ── */}
        <button
          onClick={isAr ? next : prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:text-white hover:border-white/35 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 2L4 7l5 5" />
          </svg>
        </button>
        <button
          onClick={isAr ? prev : next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:text-white hover:border-white/35 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 2l5 5-5 5" />
          </svg>
        </button>

        {/* ── Elegant numbered indicator ── */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          {/* Current / Total */}
          <div className="flex items-center gap-4">
            <span
              className="font-extralight tabular-nums"
              style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: active.color, lineHeight: 1 }}
            >
              {String(displayIdx + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <div className="w-14 h-px" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div
                  className="h-full"
                  style={{
                    width: `${((displayIdx + 1) / SERVICES.length) * 100}%`,
                    background: active.color,
                    transition: "width 0.55s cubic-bezier(0.77,0,0.175,1), background 0.4s ease",
                  }}
                />
              </div>
              <span className="text-[10px] tracking-widest text-white/25 text-right">
                {String(SERVICES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Thin dash indicators */}
          <div className="flex items-center gap-1 mt-1">
            {SERVICES.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: i === displayIdx ? 28 : 6,
                  height: 2,
                  borderRadius: 9999,
                  background: i === displayIdx ? active.color : "rgba(255,255,255,0.15)",
                  transition: "all 0.4s cubic-bezier(0.77,0,0.175,1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Detail Panel ──────────────────────────────────────────── */}
      <DetailPanel service={active} isAr={isAr} />
    </div>
  );
}

/* ── Detail panel ─────────────────────────────────────────────────────── */
function DetailPanel({ service, isAr }: { service: typeof SERVICES[0]; isAr: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [service.id]);

  return (
    <div
      className="relative mx-8 mt-10 mb-16 rounded-2xl overflow-hidden"
      style={{
        background: service.lightBg,
        border: `1px solid ${service.color}22`,
        minHeight: "40vh",
        transition: "background 0.7s ease, border-color 0.7s ease",
      }}
    >
      {/* Gradient overlay left */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Video panel — right side */}
      <div
        className="absolute rounded-xl overflow-hidden border"
        style={{
          right: isAr ? "auto" : "3rem",
          left: isAr ? "3rem" : "auto",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(260px,38%,500px)",
          aspectRatio: "16/9",
          borderColor: `${service.color}30`,
          boxShadow: `0 0 80px ${service.color}18, 0 20px 60px rgba(0,0,0,0.7)`,
        }}
      >
        <video
          ref={videoRef}
          key={service.video}
          src={service.video}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.75) saturate(0.9)" }}
        />
        {/* Overlay gradient on video */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 70%),
                         linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 40%)`,
          }}
        />
        {/* Video label */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
          <p
            className="text-xs tracking-[0.3em] uppercase font-light"
            style={{ color: service.color, textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
          >
            {isAr ? service.titleAr.replace("\n", " ") : service.titleEn.replace("\n", " ")}
          </p>
          <p className="text-[10px] text-white/45 mt-0.5 font-light">
            {isAr ? "لمشاهدة" : "Preview"}
          </p>
        </div>
      </div>

      {/* Left content */}
      <div className="relative z-10 p-10 md:p-14 max-w-lg">
        {/* Big number */}
        <span
          className="block font-extralight leading-none select-none mb-3"
          style={{
            fontSize: "clamp(4rem,8vw,7rem)",
            color: service.color,
            opacity: 0.12,
            transition: "color 0.6s ease",
          }}
        >
          {String(service.id + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <h2
          className="font-light leading-tight whitespace-pre-line -mt-6 mb-5"
          style={{
            fontSize: "clamp(1.8rem,3vw,2.8rem)",
            color: service.color,
            textShadow: `0 0 40px ${service.color}30`,
            transition: "color 0.6s ease",
          }}
        >
          {isAr ? service.titleAr : service.titleEn}
        </h2>

        {/* Divider */}
        <div
          className="w-10 h-px mb-6"
          style={{ background: service.color, transition: "background 0.6s ease" }}
        />

        {/* Description */}
        <p
          className="font-light leading-relaxed mb-8"
          style={{
            fontSize: "clamp(0.85rem,1.2vw,1rem)",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
          }}
        >
          {isAr ? service.descAr : service.descEn}
        </p>

        {/* CTA */}
        <a
          href="/contact"
          className="inline-flex items-center gap-4 text-xs tracking-[0.35em] uppercase group transition-colors duration-300"
          style={{ color: `${service.color}85` }}
          data-cursor-hover
        >
          {isAr ? "تواصل معنا" : "Start a project"}
          <span
            className="h-px transition-all duration-400 group-hover:w-14"
            style={{ width: 24, background: service.color, display: "block" }}
          />
        </a>
      </div>
    </div>
  );
}

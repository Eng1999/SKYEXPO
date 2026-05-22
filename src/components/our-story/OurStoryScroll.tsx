"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/* ─── Content ─────────────────────────────────────────────────────────── */
const PANELS = [
  {
    numEn: "01",
    numAr: "٠١",
    titleEn: "The Blueprint",
    titleAr: "الأساس",
    subtitleEn: "Since 2009",
    subtitleAr: "منذ 2009",
    bodyEn:
      "Established in Riyadh in 2009, SKY EXPO was built on a singular vision: to create experiences that endure. What began as an ambitious local venture has evolved into a distinguished creative house, operating at the intersection of high-end event management and cinematic production.",
    bodyAr:
      "تأسست سكاي اكسبو في الرياض عام 2009 برؤية واضحة: صناعة تجارب تبقى أثرها. ومنذ ذلك الحين، تطوّرت من انطلاقة محلية طموحة إلى بيت إبداعي متكامل، يعمل عند تقاطع إدارة الفعاليات الراقية والإنتاج السينمائي.",
    taglineEn: "We don't extend the scene — we reshape it.",
    taglineAr: "لسنا امتدادًا للمشهد — بل أحد من يعيد تشكيله.",
    color: "#FED172",
  },
  {
    numEn: "02",
    numAr: "٠٢",
    titleEn: "A Culture of",
    titleAr: "ثقافة",
    subtitleEn: "Excellence",
    subtitleAr: "التميّز",
    bodyEn:
      "At our core is a collective of exceptional Saudi talent — driven, precise, and relentlessly creative. We approach every project with intent, transforming ideas into refined, immersive experiences that go beyond expectation and set new benchmarks.",
    bodyAr:
      "في جوهر SKY EXPO نخبة من الكفاءات السعودية — مدفوعة بالشغف، ومنضبطة في التنفيذ، ومخلصة لفكرة الإبداع. كل مشروع يُبنى بعناية، حيث تتحول الأفكار إلى تجارب متقنة تتجاوز التوقعات وتؤسس لمعايير جديدة.",
    taglineEn: "Work defined by discipline, detail, and distinction.",
    taglineAr: "أعمالنا تُعرَف بالدقة، والاهتمام بالتفاصيل، والتميّز.",
    color: "#F3742B",
  },
  {
    numEn: "03",
    numAr: "٠٣",
    titleEn: "A Vision",
    titleAr: "رؤية",
    subtitleEn: "Forward",
    subtitleAr: "ممتدة",
    bodyEn:
      "Rooted in heritage and aligned with the progressive ambition of Saudi Arabia's Vision 2030, SKY EXPO continues to expand its creative footprint. We deliver world-class events and visual storytelling that resonate globally while remaining authentically grounded.",
    bodyAr:
      "منطلقة من جذور راسخة، ومتوافقة مع طموحات رؤية السعودية 2030، تواصل SKY EXPO توسيع حضورها الإبداعي. نقدّم فعاليات عالمية المستوى وسردًا بصريًا يصل إلى الجمهور عالميًا، دون أن يفقد ارتباطه بهويته.",
    taglineEn: "Global resonance. Saudi soul.",
    taglineAr: "حضور عالمي. روح سعودية.",
    color: "#7C6FCD",
  },
];

/* ─── Component ───────────────────────────────────────────────────────── */
export function OurStoryScroll({ videoSrc, videos }: { videoSrc?: string; videos?: string[] }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [muted, setMuted] = useState(true);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  /* sync mute to bg video */
  useEffect(() => {
    const v = bgVideoRef.current;
    if (!v) return;
    v.muted = muted;
    if (!muted) v.play().catch(() => {});
  }, [muted]);

  const sectionRef  = useRef<HTMLElement>(null);
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const TOTAL   = PANELS.length;
    const segSize = 1 / TOTAL;

    const update = () => {
      const rect        = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight - window.innerHeight;
      const raw         = Math.max(0, Math.min(1, -rect.top / totalHeight));

      /* ── Progress bar ── */
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${raw})`;
      }

      /* ── Active panel index ── */
      const activeIdx = Math.min(TOTAL - 1, Math.floor(raw / segSize + 0.15));
      if (counterRef.current) {
        counterRef.current.textContent = isAr
          ? PANELS[activeIdx].numAr
          : PANELS[activeIdx].numEn;
      }

      /* ── 3-D panel animation ── */
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;

        const segStart = i * segSize;
        const p        = (raw - segStart) / segSize; // progress within this panel's segment

        let opacity    = 0;
        let translateY = 0;
        let translateZ = 0;
        let rotateX    = 0;
        let scale      = 1;

        if (p < -0.15) {
          /* not yet arrived */
          const t  = Math.max(-1, p + 0.15);
          opacity   = 0;
          translateZ = t * 180;
          rotateX   = t * 14;
          translateY = -t * 40;
          scale     = 1 + t * 0.04;
        } else if (p < 0) {
          /* entrance — rising from depth */
          const t   = (p + 0.15) / 0.15;
          opacity    = t;
          translateZ = (1 - t) * -180;
          rotateX   = (1 - t) * -14;
          translateY = (1 - t) * 40;
          scale     = 1 - (1 - t) * 0.04;
        } else if (p <= 0.78) {
          /* fully active */
          opacity    = 1;
          translateZ = 0;
          rotateX   = 0;
          translateY = 0;
          scale     = 1;
        } else if (p <= 1) {
          /* exit — receding into distance */
          const t   = (p - 0.78) / 0.22;
          opacity    = 1 - t;
          translateZ = t * -160;
          rotateX   = t * -10;
          translateY = t * -25;
          scale     = 1 - t * 0.035;
        } else {
          /* past */
          opacity    = 0;
          translateZ = -160;
          translateY = -25;
        }

        panel.style.opacity    = String(Math.max(0, Math.min(1, opacity)));
        panel.style.transform  = `perspective(1200px) translateZ(${translateZ}px) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
        panel.style.transition = "opacity 0.15s linear";
        panel.style.pointerEvents = p >= 0 && p <= 1 ? "auto" : "none";
      });
    };

    /* RAF-throttled scroll handler */
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // init
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isAr]);

  /* ── single video src (videoSrc prop) or per-panel (videos prop) ── */
  const bgSrc = videoSrc ?? videos?.[0];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${PANELS.length * 100}vh` }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Sticky container ──────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Single background video ──────────────────────────────── */}
        <div className="absolute inset-0">
          {bgSrc ? (
            <video
              ref={bgVideoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.6) saturate(0.8)" }}
              autoPlay muted loop playsInline preload="none"
            >
              <source src={bgSrc} type="video/mp4" />
            </video>
          ) : (
            <>
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#080808 100%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 55% 0%,rgba(160,120,60,0.16) 0%,transparent 65%)" }} />
            </>
          )}

          {/* Legibility gradients */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.18) 45%,rgba(0,0,0,0.08) 70%,rgba(0,0,0,0.45) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.45) 0%,transparent 40%,transparent 60%,rgba(0,0,0,0.35) 100%)" }} />
        </div>

        {/* ── 3-D panel stack ────────────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 80%" }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="absolute inset-0 flex items-end pb-10 md:pb-20 px-5 sm:px-8 md:px-16 will-change-transform"
              style={{
                opacity: i === 0 ? 1 : 0,
                transform: i === 0
                  ? "perspective(1200px) translateZ(0px) translateY(0px) rotateX(0deg) scale(1)"
                  : "perspective(1200px) translateZ(-180px) translateY(40px) rotateX(-14deg) scale(0.96)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="w-full grid md:grid-cols-2 gap-12 items-end">

                {/* Left — number + title + tagline */}
                <div>
                  {/* Ghost number */}
                  <span
                    className="block font-extralight select-none"
                    style={{
                      color: panel.color,
                      opacity: 0.12,
                      lineHeight: 1,
                      fontSize: "clamp(4rem, 15vw, 10rem)",
                      marginBottom: 0,
                    }}
                  >
                    {isAr ? panel.numAr : panel.numEn}
                  </span>

                  {/* Title */}
                  <h2
                    className="text-[clamp(3.5rem,7.5vw,9.5rem)] font-bold leading-[0.88] uppercase -mt-4"
                    style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
                  >
                    {isAr ? panel.titleAr : panel.titleEn}
                  </h2>

                  {/* Subtitle */}
                  <h2
                    className="text-[clamp(3.5rem,7.5vw,9.5rem)] font-bold leading-[0.88] uppercase"
                    style={{ color: panel.color, textShadow: `0 2px 30px ${panel.color}55` }}
                  >
                    {isAr ? panel.subtitleAr : panel.subtitleEn}
                  </h2>

                  {/* Tagline */}
                  <p
                    className="mt-5 text-sm font-light tracking-wide italic"
                    style={{ color: "rgba(255,255,255,0.72)", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
                  >
                    {isAr ? panel.taglineAr : panel.taglineEn}
                  </p>
                </div>

                {/* Right — body */}
                <div className="md:pb-4">
                  <div className="w-8 h-px mb-6" style={{ background: panel.color }} />
                  <p
                    className="text-base font-light leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.88)", textShadow: "0 1px 12px rgba(0,0,0,0.95)" }}
                  >
                    {isAr ? panel.bodyAr : panel.bodyEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Top label + panel counter ── */}
        <div
          className="absolute top-20 md:top-28 flex items-center gap-4"
          style={{ left: isAr ? "auto" : "1.25rem", right: isAr ? "1.25rem" : "auto", ...(typeof window !== "undefined" && window.innerWidth >= 768 ? { [isAr ? "right" : "left"]: "4rem" } : {}) }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-white/55">
            {isAr ? "قصتنا" : "Our Story"}
          </span>
          <span className="block w-8 h-px bg-white/15" />
          <span ref={counterRef} className="text-xs tracking-widest text-white/55">
            {isAr ? PANELS[0].numAr : PANELS[0].numEn}
          </span>
        </div>

        {/* ── Side dots ── */}
        <div className="hidden md:flex absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
          {PANELS.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]">
          <div
            ref={progressRef}
            className="h-full origin-left"
            style={{
              background: "var(--accent, #FED172)",
              transform: "scaleX(0)",
              transition: "transform 0.08s linear",
            }}
          />
        </div>

        {/* ── Sound toggle ── */}
        {bgSrc && (
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-8 z-30 flex items-center gap-2"
            style={{ [isAr ? "left" : "right"]: "1.25rem" }}
            aria-label={muted ? "Enable sound" : "Mute"}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
              style={{ color: muted ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.75)" }}>
              {muted ? "SOUND OFF" : "SOUND ON"}
            </span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-400"
              style={{ borderColor: muted ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)", background: muted ? "transparent" : "rgba(255,255,255,0.08)" }}>
              {muted ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </span>
          </button>
        )}

        {/* ── Scroll hint ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.3 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-white">
            {isAr ? "اسحب للأسفل" : "Scroll"}
          </span>
          <div className="w-px h-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent animate-[scrollBar_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}

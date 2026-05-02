"use client";

import { useEffect, useRef } from "react";
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
      "في جوهر SKY EXPO نخبة من الكفاءات السعودية — مدفوعة بالشغف، ومنضبطة في التنفيذ، ومخلصة لفكرة الإبداع. كل مشروع يُبنى بعناية، حيث تتحول الأفكار إلى تجارب متقنة تتجاوز التوقعات.",
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
      "منطلقة من جذور راسخة، ومتوافقة مع طموحات رؤية السعودية 2030، تواصل SKY EXPO توسيع حضورها الإبداعي. نقدّم فعاليات عالمية المستوى وسردًا بصريًا يصل إلى الجمهور عالميًا دون أن يفقد ارتباطه بهويته.",
    taglineEn: "Global resonance. Saudi soul.",
    taglineAr: "حضور عالمي. روح سعودية.",
    color: "#231650",
  },
];

/* ─── Component ───────────────────────────────────────────────────────── */
export function OurStoryScroll({ videoSrc, videos }: { videoSrc?: string; videos?: string[] }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const TOTAL = PANELS.length; // 3

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight - window.innerHeight;
      // 0 → 1 across the full scroll range of the section
      const raw = Math.max(0, Math.min(1, -rect.top / totalHeight));

      // Each panel owns 1/TOTAL of the scroll range
      const segSize = 1 / TOTAL;

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${raw})`;
      }

      // Panel index label
      const activeIdx = Math.min(TOTAL - 1, Math.floor(raw / segSize + 0.15));
      if (counterRef.current) {
        counterRef.current.textContent = isAr
          ? PANELS[activeIdx].numAr
          : PANELS[activeIdx].numEn;
      }

      // Switch active video: bring active panel's video to front, fade others
      PANELS.forEach((_, vi) => {
        const vid = document.getElementById(`story-video-${vi}`) as HTMLVideoElement | null;
        if (vid) {
          vid.style.zIndex = String(vi === activeIdx ? 5 : vi);
          vid.style.opacity = vi === activeIdx ? "1" : "0";
        }
      });

      // Text panels: static position, just fade active one in/out
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === activeIdx;
        panel.style.opacity = isActive ? "1" : "0";
        panel.style.transform = "none";
        panel.style.transition = "opacity 0.9s ease";
        panel.style.pointerEvents = isActive ? "auto" : "none";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAr]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${PANELS.length * 100}vh` }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Sticky container ──────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video / gradient background — one video per panel */}
        <div className="absolute inset-0">
          {PANELS.map((_, i) => {
            const src = videos?.[i] ?? (i === 0 ? videoSrc : undefined);
            return src ? (
              <video
                key={src + i}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{
                  filter: "brightness(0.5) saturate(0.75)",
                  opacity: 1,
                  zIndex: i,
                  // Each video layered; active panel's video on top via JS below
                }}
                autoPlay muted loop playsInline
                id={`story-video-${i}`}
              >
                <source src={src} type="video/mp4" />
              </video>
            ) : null;
          })}
          {/* Gradient fallback if no video */}
          {!videoSrc && !videos?.length && (
            <>
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#080808 100%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 55% 0%,rgba(160,120,60,0.16) 0%,transparent 65%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 70%,rgba(35,22,80,0.4) 0%,transparent 65%)" }} />
              <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(88deg,transparent 0,transparent 120px,rgba(255,255,255,0.008) 120px,rgba(255,255,255,0.008) 121px)" }} />
            </>
          )}

          {/* Gradients for text legibility */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.3) 40%,rgba(0,0,0,0.15) 70%,rgba(0,0,0,0.55) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.5) 0%,transparent 35%,transparent 65%,rgba(0,0,0,0.4) 100%)" }} />
        </div>

        {/* ── Dynamic accent color overlay (changes per panel) ── */}
        <AccentOverlay />

        {/* ── Panel stack ────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-end pb-10 md:pb-20 px-5 sm:px-8 md:px-16" style={{ perspective: "1200px" }}>
          {PANELS.map((panel, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="absolute inset-0 flex items-end pb-10 md:pb-20 px-5 sm:px-8 md:px-16"
              style={{
                opacity: i === 0 ? 1 : 0,
                transition: "opacity 0.9s ease",
              }}
            >
              <div className="w-full grid md:grid-cols-2 gap-12 items-end">
                {/* Left — large number + heading */}
                <div>
                  {/* Number */}
                  <span
                    className="block font-extralight leading-none select-none mb-0"
                    style={{ color: panel.color, opacity: 0.1, lineHeight: 1, fontSize: "clamp(4rem, 15vw, 10rem)" }}
                  >
                    {isAr ? panel.numAr : panel.numEn}
                  </span>

                  {/* Title */}
                  <h2
                    className="text-[clamp(2.5rem,6vw,7rem)] font-extralight leading-[0.9] uppercase -mt-4"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {isAr ? panel.titleAr : panel.titleEn}
                  </h2>
                  {/* Subtitle in accent color */}
                  <h2
                    className="text-[clamp(2.5rem,6vw,7rem)] font-extralight leading-[0.9] uppercase"
                    style={{ color: panel.color }}
                  >
                    {isAr ? panel.subtitleAr : panel.subtitleEn}
                  </h2>

                  {/* Tagline */}
                  <p
                    className="mt-6 text-sm font-light tracking-wide italic"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {isAr ? panel.taglineAr : panel.taglineEn}
                  </p>
                </div>

                {/* Right — body text */}
                <div className="md:pb-4">
                  {/* Accent divider */}
                  <div
                    className="w-8 h-px mb-6"
                    style={{ background: panel.color }}
                  />
                  <p
                    className="text-base font-light leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {isAr ? panel.bodyAr : panel.bodyEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Top bar: logo area already in Navbar, skip. Add panel counter ── */}
        <div className="absolute top-20 md:top-28 left-5 md:left-16 flex items-center gap-4" style={{ right: isAr ? "auto" : undefined }}>
          <span
            className="text-xs tracking-[0.4em] uppercase text-white/55"
          >
            {isAr ? "قصتنا" : "Our Story"}
          </span>
          <span className="block w-8 h-px bg-white/15" />
          <span ref={counterRef} className="text-xs tracking-widest text-white/55">
            {isAr ? PANELS[0].numAr : PANELS[0].numEn}
          </span>
        </div>

        {/* ── Vertical side: section count ── */}
        <div className="hidden md:flex absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
          {PANELS.map((p, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-500"
              style={{ background: "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>

        {/* ── Scroll progress bar (bottom) ── */}
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

        {/* ── Scroll hint (only visible at very top) ── */}
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

/* Dummy component — no dynamic accent for now (keeps it pure CSS) */
function AccentOverlay() {
  return null;
}

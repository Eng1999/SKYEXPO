"use client";

/* ── All client logos ──────────────────────────────────────────────────── */
const LOGOS = [
  { src: "/images/clients/stc.png",               alt: "stc" },
  { src: "/images/clients/snb.png",               alt: "Saudi National Bank" },
  { src: "/images/clients/elm.png",               alt: "Elm" },
  { src: "/images/clients/cst.png",               alt: "CST" },
  { src: "/images/clients/gaca.png",              alt: "GACA" },
  { src: "/images/clients/socpa.png",             alt: "SOCPA" },
  { src: "/images/clients/media-ministry.png",    alt: "Ministry of Media" },
  { src: "/images/clients/education-ministry.png",alt: "Ministry of Education" },
  { src: "/images/clients/defense-ministry.jpg",  alt: "Ministry of Defense" },
  { src: "/images/clients/hrsd.png",              alt: "Ministry of HR" },
  { src: "/images/clients/king-salman-park.png",  alt: "King Salman Park" },
  { src: "/images/clients/roshn.png",             alt: "Roshn Front" },
  { src: "/images/clients/digital-city.png",      alt: "Digital City" },
  { src: "/images/clients/sidra.png",             alt: "Sidra Capital" },
  { src: "/images/clients/sera.png",              alt: "Electricity Regulatory" },
  { src: "/images/clients/darah.png",             alt: "Darah" },
  { src: "/images/clients/diwan.png",             alt: "Diwan Al Mazalem" },
  { src: "/images/clients/mawhiba.png",           alt: "Mawhiba" },
  { src: "/images/clients/ipa.png",               alt: "Institute of Public Admin" },
  { src: "/images/clients/riyadh-schools.png",    alt: "Riyadh Schools" },
  { src: "/images/clients/shuhada.png",           alt: "Shuhada Fund" },
  { src: "/images/clients/tbc.png",               alt: "TBC" },
  { src: "/images/clients/kadanah.png",           alt: "Kadanah" },
  { src: "/images/clients/al-murshid.png",        alt: "Al Murshid" },
  { src: "/images/clients/cbahi.svg",             alt: "CBAHI" },
  { src: "/images/clients/ejar.svg",              alt: "Ejar" },
];

/* Duplicate for seamless infinite scroll */
const TICKER = [...LOGOS, ...LOGOS];

/* ── Component ─────────────────────────────────────────────────────────── */
export function ClientLogos({ showLabel = true }: { showLabel?: boolean }) {
  return (
    /* Force LTR regardless of page language — logos and ticker
       must always scroll left-to-right so the seamless loop works */
    <section
      className="relative overflow-hidden"
      dir="ltr"
      style={{ background: "#f8f8f6" }}
    >
      {/* Top border accent */}
      <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.08)" }} />

      <div className="py-10 md:py-16">
        {/* Section label */}
        {showLabel && (
          <p
            className="text-center mb-12 font-medium tracking-[0.5em] uppercase"
            style={{ fontSize: "0.65rem", color: "rgba(0,0,0,0.4)" }}
          >
            Trusted by Saudi Arabia&apos;s leading organisations
          </p>
        )}

        {/* ── Row 1 — forward ── */}
        <div
          className="relative flex overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-14 shrink-0"
            style={{
              animation: "ticker 50s linear infinite",
              paddingRight: "3.5rem",
              willChange: "transform",
            }}
          >
            {TICKER.map((logo, i) => (
              <LogoItem key={i} logo={logo} />
            ))}
          </div>
        </div>

        {/* ── Row 2 — reverse ── */}
        <div
          className="relative flex overflow-hidden mt-10"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-14 shrink-0"
            style={{
              animation: "ticker_reverse 60s linear infinite",
              paddingRight: "3.5rem",
              willChange: "transform",
            }}
          >
            {[...TICKER].reverse().map((logo, i) => (
              <LogoItem key={i} logo={logo} dimmer />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.08)" }} />
    </section>
  );
}

/* ── Single logo item ──────────────────────────────────────────────────── */
function LogoItem({
  logo,
  dimmer = false,
}: {
  logo: { src: string; alt: string };
  dimmer?: boolean;
}) {
  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{ width: "clamp(90px, 20vw, 130px)", height: 56 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        style={{
          maxWidth: "clamp(80px, 18vw, 120px)",
          maxHeight: "52px",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          opacity: dimmer ? 0.5 : 0.7,
          transition: "opacity 0.35s ease, transform 0.35s ease",
          display: "block",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.opacity = "1";
          el.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.opacity = dimmer ? "0.5" : "0.7";
          el.style.transform = "scale(1)";
        }}
      />
    </div>
  );
}

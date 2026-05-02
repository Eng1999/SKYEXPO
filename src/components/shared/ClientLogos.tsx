"use client";

import { useLanguage } from "@/context/LanguageContext";

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
  { src: "/images/clients/foreign-affairs.svg",   alt: "Ministry of Foreign Affairs" },
];

/* Duplicate for seamless infinite scroll */
const TICKER = [...LOGOS, ...LOGOS];

/* ── Component ─────────────────────────────────────────────────────────── */
export function ClientLogos({ showLabel = true }: { showLabel?: boolean }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section
      className="relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
      style={{ background: "#f8f8f6" }}   /* light warm white — logos look natural */
    >
      {/* Top border accent */}
      <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.06)" }} />

      <div className="py-14">
        {/* Section label */}
        {showLabel && (
          <p className="text-center text-[9px] tracking-[0.55em] uppercase mb-10"
             style={{ color: "rgba(0,0,0,0.3)" }}>
            {isAr ? "عملاؤنا الذين وثقوا بنا" : "Trusted by Saudi Arabia's leading organisations"}
          </p>
        )}

        {/* Ticker row 1 — forward */}
        <div
          className="relative flex"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-12 shrink-0 animate-[ticker_45s_linear_infinite]"
            style={{ paddingRight: "3rem" }}
          >
            {TICKER.map((logo, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center"
                style={{ width: 110, height: 56 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    maxWidth: "110px",
                    maxHeight: "52px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    opacity: 0.55,
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "1";
                    el.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "0.55";
                    el.style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ticker row 2 — reverse */}
        <div
          className="relative flex mt-8"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-12 shrink-0 animate-[ticker_55s_linear_infinite_reverse]"
            style={{ paddingRight: "3rem" }}
          >
            {[...TICKER].reverse().map((logo, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center"
                style={{ width: 110, height: 56 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    maxWidth: "110px",
                    maxHeight: "52px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    opacity: 0.4,
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "1";
                    el.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "0.4";
                    el.style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.06)" }} />
    </section>
  );
}

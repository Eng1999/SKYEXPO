"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const CARDS = [
  {
    href: "/our-story",
    labelEn: "Our Story",
    labelAr: "قصتنا",
    descEn: "The vision that drives us — from a single idea to global impact.",
    descAr: "الرؤية التي تحرّكنا — من فكرة واحدة إلى أثر عالمي.",
    color: "#FED172",
    num: "01",
  },
  {
    href: "/capabilities",
    labelEn: "Capabilities",
    labelAr: "قدراتنا",
    descEn: "Design, production, logistics — everything under one roof.",
    descAr: "تصميم، إنتاج، لوجستيات — كل شيء تحت سقف واحد.",
    color: "#F3742B",
    num: "02",
  },
  {
    href: "/work",
    labelEn: "Work",
    labelAr: "أعمالنا",
    descEn: "A curated portfolio of landmark exhibitions and events.",
    descAr: "محفظة مختارة من المعارض والفعاليات البارزة.",
    color: "#B83A14",
    num: "03",
  },
  {
    href: "/contact",
    labelEn: "Let's Connect",
    labelAr: "تواصل معنا",
    descEn: "Have a vision? Let's build it together.",
    descAr: "لديك رؤية؟ دعنا نبنيها معاً.",
    color: "#612E37",
    num: "04",
  },
  {
    href: "/join",
    labelEn: "Join SKY EXPO",
    labelAr: "انضم إلى سكاي إكسبو",
    descEn: "Shape the future of exhibitions — join our world.",
    descAr: "شكّل مستقبل المعارض — انضم إلى عالمنا.",
    color: "#231650",
    num: "05",
  },
];

export function HomeNavCards() {
  const { lang } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);
  const isAr = lang === "ar";

  return (
    <section
      className="relative bg-black"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Section label */}
      <div className="px-16 pt-20 pb-10">
        <p className="text-xs tracking-[0.5em] uppercase text-white/55">
          {isAr ? "استكشف" : "Explore"}
        </p>
      </div>

      {/* Card stack */}
      <div className="flex flex-col">
        {CARDS.map((card) => {
          const isHov = hovered === card.href;
          return (
            <a
              key={card.href}
              href={card.href}
              className="relative flex items-center justify-between px-16 py-10 border-t border-white/[0.07] group overflow-hidden transition-colors duration-500"
              style={{
                background: isHov ? `${card.color}08` : "transparent",
              }}
              onMouseEnter={() => setHovered(card.href)}
              onMouseLeave={() => setHovered(null)}
              data-cursor-hover
            >
              {/* Hover accent left bar */}
              <span
                className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-500"
                style={{
                  background: card.color,
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                }}
              />

              {/* Number */}
              <span
                className="text-xs tracking-widest text-white/55 transition-colors duration-500 w-12 shrink-0"
                style={{ color: isHov ? `${card.color}80` : undefined }}
              >
                {card.num}
              </span>

              {/* Title */}
              <h3
                className="flex-1 text-3xl md:text-4xl font-extralight tracking-wide uppercase transition-colors duration-500"
                style={{ color: isHov ? card.color : "rgba(255,255,255,0.7)" }}
              >
                {isAr ? card.labelAr : card.labelEn}
              </h3>

              {/* Description — appears on hover */}
              <p
                className="hidden md:block max-w-xs text-sm font-light text-white/40 text-right transition-all duration-500"
                style={{
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "translateX(0)" : "translateX(10px)",
                }}
              >
                {isAr ? card.descAr : card.descEn}
              </p>

              {/* Arrow */}
              <span
                className="ml-8 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500"
                style={{
                  borderColor: isHov ? card.color : "rgba(255,255,255,0.15)",
                  color: isHov ? card.color : "rgba(255,255,255,0.3)",
                  transform: isHov ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>

      {/* Bottom padding */}
      <div className="h-20" />
    </section>
  );
}

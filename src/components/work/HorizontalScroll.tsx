"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const PROJECTS = [
  { id: 1, titleEn: "GITEX Global", titleAr: "جيتكس العالمي", year: "2024", colorHex: "#F3742B" },
  { id: 2, titleEn: "Saudi Vision Summit", titleAr: "قمة رؤية السعودية", year: "2024", colorHex: "#FED172" },
  { id: 3, titleEn: "Future Minerals Forum", titleAr: "منتدى المعادن المستقبلية", year: "2023", colorHex: "#B83A14" },
  { id: 4, titleEn: "Cityscape Global", titleAr: "سيتي سكيب العالمي", year: "2023", colorHex: "#612E37" },
  { id: 5, titleEn: "Biban Forum", titleAr: "منتدى بيبان", year: "2023", colorHex: "#231650" },
  { id: 6, titleEn: "World Defense Show", titleAr: "معرض الدفاع العالمي", year: "2022", colorHex: "#F3742B" },
];

export function HorizontalScroll() {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let animId: number;
    let targetX = 0;
    let currentX = 0;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      targetX = -(track.scrollWidth - window.innerWidth) * progress;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      track.style.transform = `translateX(${currentX}px)`;
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ height: `${PROJECTS.length * 50}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Section label */}
        <div className="absolute top-12 left-8 z-10">
          <p className="text-xs tracking-[0.5em] uppercase text-white/30">
            {lang === "en" ? "Selected Work" : "أبرز أعمالنا"}
          </p>
        </div>

        <div ref={trackRef} className="h-scroll-track gap-6 px-[15vw]" style={{ willChange: "transform" }}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  lang,
}: {
  project: (typeof PROJECTS)[0];
  lang: "en" | "ar";
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1.03)";
      cardRef.current.style.boxShadow = `0 0 60px ${project.colorHex}33`;
    }
  };

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1)";
      cardRef.current.style.boxShadow = "none";
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[60vw] md:w-[40vw] h-[60vh] bg-[#111111] overflow-hidden"
      style={{
        transition: "transform 0.5s cubic-bezier(0.77,0,0.175,1), box-shadow 0.5s ease",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-cursor-hover
    >
      {/* Color gradient placeholder */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, ${project.colorHex}18 0%, #111111 70%)`,
        }}
      />

      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: project.colorHex }}
      />

      {/* Content */}
      <div className="absolute bottom-10 left-10 right-10">
        <p className="text-xs tracking-widest text-white/30 uppercase mb-3">{project.year}</p>
        <h3 className="text-3xl font-light text-white leading-tight">
          {lang === "en" ? project.titleEn : project.titleAr}
        </h3>
      </div>
    </div>
  );
}

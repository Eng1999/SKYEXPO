"use client";

import { useRef, useState, useCallback } from "react";
import { GridItem } from "./GridItem";
import { VideoLens } from "./VideoLens";
import { useLanguage } from "@/context/LanguageContext";

const CAPABILITIES_EN = [
  { id: 1, title: "Exhibition Design", desc: "World-class booth experiences" },
  { id: 2, title: "Brand Activation", desc: "Live engagement campaigns" },
  { id: 3, title: "Event Production", desc: "End-to-end event execution" },
  { id: 4, title: "Digital Experience", desc: "Immersive tech integrations" },
  { id: 5, title: "Creative Direction", desc: "Cinematic brand storytelling" },
  { id: 6, title: "Logistics & Ops", desc: "Precision on every detail" },
];

const CAPABILITIES_AR = [
  { id: 1, title: "تصميم المعارض", desc: "تجارب أكشاك عالمية المستوى" },
  { id: 2, title: "تفعيل العلامات", desc: "حملات تفاعل مباشر" },
  { id: 3, title: "إنتاج الفعاليات", desc: "تنفيذ متكامل من البداية للنهاية" },
  { id: 4, title: "التجربة الرقمية", desc: "تكاملات تقنية غامرة" },
  { id: 5, title: "الإخراج الإبداعي", desc: "سرد سينمائي للعلامة التجارية" },
  { id: 6, title: "اللوجستيات والعمليات", desc: "دقة في كل تفصيل" },
];

export function CapabilitiesGrid() {
  const { lang } = useLanguage();
  const capabilities = lang === "en" ? CAPABILITIES_EN : CAPABILITIES_AR;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lensState, setLensState] = useState<{
    x: number;
    y: number;
    visible: boolean;
    expanded: boolean;
  }>({ x: 0, y: 0, visible: false, expanded: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLensState((prev) => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setLensState((prev) => ({ ...prev, visible: false, expanded: false }));
  }, []);

  const handleMouseDown = useCallback(() => {
    setLensState((prev) => ({ ...prev, expanded: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setLensState((prev) => ({ ...prev, expanded: false }));
  }, []);

  return (
    <section className="relative py-32 px-8 bg-[#0a0a0a] overflow-hidden">
      {/* Section title */}
      <div className="max-w-7xl mx-auto mb-20">
        <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-4">
          {lang === "en" ? "What we do" : "ما نفعله"}
        </p>
        <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
          {lang === "en" ? "Capabilities" : "قدراتنا"}
        </h2>
      </div>

      {/* Video lens interactive zone */}
      <div
        ref={sectionRef}
        className="relative max-w-7xl mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Capabilities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {capabilities.map((cap) => (
            <GridItem key={cap.id} title={cap.title} desc={cap.desc} />
          ))}
        </div>

        {/* Video lens reveal — cursor-driven clip-path */}
        <VideoLens
          lensX={lensState.x}
          lensY={lensState.y}
          visible={lensState.visible}
          expanded={lensState.expanded}
        />
      </div>

      {/* Hint text */}
      <p className="text-center text-xs tracking-widest text-white/55 uppercase mt-12">
        {lang === "en" ? "Move cursor · Hold to expand" : "حرك المؤشر · اضغط للتوسيع"}
      </p>
    </section>
  );
}

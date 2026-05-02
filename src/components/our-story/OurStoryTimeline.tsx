"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const MILESTONES = [
  {
    year: "2009",
    titleEn: "Foundation",
    titleAr: "التأسيس",
    descEn: "Sky Expo is established in Riyadh with a bold vision — to redefine what exhibitions and events can be in the Kingdom of Saudi Arabia.",
    descAr: "تأسست سكاي إكسبو في الرياض برؤية جريئة — إعادة تعريف ما يمكن أن تكون عليه المعارض والفعاليات في المملكة العربية السعودية.",
    color: "#FED172",
  },
  {
    year: "2012",
    titleEn: "Expansion",
    titleAr: "التوسع",
    descEn: "We open offices in Jeddah and Dammam, extending our reach across all three major Saudi cities and diversifying our event portfolio.",
    descAr: "افتتحنا مكاتب في جدة والدمام، لنوسع نطاق عملنا عبر المدن السعودية الرئيسية الثلاث ونُنوّع محفظة فعالياتنا.",
    color: "#F3742B",
  },
  {
    year: "2016",
    titleEn: "International Reach",
    titleAr: "الامتداد الدولي",
    descEn: "Sky Expo begins serving international clients, delivering exhibitions and events that cross borders and set new regional standards.",
    descAr: "بدأت سكاي إكسبو في خدمة عملاء دوليين، مقدمةً معارض وفعاليات تتجاوز الحدود وتضع معايير إقليمية جديدة.",
    color: "#B83A14",
  },
  {
    year: "2019",
    titleEn: "Decade of Excellence",
    titleAr: "عقد من التميز",
    descEn: "Celebrating 10 years with over 60 satisfied clients, a team of 70+ professionals, and a fleet of 1,500+ specialized tools and equipment.",
    descAr: "الاحتفال بـ١٠ سنوات مع أكثر من ٦٠ عميلاً راضياً، وفريق من أكثر من ٧٠ محترفاً، وأسطول من أكثر من ١٥٠٠ أداة ومعدة متخصصة.",
    color: "#612E37",
  },
  {
    year: "Today",
    titleEn: "Crafting the Future",
    titleAr: "نصنع المستقبل",
    descEn: "Leading Saudi Arabia's exhibition industry into a new era — where every moment becomes a legacy that endures.",
    descAr: "نقود صناعة المعارض السعودية إلى حقبة جديدة — حيث تتحول كل لحظة إلى إرث يدوم.",
    color: "#231650",
  },
];

export function OurStoryTimeline() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section
      className="relative bg-black py-24 px-16"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Section label */}
      <div className="max-w-6xl mx-auto mb-16">
        <p className="text-xs tracking-[0.5em] uppercase text-white/55 mb-3">
          {isAr ? "رحلتنا" : "Our Journey"}
        </p>
        <h2 className="text-3xl md:text-5xl font-extralight text-white">
          {isAr ? "المحطات التي شكّلتنا" : "Milestones that shaped us"}
        </h2>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/[0.06]"
          style={{ left: isAr ? "auto" : "5rem", right: isAr ? "5rem" : "auto" }}
        />

        <div className="flex flex-col gap-0">
          {MILESTONES.map((m, i) => (
            <TimelineItem key={i} item={m} isAr={isAr} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  isAr,
  index,
}: {
  item: (typeof MILESTONES)[0];
  isAr: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-16 py-12 border-b border-white/[0.05]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${isAr ? 30 : -30}px)`,
        transition: `opacity 1s cubic-bezier(0.77,0,0.175,1) ${index * 0.08}s, transform 1s cubic-bezier(0.77,0,0.175,1) ${index * 0.08}s`,
      }}
    >
      {/* Year column */}
      <div className="shrink-0 w-20 flex flex-col items-center gap-3 pt-1">
        {/* Dot on timeline */}
        <div
          className="w-3 h-3 rounded-full border-2 shrink-0"
          style={{ borderColor: item.color, background: "black" }}
        />
        <span
          className="text-sm font-light tracking-widest"
          style={{ color: item.color }}
        >
          {item.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <h3 className="text-xl md:text-2xl font-light text-white mb-3">
          {isAr ? item.titleAr : item.titleEn}
        </h3>
        <p className="text-sm font-light leading-relaxed text-white/40">
          {isAr ? item.descAr : item.descEn}
        </p>
      </div>
    </div>
  );
}

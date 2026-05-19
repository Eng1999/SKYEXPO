"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT, SOCIAL } from "@/lib/social";

const ACCENT = "#C0392B";

function GeometricElement() {
  return (
    <svg width="160" height="160" viewBox="0 0 260 260" fill="none"
      xmlns="http://www.w3.org/2000/svg" className="opacity-15" aria-hidden>
      <circle cx="130" cy="130" r="128" stroke="white" strokeWidth="0.5" />
      <circle cx="130" cy="130" r="96"  stroke="white" strokeWidth="0.5" />
      <circle cx="130" cy="130" r="64"  stroke="white" strokeWidth="0.8" />
      <line x1="130" y1="2"   x2="130" y2="258" stroke="white" strokeWidth="0.4" />
      <line x1="2"   y1="130" x2="258" y2="130" stroke="white" strokeWidth="0.4" />
      <line x1="2"  y1="2"   x2="24"  y2="2"   stroke={ACCENT} strokeWidth="2" />
      <line x1="2"  y1="2"   x2="2"   y2="24"  stroke={ACCENT} strokeWidth="2" />
      <line x1="258" y1="2"  x2="236" y2="2"   stroke={ACCENT} strokeWidth="2" />
      <line x1="258" y1="2"  x2="258" y2="24"  stroke={ACCENT} strokeWidth="2" />
      <line x1="2"  y1="258" x2="24"  y2="258" stroke={ACCENT} strokeWidth="2" />
      <line x1="2"  y1="258" x2="2"   y2="236" stroke={ACCENT} strokeWidth="2" />
      <line x1="258" y1="258" x2="236" y2="258" stroke={ACCENT} strokeWidth="2" />
      <line x1="258" y1="258" x2="258" y2="236" stroke={ACCENT} strokeWidth="2" />
      <circle cx="130" cy="130" r="3" fill={ACCENT} />
    </svg>
  );
}

function ContactForm({ isAr }: { isAr: boolean }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className="text-2xl font-light text-white mb-3">
          {isAr ? "تم الإرسال" : "Message received."}
        </p>
        <p className="text-sm text-white/50">
          {isAr ? "سنتواصل معك قريباً" : "We'll be in touch shortly."}
        </p>
      </div>
    );
  }

  const labelClass = "block text-[11px] tracking-[0.4em] uppercase font-medium mb-3";
  const inputClass =
    "w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm py-4 placeholder-white/40 transition-colors duration-400";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
      <div>
        <label className={labelClass} style={{ color: "rgba(255,255,255,0.55)" }}>
          {isAr ? "الاسم الكامل" : "Full Name"}
        </label>
        <input type="text" required placeholder={isAr ? "اسمك هنا" : "Your name"}
          className={inputClass} dir={isAr ? "rtl" : "ltr"} />
      </div>

      {/* Email + Phone: stack on mobile, side-by-side on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        <div>
          <label className={labelClass} style={{ color: "rgba(255,255,255,0.55)" }}>
            {isAr ? "البريد الإلكتروني" : "Email"}
          </label>
          <input type="email" required placeholder={isAr ? "بريدك@مثال.com" : "you@example.com"}
            className={inputClass} dir="ltr" />
        </div>
        <div>
          <label className={labelClass} style={{ color: "rgba(255,255,255,0.55)" }}>
            {isAr ? "الهاتف" : "Phone"}
          </label>
          <input type="tel" placeholder="+966 5x xxxx xxxx" className={inputClass} dir="ltr" />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ color: "rgba(255,255,255,0.55)" }}>
          {isAr ? "رسالتك" : "Message"}
        </label>
        <textarea required rows={4}
          placeholder={isAr ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
          className={`${inputClass} resize-none leading-relaxed`} dir={isAr ? "rtl" : "ltr"} />
      </div>

      <button type="submit" disabled={sending}
        className="group flex items-center gap-5 self-start text-sm tracking-[0.3em] uppercase font-medium text-white/70 hover:text-white transition-colors duration-400"
        data-cursor-hover>
        <span className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center
          group-hover:border-white/70 group-hover:scale-110 transition-all duration-400">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="transition-transform duration-400 group-hover:translate-x-0.5">
            <path d="M1 7h12M8 2l5 5-5 5" />
          </svg>
        </span>
        {sending
          ? isAr ? "جارٍ الإرسال..." : "Sending..."
          : isAr ? "إرسال الرسالة" : "Send Message"}
      </button>
    </form>
  );
}

export function ContactSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="relative bg-black min-h-screen overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      {/* Subtle accent glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at ${isAr ? "80%" : "20%"} 40%, rgba(192,57,43,0.08) 0%, transparent 55%)` }} />

      {/* Stack on mobile, 2-col on md+ */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 md:pt-36 pb-10 md:pb-16 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div>
            {/* Eyebrow */}
            <p className="text-[11px] tracking-[0.6em] uppercase font-medium mb-8 md:mb-12"
               style={{ color: ACCENT }}>
              {isAr ? "تواصل معنا" : "Let's Connect"}
            </p>

            {/* Giant headline */}
            <div
              className="font-bold mb-8 md:mb-14"
              style={{
                fontSize: isAr ? "clamp(2.5rem,6.5vw,6.5rem)" : "clamp(2.8rem,7vw,7rem)",
                textShadow: "0 2px 30px rgba(0,0,0,0.5)",
                lineHeight: isAr ? 1.2 : 0.9,
              }}
            >
              {isAr ? (
                <>
                  <span className="block text-white">لنبدأ</span>
                  <span className="block" style={{ color: ACCENT }}>حديثًا</span>
                  <span className="block text-white">حقيقيًا</span>
                </>
              ) : (
                <>
                  <span className="block text-white uppercase tracking-tight">LET&apos;S</span>
                  <span className="block uppercase tracking-tight" style={{ color: ACCENT }}>GET IN</span>
                  <span className="block text-white uppercase tracking-tight">TOUCH</span>
                </>
              )}
            </div>

            {/* Geometric element — hide on small mobile */}
            <div className="hidden sm:block mb-10 md:mb-14 relative inline-block">
              <GeometricElement />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[9px] tracking-[0.5em] uppercase text-white/40 font-medium">SKY EXPO</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4 md:gap-5 mb-8 md:mb-12">
              {[
                { href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: <path d="M2 7l10 7 10-7" />, box: true },
                { href: `tel:${CONTACT.phone1.replace(/\s/g,"")}`, label: CONTACT.phone1, icon: <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />, box: false },
                { href: `tel:${CONTACT.phone2.replace(/\s/g,"")}`, label: CONTACT.phone2, icon: <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />, box: false },
              ].map((item, i) => (
                <a key={i} href={item.href}
                  className="flex items-center gap-4 text-sm text-white/80 hover:text-white transition-colors duration-400"
                  data-cursor-hover>
                  <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
                      {item.box && <rect x="2" y="4" width="20" height="16" rx="2" />}
                      {item.icon}
                    </svg>
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              {SOCIAL.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                    text-white/50 hover:text-white hover:border-white/40 transition-all duration-400"
                  data-cursor-hover>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: s.icon }} />
                </a>
              ))}
            </div>

            {/* ── Profile Download ── */}
            <div className="mb-8 md:mb-16">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4"
                 style={{ color: "rgba(255,255,255,0.3)" }}>
                {isAr ? "ملف التعريف" : "Company Profile"}
              </p>
              <a
                href="/SKY-EXPO-Profile.pdf"
                download="SKY-EXPO-Profile.pdf"
                className="group inline-flex items-center gap-4 transition-all duration-400"
                data-cursor-hover
              >
                {/* Icon box */}
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-400 group-hover:scale-105"
                  style={{
                    borderColor: `${ACCENT}40`,
                    background: `${ACCENT}10`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `${ACCENT}20`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}80`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = `${ACCENT}10`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}40`;
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <polyline points="9 15 12 18 15 15" />
                  </svg>
                </span>

                {/* Label */}
                <div>
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                    {isAr ? "تحميل البروفايل" : "Download Profile"}
                  </p>
                  <p className="text-[10px] tracking-widest uppercase mt-0.5"
                     style={{ color: "rgba(255,255,255,0.3)" }}>
                    PDF · 33 MB
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-x-2 group-hover:translate-x-0"
                  style={{ transform: isAr ? "scaleX(-1)" : undefined }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* City strip */}
          <div className="flex flex-wrap gap-6 md:gap-8 border-t border-white/[0.06] pt-6 md:pt-8">
            {CONTACT.locations.map((loc) => (
              <div key={loc.cityEn}>
                <p className="text-[10px] tracking-[0.4em] uppercase font-medium mb-1"
                   style={{ color: "rgba(255,255,255,0.45)" }}>
                  {isAr ? loc.cityAr : loc.cityEn}
                </p>
                <p className="text-xs text-white/60 font-light">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-12 py-12 md:pt-36 md:pb-16">
          <p className="text-[11px] tracking-[0.6em] uppercase font-medium mb-8 md:mb-12"
             style={{ color: "rgba(255,255,255,0.45)" }}>
            {isAr ? "أرسل رسالة" : "Send a message"}
          </p>
          <ContactForm isAr={isAr} />
        </div>
      </div>
    </div>
  );
}

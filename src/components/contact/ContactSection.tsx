"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT, SOCIAL } from "@/lib/social";

/* ── Geometric SVG element ─────────────────────────────────────────────── */
function GeometricElement() {
  return (
    <svg
      width="260"
      height="260"
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-20"
      aria-hidden
    >
      {/* Outer ring */}
      <circle cx="130" cy="130" r="128" stroke="#612E37" strokeWidth="0.5" />
      {/* Mid ring */}
      <circle cx="130" cy="130" r="96" stroke="#612E37" strokeWidth="0.5" />
      {/* Inner ring */}
      <circle cx="130" cy="130" r="64" stroke="#612E37" strokeWidth="1" />
      {/* Crosshair */}
      <line x1="130" y1="2" x2="130" y2="258" stroke="#612E37" strokeWidth="0.4" />
      <line x1="2" y1="130" x2="258" y2="130" stroke="#612E37" strokeWidth="0.4" />
      {/* Diagonal lines */}
      <line x1="40" y1="40" x2="220" y2="220" stroke="#612E37" strokeWidth="0.4" />
      <line x1="220" y1="40" x2="40" y2="220" stroke="#612E37" strokeWidth="0.4" />
      {/* Corner ticks */}
      <line x1="2" y1="2" x2="24" y2="2" stroke="#612E37" strokeWidth="1.5" />
      <line x1="2" y1="2" x2="2" y2="24" stroke="#612E37" strokeWidth="1.5" />
      <line x1="258" y1="2" x2="236" y2="2" stroke="#612E37" strokeWidth="1.5" />
      <line x1="258" y1="2" x2="258" y2="24" stroke="#612E37" strokeWidth="1.5" />
      <line x1="2" y1="258" x2="24" y2="258" stroke="#612E37" strokeWidth="1.5" />
      <line x1="2" y1="258" x2="2" y2="236" stroke="#612E37" strokeWidth="1.5" />
      <line x1="258" y1="258" x2="236" y2="258" stroke="#612E37" strokeWidth="1.5" />
      <line x1="258" y1="258" x2="258" y2="236" stroke="#612E37" strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx="130" cy="130" r="3" fill="#612E37" />
    </svg>
  );
}

/* ── Contact form ──────────────────────────────────────────────────────── */
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
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
        <div
          className="w-16 h-16 rounded-full border flex items-center justify-center mb-8"
          style={{ borderColor: "#612E3750" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#612E37" strokeWidth="1.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className="text-2xl font-extralight text-white mb-3">
          {isAr ? "تم الإرسال" : "Message received."}
        </p>
        <p className="text-sm text-white/30">
          {isAr ? "سنتواصل معك قريباً" : "We'll be in touch shortly."}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-white/10 focus:border-white/30 outline-none text-white text-sm font-light py-4 placeholder-white/20 transition-colors duration-500";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* Full Name */}
      <div>
        <label className="block text-[10px] tracking-[0.4em] uppercase text-white/20 mb-3">
          {isAr ? "الاسم الكامل" : "Full Name"}
        </label>
        <input
          type="text"
          required
          placeholder={isAr ? "اسمك هنا" : "Your name"}
          className={inputClass}
          dir={isAr ? "rtl" : "ltr"}
        />
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] tracking-[0.4em] uppercase text-white/20 mb-3">
            {isAr ? "البريد الإلكتروني" : "Email"}
          </label>
          <input
            type="email"
            required
            placeholder={isAr ? "بريدك@مثال.com" : "you@example.com"}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.4em] uppercase text-white/20 mb-3">
            {isAr ? "الهاتف" : "Phone"}
          </label>
          <input
            type="tel"
            placeholder={isAr ? "+966 5x xxxx xxxx" : "+966 5x xxxx xxxx"}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[10px] tracking-[0.4em] uppercase text-white/20 mb-3">
          {isAr ? "رسالتك" : "Message"}
        </label>
        <textarea
          required
          rows={5}
          placeholder={isAr ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
          className={`${inputClass} resize-none leading-relaxed`}
          dir={isAr ? "rtl" : "ltr"}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="group flex items-center gap-4 self-start text-xs tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors duration-500"
        data-cursor-hover
      >
        <span className="relative">
          {sending
            ? isAr ? "جارٍ الإرسال..." : "Sending..."
            : isAr ? "إرسال الرسالة" : "Send Message"}
        </span>
        <span
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110"
          style={{ borderColor: "#612E3750" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="#612E37"
            strokeWidth="1.5"
            className="transition-transform duration-500 group-hover:translate-x-0.5"
          >
            <path d="M1 7h12M8 2l5 5-5 5" />
          </svg>
        </span>
      </button>
    </form>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export function ContactSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const ACCENT = "#612E37";

  return (
    <div
      className="relative bg-black min-h-screen overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: `radial-gradient(ellipse at ${isAr ? "80%" : "20%"} 50%, ${ACCENT}12 0%, transparent 55%)`,
        }}
      />

      {/* Grain texture */}
      <div className="noise-overlay" />

      {/* Split grid */}
      <div className="relative z-10 grid md:grid-cols-2 min-h-screen">
        {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
        <div className="flex flex-col justify-between px-12 pt-36 pb-16 border-r border-white/[0.05]">
          {/* Eyebrow */}
          <div>
            <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 mb-16">
              {isAr ? "تواصل معنا" : "Let's Connect"}
            </p>

            {/* Giant headline */}
            <h1
              className="font-extralight uppercase leading-[0.88] mb-16"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 7rem)",
                color: ACCENT,
              }}
            >
              {isAr ? (
                <>
                  لنبدأ
                  <br />
                  حديثًا
                  <br />
                  حقيقيًا
                </>
              ) : (
                <>
                  LET&apos;S
                  <br />
                  GET IN
                  <br />
                  TOUCH
                </>
              )}
            </h1>

            {/* Geometric element */}
            <div className="mb-16 relative">
              <GeometricElement />
              {/* Spinning label */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <p className="text-[9px] tracking-[0.5em] uppercase text-white/20">
                  {isAr ? "سكاي اكسبو" : "SKY EXPO"}
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-5 mb-12">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 text-sm font-light text-white/40 hover:text-white transition-colors duration-500"
                data-cursor-hover
              >
                <span
                  className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-500"
                  style={{ borderColor: `${ACCENT}30` }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </span>
                {CONTACT.email}
              </a>

              <a
                href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 text-sm font-light text-white/40 hover:text-white transition-colors duration-500"
                data-cursor-hover
              >
                <span
                  className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
                  style={{ borderColor: `${ACCENT}30` }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                {CONTACT.phone1}
              </a>

              <a
                href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 text-sm font-light text-white/40 hover:text-white transition-colors duration-500"
                data-cursor-hover
              >
                <span
                  className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
                  style={{ borderColor: `${ACCENT}30` }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                {CONTACT.phone2}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mb-16">
              {SOCIAL.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-500"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  data-cursor-hover
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: s.icon }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* City strip at bottom */}
          <div className="flex gap-8 border-t border-white/[0.06] pt-8">
            {CONTACT.locations.map((loc) => (
              <div key={loc.cityEn}>
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-1">
                  {isAr ? loc.cityAr : loc.cityEn}
                </p>
                <p className="text-xs text-white/40 font-light">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-12 pt-36 pb-16">
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/15 mb-12">
            {isAr ? "أرسل رسالة" : "Send a message"}
          </p>
          <ContactForm isAr={isAr} />
        </div>
      </div>
    </div>
  );
}

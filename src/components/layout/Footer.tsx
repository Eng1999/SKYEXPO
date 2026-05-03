"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CONTACT, SOCIAL } from "@/lib/social";

const NAV = [
  { href: "/",             labelEn: "Home",         labelAr: "الرئيسية" },
  { href: "/our-story",   labelEn: "Our Story",    labelAr: "قصتنا" },
  { href: "/capabilities",labelEn: "Capabilities", labelAr: "قدراتنا" },
  { href: "/work",        labelEn: "Our Work",     labelAr: "أعمالنا" },
  { href: "/contact",     labelEn: "Contact",      labelAr: "تواصل معنا" },
  { href: "/join",        labelEn: "Join Us",      labelAr: "انضم إلينا" },
];

export function Footer() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <footer
      dir={isAr ? "rtl" : "ltr"}
      className="relative border-t"
      style={{ background: "#060608", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{
        background: "linear-gradient(to right, transparent, rgba(184,58,20,0.5), rgba(254,209,114,0.3), transparent)"
      }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand col */}
          <div>
            {/* Logo text */}
            <div className="mb-6">
              <p className="text-xs tracking-[0.55em] uppercase font-light text-white/30 mb-1">
                {isAr ? "سكاي" : "SKY"}
              </p>
              <p
                className="text-2xl font-bold tracking-wider uppercase"
                style={{ color: "#B83A14", letterSpacing: "0.2em" }}
              >
                EXPO
              </p>
            </div>

            <p
              className="text-sm font-light leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: 280 }}
            >
              {isAr
                ? "شركة سعودية رائدة في تصميم وتنفيذ المعارض والمؤتمرات والفعاليات منذ ٢٠٠٩."
                : "Saudi Arabia's premier exhibitions, conferences & events company since 2009."}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIAL.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,58,20,0.6)";
                    (e.currentTarget as HTMLElement).style.color = "#B83A14";
                    (e.currentTarget as HTMLElement).style.background = "rgba(184,58,20,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: s.icon }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation col */}
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-6"
               style={{ color: "rgba(255,255,255,0.3)" }}>
              {isAr ? "الصفحات" : "Navigation"}
            </p>
            <ul className="space-y-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light transition-colors duration-300 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-6"
               style={{ color: "rgba(255,255,255,0.3)" }}>
              {isAr ? "تواصل معنا" : "Contact"}
            </p>

            <div className="space-y-4">
              {/* Phone */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {isAr ? "الهاتف" : "Phone"}
                </p>
                <a href={`tel:${CONTACT.phone1}`}
                   className="text-sm font-light block transition-colors duration-300 hover:text-white"
                   style={{ color: "rgba(255,255,255,0.55)", direction: "ltr", textAlign: isAr ? "right" : "left" }}>
                  {CONTACT.phone1}
                </a>
                <a href={`tel:${CONTACT.phone2}`}
                   className="text-sm font-light block transition-colors duration-300 hover:text-white"
                   style={{ color: "rgba(255,255,255,0.55)", direction: "ltr", textAlign: isAr ? "right" : "left" }}>
                  {CONTACT.phone2}
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </p>
                <a href={`mailto:${CONTACT.email}`}
                   className="text-sm font-light transition-colors duration-300 hover:text-white"
                   style={{ color: "rgba(255,255,255,0.55)" }}>
                  {CONTACT.email}
                </a>
              </div>

              {/* Cities */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {isAr ? "مواقعنا" : "Locations"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CONTACT.locations.map((loc) => (
                    <span
                      key={loc.cityEn}
                      className="text-[10px] tracking-[0.3em] uppercase px-2 py-1 border"
                      style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)" }}
                    >
                      {isAr ? loc.cityAr : loc.cityEn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} SKY EXPO.{" "}
            {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
            {isAr ? "صُنع بشغف في المملكة العربية السعودية 🇸🇦" : "Made with passion in Saudi Arabia 🇸🇦"}
          </p>
        </div>
      </div>
    </footer>
  );
}

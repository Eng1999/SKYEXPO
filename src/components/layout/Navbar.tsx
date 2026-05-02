"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavLink } from "./NavLink";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { PAGE_COLORS } from "@/lib/colors";
import { SOCIAL } from "@/lib/social";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/our-story",    labelEn: "Our Story",    labelAr: "قصتنا",   color: PAGE_COLORS["/our-story"] },
  { href: "/capabilities", labelEn: "Capabilities", labelAr: "قدراتنا", color: PAGE_COLORS["/capabilities"] },
  { href: "/work",         labelEn: "Work",          labelAr: "أعمالنا", color: PAGE_COLORS["/work"] },
  { href: "/contact",      labelEn: "Let's Connect", labelAr: "تواصل",   color: PAGE_COLORS["/contact"] },
  { href: "/join",         labelEn: "Join SKY EXPO", labelAr: "انضم",    color: PAGE_COLORS["/join"] },
];

export function Navbar() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        dir={isAr ? "rtl" : "ltr"}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-700",
          scrolled || menuOpen
            ? "bg-black/95 backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-gradient-to-b from-black/75 to-transparent"
        )}
      >
        {/* ── Logo ── */}
        <a href="/" className="flex items-center shrink-0" data-cursor-hover onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/skyexpo-logo.png"
            alt="Sky Expo"
            width={160}
            height={60}
            className="object-contain"
            style={{ height: "38px", width: "auto", display: "block" }}
            priority
          />
        </a>

        {/* ── Centre: Nav links (desktop) ── */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              labelEn={item.labelEn}
              labelAr={item.labelAr}
              lang={lang}
              color={item.color}
            />
          ))}
        </nav>

        {/* ── Right: social + lang + hamburger ── */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-white/45 hover:text-white transition-colors duration-300"
                data-cursor-hover
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"
                  dangerouslySetInnerHTML={{ __html: s.icon }} />
              </a>
            ))}
          </div>

          <span className="hidden lg:block w-px h-4 bg-white/10" />

          <LanguageToggle />

          {/* Hamburger — large touch target */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 rounded-sm"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block h-[1.5px] bg-white/80 transition-all duration-300 origin-center"
              style={{
                width: menuOpen ? "20px" : "20px",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] bg-white/80 transition-all duration-300"
              style={{
                width: "20px",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block h-[1.5px] bg-white/80 transition-all duration-300 origin-center"
              style={{
                width: menuOpen ? "20px" : "12px",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black flex flex-col transition-all duration-500 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        dir={isAr ? "rtl" : "ltr"}
        aria-hidden={!menuOpen}
      >
        {/* Top spacer for navbar */}
        <div className="h-16 shrink-0" />

        {/* Nav links */}
        <nav className="flex flex-col flex-1 justify-center px-8 gap-2">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/[0.07] group"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-widest text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className="text-2xl font-extralight uppercase tracking-wide text-white/85 group-hover:text-white transition-colors duration-300"
                >
                  {isAr ? item.labelAr : item.labelEn}
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2">
                <path d={isAr ? "M12 8H4M7 4l-4 4 4 4" : "M4 8h8M9 4l4 4-4 4"} />
              </svg>
            </a>
          ))}
        </nav>

        {/* Bottom: social + lang */}
        <div className="px-8 pb-12 flex items-center justify-between border-t border-white/[0.07] pt-6">
          <div className="flex items-center gap-4">
            {SOCIAL.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="text-white/40 hover:text-white transition-colors duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"
                  dangerouslySetInnerHTML={{ __html: s.icon }} />
              </a>
            ))}
          </div>
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}

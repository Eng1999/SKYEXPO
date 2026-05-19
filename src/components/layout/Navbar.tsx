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

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when menu open — touch-safe method
  useEffect(() => {
    if (menuOpen) {
      const y = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const y = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, y);
    }
  }, [menuOpen]);

  // Escape key closes menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Top Bar ── */}
      <header
        ref={navRef}
        dir={isAr ? "rtl" : "ltr"}
        className={cn(
          "fixed top-0 left-0 right-0 z-[70] flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-700",
          scrolled || menuOpen
            ? "bg-black/95 backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-gradient-to-b from-black/75 to-transparent"
        )}
      >
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0" data-cursor-hover onClick={() => setMenuOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/skyexpo-logo.png?v=2"
            alt="Sky Expo"
            style={{ height: "46px", width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop nav links */}
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

        {/* Right side: social + lang + hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
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

          {/* Hamburger button */}
          <button
            className="md:hidden relative flex flex-col justify-center items-center w-12 h-12 -mr-1"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="absolute block h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
              style={{
                width: 22,
                transform: menuOpen ? "translateY(0) rotate(45deg)" : "translateY(-6px)",
              }}
            />
            <span
              className="absolute block h-[2px] bg-white rounded-full transition-all duration-300"
              style={{
                width: menuOpen ? 0 : 22,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="absolute block h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
              style={{
                width: menuOpen ? 22 : 14,
                transform: menuOpen ? "translateY(0) rotate(-45deg)" : "translateY(6px)",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Drawer ── */}
      {/* z-[60]: above page content (z-0) but below header (z-[70]) */}
      <div
        id="mobile-menu"
        dir={isAr ? "rtl" : "ltr"}
        className="md:hidden fixed inset-0 z-[60] bg-[#080808] flex flex-col"
        style={{
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "opacity 0.35s ease, visibility 0.35s ease",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Accent glow top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(184,58,20,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Spacer for header */}
        <div className="h-[60px] shrink-0" />

        {/* Nav Links */}
        <nav className="flex flex-col flex-1 justify-center px-6 sm:px-10 gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-5 border-b group"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : isAr ? "translateX(20px)" : "translateX(-20px)",
                transition: `opacity 0.4s ease ${i * 0.06 + 0.05}s, transform 0.4s ease ${i * 0.06 + 0.05}s`,
              }}
            >
              <div className="flex items-center gap-5">
                <span
                  className="text-[11px] tracking-widest tabular-nums"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[1.6rem] font-semibold uppercase leading-none text-white/85 group-hover:text-white transition-colors duration-300"
                  style={{ color: undefined }}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </span>
              </div>
              {/* Arrow */}
              <svg
                width="18" height="18" viewBox="0 0 18 18" fill="none"
                stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
                style={{ transform: isAr ? "scaleX(-1)" : undefined, flexShrink: 0 }}
              >
                <path d="M3.5 9h11M9.5 4l5 5-5 5" />
              </svg>
            </a>
          ))}
        </nav>

        {/* Bottom bar */}
        <div
          className="px-6 sm:px-10 pb-10 pt-6 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.35s",
          }}
        >
          {/* Social */}
          <div className="flex items-center gap-4">
            {SOCIAL.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"
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

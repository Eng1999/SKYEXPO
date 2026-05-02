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
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      dir={isAr ? "rtl" : "ltr"}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-700",
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-gradient-to-b from-black/70 to-transparent"
      )}
    >
      {/* Logo — first in DOM: left in LTR (EN), right in RTL (AR) */}
      <a href="/" className="flex items-center shrink-0" data-cursor-hover>
        <Image
          src="/images/skyexpo-logo.png"
          alt="Sky Expo"
          width={180}
          height={70}
          className="object-contain"
          style={{
            height: "48px",
            width: "auto",
            /* Show real brand colours — no white filter */
            filter: "drop-shadow(0 0 12px rgba(76,200,232,0.25))",
          }}
          priority
        />
      </a>

      {/* Centre: Nav links */}
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

      {/* Opposite side: social + search + language + mobile menu */}
      <div className="flex items-center gap-5">
        {/* Social icons */}
        <div className="hidden lg:flex items-center gap-3">
          {SOCIAL.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/40 hover:text-white transition-colors duration-300"
              data-cursor-hover
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                dangerouslySetInnerHTML={{ __html: s.icon }}
              />
            </a>
          ))}
        </div>

        {/* Divider */}
        <span className="hidden lg:block w-px h-4 bg-white/10" />

        {/* Search */}
        <button
          className="text-white/45 hover:text-white transition-colors duration-300"
          aria-label="Search"
          data-cursor-hover
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>

        <LanguageToggle />

        {/* Mobile menu */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu" data-cursor-hover>
          <span className="block w-5 h-px bg-white/70" />
          <span className="block w-5 h-px bg-white/70" />
          <span className="block w-3 h-px bg-white/70" />
        </button>
      </div>
    </header>
  );
}

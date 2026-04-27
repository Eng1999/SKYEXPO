"use client";

import { useEffect, useRef, useState } from "react";
import { NavLink } from "./NavLink";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", labelEn: "Home", labelAr: "الرئيسية" },
  { href: "/our-story", labelEn: "Our Story", labelAr: "قصتنا" },
  { href: "/capabilities", labelEn: "Capabilities", labelAr: "قدراتنا" },
  { href: "/work", labelEn: "Work", labelAr: "أعمالنا" },
  { href: "/contact", labelEn: "Connect", labelAr: "تواصل" },
  { href: "/join", labelEn: "Join", labelAr: "انضم" },
];

export function Navbar() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-700",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      {/* Logo */}
      <a href="/" className="text-white text-lg font-light tracking-[0.3em] uppercase" data-cursor-hover>
        <span className="text-glow-accent" style={{ color: "var(--accent)" }}>SKY</span>
        <span className="text-white/80 ml-1">EXPO</span>
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            labelEn={item.labelEn}
            labelAr={item.labelAr}
            lang={lang}
          />
        ))}
      </nav>

      {/* Language toggle */}
      <LanguageToggle />
    </header>
  );
}

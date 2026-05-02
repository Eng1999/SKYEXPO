"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  labelEn: string;
  labelAr: string;
  lang: "en" | "ar";
  color: string;
}

export function NavLink({ href, labelEn, labelAr, lang, color }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const label = lang === "en" ? labelEn : labelAr;

  return (
    <Link
      href={href}
      className={cn(
        "nav-link-item relative text-xs tracking-[0.25em] uppercase pb-1 transition-colors duration-500",
        isActive ? "text-white" : "text-white/40"
      )}
      style={
        {
          "--link-color": color,
        } as React.CSSProperties
      }
      data-cursor-hover
    >
      {label}
      {/* Active/hover underline with link-specific color */}
      <span
        className="nav-underline"
        style={{
          background: color,
          transform: isActive ? "scaleX(1)" : undefined,
        }}
      />
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  labelEn: string;
  labelAr: string;
  lang: "en" | "ar";
}

export function NavLink({ href, labelEn, labelAr, lang }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative text-sm tracking-widest uppercase transition-colors duration-500 pb-1",
        isActive ? "text-white text-glow-accent" : "text-white/50 hover:text-white"
      )}
      data-cursor-hover
    >
      {lang === "en" ? labelEn : labelAr}
      <span className={cn("nav-underline", isActive && "scale-x-100")} />
    </Link>
  );
}

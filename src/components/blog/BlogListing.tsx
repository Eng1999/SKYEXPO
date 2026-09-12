"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BLOG_POSTS } from "@/data/blog-posts";

const ACCENT = "#2FA8D9";

export function BlogListing() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="bg-black min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-[42vh] md:min-h-[48vh] flex flex-col justify-end px-5 sm:px-8 lg:px-16 pb-12 md:pb-16 pt-28 md:pt-40 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(47,168,217,0.10) 0%, transparent 60%)` }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden>
          <defs>
            <pattern id="grid-blog" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-blog)" />
        </svg>

        <div className="relative z-10">
          <p
            className="text-[11px] tracking-[0.6em] uppercase font-semibold mb-5 md:mb-6"
            style={{ color: ACCENT }}
          >
            {isAr ? "مدونة سكاي إكسبو" : "SKY EXPO Blog"}
          </p>

          <h1
            className="font-bold mb-5 md:mb-7 text-white"
            style={{
              fontSize: isAr ? "clamp(2.4rem,7vw,6.5rem)" : "clamp(2.6rem,7.5vw,7rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              lineHeight: isAr ? 1.15 : 0.95,
            }}
          >
            {isAr ? "أفكار ومعرفة من عالم الفعاليات" : "Insights from the world of events"}
          </h1>

          <p
            className="text-sm md:text-base max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {isAr
              ? "مقالات ودلائل عملية حول تصميم الأجنحة، وتنظيم المعارض والمؤتمرات، وأحدث اتجاهات صناعة الفعاليات في السعودية."
              : "Articles and practical guides on booth design, exhibitions, conferences, and the latest trends in Saudi Arabia's events industry."}
          </p>
        </div>
      </div>

      {isAr ? null : (
        <div className="px-5 sm:px-8 lg:px-16">
          <p
            className="text-xs mb-8 md:mb-10 rounded-lg px-4 py-3 inline-block"
            style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            These articles are currently published in Arabic only.
          </p>
        </div>
      )}

      {/* ── Article grid ─────────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 lg:px-16 pb-20 md:pb-28 border-t border-white/[0.06] pt-12 md:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col"
              data-cursor-hover
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-5 bg-white/5">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)" }}
                />
              </div>

              <p
                className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-3"
                style={{ color: ACCENT }}
              >
                {post.category}
              </p>

              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug transition-colors duration-300 group-hover:text-white/80">
                {post.title}
              </h2>

              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: "rgba(255,255,255,0.68)" }}
              >
                {post.excerpt}
              </p>

              <div
                className="flex items-center gap-3 text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

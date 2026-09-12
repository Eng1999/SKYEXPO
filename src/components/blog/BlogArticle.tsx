"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { BlogPost, ContentBlock } from "@/data/blog-posts";

const ACCENT = "#2FA8D9";

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 md:mt-16 mb-5">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-lg md:text-xl font-semibold text-white mt-9 md:mt-11 mb-4">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          className="text-base md:text-lg leading-loose mb-5"
          style={{ color: "rgba(255,255,255,0.82)" }}
        >
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-6 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: ACCENT }}
              />
              <span
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mb-8 overflow-x-auto rounded-lg border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <table className="w-full border-collapse text-sm md:text-base min-w-[420px]">
            <thead>
              <tr style={{ background: "rgba(47,168,217,0.1)" }}>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-start px-4 py-3 font-semibold text-white border-b"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  style={{ background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.03)" }}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 border-b"
                      style={{
                        color: ci === 0 ? "#ffffff" : "rgba(255,255,255,0.75)",
                        fontWeight: ci === 0 ? 600 : 400,
                        borderColor: "rgba(255,255,255,0.06)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function BlogArticle({
  post,
  prev,
  next,
}: {
  post: BlogPost;
  prev?: BlogPost;
  next?: BlogPost;
}) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const formattedDate = new Date(post.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-black min-h-screen">
      {/* Article content is always Arabic — these posts are authored in Arabic only */}
      <article dir="rtl" className="min-h-screen">
        {/* ── Hero ── */}
        <div className="relative min-h-[46vh] md:min-h-[56vh] flex flex-col justify-end overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.92) 100%)",
            }}
          />

          <div className="relative z-10 px-5 sm:px-8 lg:px-16 pb-10 md:pb-16 pt-32 md:pt-44">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase font-semibold mb-6"
              style={{ color: ACCENT }}
              data-cursor-hover
            >
              <span>→</span>
              {isAr ? "المدونة" : "Blog"}
            </Link>

            <p
              className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-4"
              style={{ color: ACCENT }}
            >
              {post.category}
            </p>

            <h1
              className="font-bold text-white mb-4"
              style={{
                fontSize: "clamp(2rem,5.5vw,4.2rem)",
                lineHeight: 1.15,
                textShadow: "0 2px 40px rgba(0,0,0,0.7)",
              }}
            >
              {post.title}
            </h1>

            <p
              className="text-base md:text-lg max-w-2xl mb-5"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {post.subtitle}
            </p>

            <div
              className="flex items-center gap-3 text-[12px] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <time dateTime={post.date}>{formattedDate}</time>
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-5 sm:px-8 lg:px-16 py-14 md:py-20">
          <div className="max-w-[760px] mx-auto">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>

        {/* ── Prev / Next ── */}
        {(prev || next) && (
          <div className="px-5 sm:px-8 lg:px-16 pb-16 md:pb-24 border-t border-white/[0.06] pt-10 md:pt-14">
            <div className="max-w-[760px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group p-5 rounded-xl border transition-colors duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  data-cursor-hover
                >
                  <p className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: ACCENT }}>
                    التالي
                  </p>
                  <p className="text-white font-semibold leading-snug group-hover:text-white/80 transition-colors">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group p-5 rounded-xl border transition-colors duration-300 sm:text-end"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  data-cursor-hover
                >
                  <p className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: ACCENT }}>
                    السابق
                  </p>
                  <p className="text-white font-semibold leading-snug group-hover:text-white/80 transition-colors">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

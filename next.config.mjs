/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["gsap", "lenis"],
  },

  async headers() {
    return [
      /* ── Security + performance headers for all routes ── */
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      /* ── Long-lived cache for Next.js static chunks ── */
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      /* ── Images ── */
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=15552000, stale-while-revalidate=86400" },
        ],
      },
      /* ── Videos: long cache + byte-range support for seeking ── */
      {
        source: "/videos/(.*)",
        headers: [
          { key: "Cache-Control",  value: "public, max-age=31536000" },
          { key: "Accept-Ranges",  value: "bytes" },
        ],
      },
      /* ── PDF ── */
      {
        source: "/(.*)\\.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;

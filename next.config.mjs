/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // trailingSlash: true,
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["gsap"] },
};
export default nextConfig;

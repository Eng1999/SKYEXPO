/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;

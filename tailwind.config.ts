import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-base)",
        foreground: "#ffffff",
        accent: "var(--accent)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1200: "1200ms",
        1400: "1400ms",
        2000: "2000ms",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};
export default config;

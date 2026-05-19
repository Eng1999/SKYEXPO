import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { ColorProvider } from "@/context/ColorContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { HtmlDirSync } from "@/components/ui/HtmlDirSync";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroller } from "@/components/ui/SmoothScroller";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/* ── Google Fonts ── */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-en",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-ar",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Expo — Where moments become legacy",
  description: "حيث تتحول اللحظات إلى إرث | Sky Expo — Saudi-based world-class exhibitions & events.",
  keywords: "sky expo, exhibitions, events, conferences, saudi arabia, riyadh, معارض, فعاليات, مؤتمرات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${outfit.variable} ${cairo.variable} antialiased`}>
        <LanguageProvider>
          <ColorProvider>
            <HtmlDirSync />
            <SmoothScroller />
            <CustomCursor />
            <NoiseOverlay />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ColorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

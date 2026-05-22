import type { Metadata } from "next";
import { Outfit, Cairo, El_Messiri } from "next/font/google";
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

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  variable: "--font-ar-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Expo — Where moments become legacy",
  description: "حيث تتحول اللحظات إلى إرث | Sky Expo — Saudi-based world-class exhibitions & events.",
  keywords: "sky expo, exhibitions, events, conferences, saudi arabia, riyadh, معارض, فعاليات, مؤتمرات, سكاي اكسبو",
  metadataBase: new URL("https://skyexpo.com.sa"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://skyexpo.com.sa",
    siteName: "Sky Expo",
    title: "Sky Expo — Where moments become legacy",
    description: "Saudi Arabia's premier exhibitions, conferences & events company since 2009.",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Expo",
    description: "Saudi Arabia's premier exhibitions & events company.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#000000" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${outfit.variable} ${cairo.variable} ${elMessiri.variable} antialiased`}>
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

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
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-ar",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  variable: "--font-ar-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SKY EXPO",
  alternateName: "سكاي إكسبو",
  url: "https://skyexpo.com.sa",
  logo: "https://skyexpo.com.sa/images/skyexpo-logo.png",
  description:
    "Saudi Arabia's premier exhibitions, conferences & events company since 2009. Riyadh, Jeddah, Dammam.",
  foundingDate: "2009",
  areaServed: "SA",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "Riyadh",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966558193104",
    email: "info@skyexpo.com.sa",
    contactType: "customer service",
    availableLanguage: ["Arabic", "English"],
  },
  sameAs: [
    "https://www.instagram.com/skyexpo.sa/",
    "https://www.youtube.com/@Skyexpo04",
    "https://www.linkedin.com/company/sky-expo-sa/",
    "https://www.facebook.com/profile.php?id=61561641789205",
    "https://x.com/SYexpo",
    "https://www.tiktok.com/@sky.expo.event.ma",
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Sky Expo — Where moments become legacy",
    template: "%s — Sky Expo",
  },
  description:
    "حيث تتحول اللحظات إلى إرث | Sky Expo — Saudi-based world-class exhibitions & events.",
  keywords:
    "sky expo, exhibitions, events, conferences, saudi arabia, riyadh, معارض, فعاليات, مؤتمرات, سكاي اكسبو, سكاي اكسبو للفعاليات",
  metadataBase: new URL("https://skyexpo.com.sa"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://skyexpo.com.sa",
    siteName: "Sky Expo",
    title: "Sky Expo — Where moments become legacy",
    description:
      "Saudi Arabia's premier exhibitions, conferences & events company since 2009.",
    locale: "ar_SA",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Expo",
    description: "Saudi Arabia's premier exhibitions & events company.",
    site: "@SYexpo",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  other: { "theme-color": "#000000" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload hero logo (above-fold, render-critical) */}
        <link
          rel="preload"
          href="/images/skyexpo-logo.png"
          as="image"
          type="image/png"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

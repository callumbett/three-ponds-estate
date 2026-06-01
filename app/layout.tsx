import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StickyBookNow from "@/components/StickyBookNow";
import { Booking } from "@/components/booking";
import "./globals.css";

/**
 * Fraunces — editorial serif, used by every Hero standfirst and every
 * section H2 across the site.
 *
 * Tuning notes (CLS):
 *   - `axes` removed: previously requested `SOFT`, `WONK`, and `opsz`,
 *     none of which the CSS actually references via
 *     `font-variation-settings`. They were inflating the font file
 *     without any visual benefit. Trimming them shrinks the preload
 *     so it's more likely to complete before first paint on slow
 *     networks — and a font that's already loaded at paint time
 *     doesn't trigger the swap-induced reflow that drives CLS.
 *   - Explicit `fallback` chain tightens next/font's auto-computed
 *     size-adjust metrics so the Georgia/Cormorant Garamond fallback
 *     renders at proportions closer to Fraunces. Less width drift
 *     when (if) the swap does happen, so the reflow is smaller.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Cormorant Garamond", "Georgia", "serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://threepondsestate.com.au"),
  title: {
    default: "Three Ponds Estate — Boutique Architectural Sanctuary, Temora NSW",
    template: "%s · Three Ponds Estate",
  },
  description:
    "Three Scandinavian-style pods set against the open Riverina country, 500 m from the Temora Aviation Museum and three minutes from town. A quiet, considered stay shaped by Mark and Gillian.",
  openGraph: {
    title: "Three Ponds Estate",
    description:
      "Boutique architectural sanctuary in Temora, NSW. Three pods, three vantages, one quiet acreage.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
         * Dark-mode FOUC prevention. Reads the saved preference from
         * localStorage and adds the `.dark` class to <html> *before*
         * React hydrates, so visitors who prefer dark mode never see
         * a light-mode flash on page load.
         *
         * Uses a try/catch because some privacy modes throw on
         * localStorage access; the fallback is light mode (matching
         * `<body>`'s default classes).
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tpe-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-parchment text-charcoal">
        <Booking.Provider>
          <Nav />
          <main className="relative flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <StickyBookNow />
          <Booking.Modal />
        </Booking.Provider>
        <Analytics />
        <SpeedInsights />
        {/*
         * SiteMinder / TheBookingButton widget library. Loads after
         * page interactivity so it doesn't block the LCP. It scans the
         * DOM for any element with class="ibe" and replaces the
         * placeholder div with the live booking engine.
         */}
        <Script
          src="https://widget.siteminder.com/ibe.min.js"
          strategy="afterInteractive"
        />

        {/*
         * Ahrefs Web Analytics — privacy-friendly traffic + keyword
         * analytics, primarily used for SEO insight (alongside Google
         * Analytics for behavioural data). Loaded afterInteractive so
         * it doesn't compete with page render.
         */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="L4F2tSHrsqodY/YJpg8TjQ"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StickyBookNow from "@/components/StickyBookNow";
import ClickTracker from "@/components/ClickTracker";
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
  metadataBase: new URL("https://threepondsestate.com"),
  title: {
    // Shortened to ~31 chars so Google reliably displays it verbatim.
    // The previous title ("— Boutique Architectural Sanctuary…") was
    // considered promotional and was being rewritten in the SERP.
    default: "Three Ponds Estate | Temora NSW",
    template: "%s · Three Ponds Estate",
  },
  description:
    // Trimmed from 188 chars to 120 chars — under the 155-char display limit.
    "Three Scandinavian-style pods in the open Riverina country, 500 m from Temora Aviation Museum. A quiet, considered stay.",
  openGraph: {
    title: "Three Ponds Estate",
    description:
      "Boutique architectural sanctuary in Temora, NSW. Three pods, three vantages, one quiet acreage.",
    type: "website",
    locale: "en_AU",
    // Explicit image object bypasses Next.js's auto-detection of
    // app/opengraph-image.jpg, which was generating a URL with an
    // internal caching query string that Vercel's dpl= param then
    // doubled — producing "?opengraph-image.xxx?dpl=…" which fails
    // Open Graph validation. Serving the file directly as a static
    // asset avoids any query-string mutation.
    images: [
      {
        url: "https://threepondsestate.com/opengraph-image.jpg",
        width: 945,
        height: 630,
        alt: "Three Ponds Estate — boutique pod accommodation in Temora, NSW",
      },
    ],
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

        {/*
         * Google Analytics 4 — Google's official gtag.js snippet,
         * placed verbatim inside <head> per their setup instructions.
         * We initially tried @next/third-parties' GoogleAnalytics
         * component but it defers the <script> to after hydration,
         * which meant verification by Google Ads / curl / SSR-only
         * tools couldn't see the tag in the static HTML. Manual
         * install eliminates that ambiguity: the <script async> tag
         * appears in raw SSR HTML on every page. `async` keeps it
         * non-blocking for LCP / CLS.
         *
         * Property: G-8LCXR9LWH5 (threepondsestate.com — created June 2026)
         */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8LCXR9LWH5"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8LCXR9LWH5');`,
          }}
        />

        {/*
         * LodgingBusiness JSON-LD structured data.
         *
         * Tells Google explicitly that Three Ponds Estate is
         * accommodation in Temora NSW with three rentable units. This
         * unlocks rich-result eligibility in search (knowledge panel,
         * map results, structured snippets) and is the single biggest
         * on-page SEO investment for a hospitality brand.
         *
         * Schema reference: https://schema.org/LodgingBusiness
         * Tested against: https://search.google.com/test/rich-results
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": "https://threepondsestate.com/#lodging",
              name: "Three Ponds Estate",
              description:
                "Boutique architectural sanctuary in Temora, NSW. Three Scandinavian-style pods set against the open Riverina country, 500 m from the Temora Aviation Museum and three minutes from town.",
              url: "https://threepondsestate.com",
              telephone: "+61403433300",
              email: "info@threepondsestate.com",
              image: [
                "https://threepondsestate.com/images/pods/the-ophir/DSC01766.jpg",
                "https://threepondsestate.com/images/pods/the-felix/DSC01805.jpg",
                "https://threepondsestate.com/images/pods/the-uphaz/DSC01832.jpg",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "79 Airport Street",
                addressLocality: "Temora",
                addressRegion: "NSW",
                postalCode: "2666",
                addressCountry: "AU",
              },
              priceRange: "$$",
              numberOfRooms: 3,
              petsAllowed: false,
              checkinTime: "14:00",
              checkoutTime: "10:00",
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Free Wi-Fi",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Free parking",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Fire pit",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "BBQ",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Reverse-cycle climate control",
                  value: true,
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-parchment text-charcoal">
        <Nav />
        <main className="relative flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <StickyBookNow />
        <ClickTracker />
        <Analytics />
        <SpeedInsights />
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

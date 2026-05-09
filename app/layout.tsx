import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StickyBookNow from "@/components/StickyBookNow";
import { Booking } from "@/components/booking";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://threepondsestate.com.au"),
  title: {
    default: "Three Ponds Estate — Boutique Architectural Sanctuary, Temora NSW",
    template: "%s · Three Ponds Estate",
  },
  description:
    "Three Scandi-barn pods set against the open Riverina country, 500 m from the Temora Aviation Museum and three minutes from town. A quiet, considered stay shaped by Mark and Gillian.",
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
    >
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
      </body>
    </html>
  );
}

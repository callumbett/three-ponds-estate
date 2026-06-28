import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LodgifySearchBar from "@/components/LodgifySearchBar";
import StatsStrip from "@/components/StatsStrip";
import PodSection from "@/components/PodSection";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";

// Explicit per-page metadata so Google sees a unique og:url and og:title
// for the homepage rather than inheriting the root-layout defaults.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://threepondsestate.com/",
    title: "Three Ponds Estate | Temora NSW",
    description:
      "Three Scandinavian-style pods in the open Riverina country, 500 m from Temora Aviation Museum. A quiet, considered stay.",
  },
};

/**
 * Homepage section order (top → bottom):
 *
 *   Hero        — editorial masthead
 *   StatsStrip  — 3 / 1.8 km / 500 m / 3 mins
 *   PodSection  — three archways, the three pods
 *   Reviews     — Google / Airbnb / Booking.com aggregator
 *   CTA         — "The country is wide. Settle into your place within it." closing
 *
 * `components/Story.tsx` and `components/Amenities.tsx` are no longer
 * used on the homepage but are left in the codebase in case we want
 * to bring them back. Their data + photos are intact.
 */
export default function Home() {
  return (
    <>
      <Hero />
      {/* Lodgify Search Box — first interaction after the masthead photo.
          Sits as its own band directly below the hero; can be shifted to
          overlap the hero base later if we want it floating over the photo. */}
      <section className="bg-parchment px-6 pt-14 pb-4 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">Check availability</p>
          <LodgifySearchBar className="w-full" />
        </div>
      </section>
      <StatsStrip />
      <PodSection />
      <Reviews />
      <CTA />
    </>
  );
}

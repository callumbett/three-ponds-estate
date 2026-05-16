import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import PodSection from "@/components/PodSection";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";

/**
 * Homepage section order (top → bottom):
 *
 *   Hero        — editorial masthead
 *   StatsStrip  — 3 / 1.8 km / 500 m / 3 mins
 *   PodSection  — three archways, the three pods
 *   Reviews     — Google / Airbnb / Booking.com aggregator
 *   CTA         — "The country is wide. Pick a pod." closing
 *
 * `components/Story.tsx` and `components/Amenities.tsx` are no longer
 * used on the homepage but are left in the codebase in case we want
 * to bring them back. Their data + photos are intact.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <PodSection />
      <Reviews />
      <CTA />
    </>
  );
}

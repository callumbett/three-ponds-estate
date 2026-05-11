import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Story from "@/components/Story";
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
 *   Story       — owner story, circle imagery
 *   CTA         — "The country is wide. Pick a pod." closing
 *
 * `components/Amenities.tsx` is no longer used on the homepage but is
 * left in the codebase in case we want to bring it back. The slideshow
 * data + photos are intact.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <PodSection />
      <Reviews />
      <Story />
      <CTA />
    </>
  );
}

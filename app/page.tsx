import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Story from "@/components/Story";
import PodSection from "@/components/PodSection";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";

/**
 * Homepage section order (top → bottom):
 *
 *   Hero        — editorial masthead
 *   StatsStrip  — 3 / 1.8 km / 500 m / 3 mins
 *   PodSection  — three archways, the three pods
 *   Amenities   — auto-cycling slideshow
 *   Reviews     — Google / Airbnb / Booking.com aggregator
 *   Story       — owner story, circle imagery
 *   CTA         — "The country is wide. Pick a pod." closing
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <PodSection />
      <Amenities />
      <Reviews />
      <Story />
      <CTA />
    </>
  );
}

import Hero from "@/components/Hero";
import AvailabilitySearch from "@/components/AvailabilitySearch";
import StatsStrip from "@/components/StatsStrip";
import Story from "@/components/Story";
import PodSection from "@/components/PodSection";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";

/**
 * Homepage section order (top → bottom):
 *
 *   Hero                — editorial masthead
 *   AvailabilitySection — date-driven booking shortcut, slim band
 *   StatsStrip          — 3 / 1.8 km / 500 m / 3 mins
 *   PodSection          — three archways, the three pods
 *   Amenities           — auto-cycling slideshow
 *   Reviews             — Google / Airbnb / Booking.com aggregator
 *   Story               — owner story, circle imagery (moved here from
 *                         after PodSection so the booking-relevant
 *                         sections sit closer to the Hero)
 *   CTA                 — "The country is wide. Pick a pod." closing
 */
export default function Home() {
  return (
    <>
      <Hero />

      {/* Slim availability band — sits directly under the Hero so the
          first booking action a visitor sees is "pick your dates". */}
      <section className="border-y border-line bg-parchment py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <AvailabilitySearch />
        </div>
      </section>

      <StatsStrip />
      <PodSection />
      <Amenities />
      <Reviews />
      <Story />
      <CTA />
    </>
  );
}

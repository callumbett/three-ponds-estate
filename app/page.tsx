import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Story from "@/components/Story";
import PodSection from "@/components/PodSection";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <PodSection />
      <Story />
      <Amenities />
      <Reviews />
      <CTA />
    </>
  );
}

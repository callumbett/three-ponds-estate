import type { Metadata } from "next";
import LodgifySearchBar from "@/components/LodgifySearchBar";
import MotionReveal from "@/components/MotionReveal";

export const metadata: Metadata = {
  title: "Book your stay",
  description:
    "Choose your dates and book directly. Live availability for all three pods at Three Ponds Estate, Temora NSW.",
  alternates: { canonical: "/book" },
  openGraph: {
    url: "https://threepondsestate.com/book",
    title: "Book your stay · Three Ponds Estate",
    description:
      "Choose your dates and book directly. Live availability for all three pods at Three Ponds Estate, Temora NSW.",
  },
};

export default function BookPage() {
  return (
    <>
      {/* Page masthead — editorial language to match Hero / Explore / Contact */}
      <section className="bg-parchment pt-48 pb-12 sm:pt-60 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <p className="metadata">Reservations</p>
            <span
              aria-hidden
              className="mt-5 mb-6 block h-px w-12 bg-corten"
            />
            <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-6xl">
              Choose your dates.
            </h1>
            <p className="mt-6 max-w-xl font-serif italic text-lg leading-snug text-charcoal-soft sm:text-xl">
              Live availability for all three pods. Direct rates from
              AU$230 / night. No check-out on Saturdays.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Lodgify Search Box — pick dates / guests, then continue into the
          seamless booking flow on the booking subdomain. */}
      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-10">
          <MotionReveal>
            <LodgifySearchBar className="w-full" />
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import { Booking } from "./booking";
import MotionReveal from "./MotionReveal";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-parchment py-24 sm:py-32">
      {/* Soft accent: image floats in from right */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src="/images/cta/DSC01776.jpg"
          alt="The open Riverina countryside viewed from Three Ponds Estate, Temora NSW"
          fill
          sizes="50vw"
          quality={85}
          className="object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <MotionReveal className="max-w-2xl">
          <p className="eyebrow">Book direct</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
            The country is wide.<br />
            Settle into your place within it.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-soft">
            Direct rates from AU$230 a night. No check-out on Saturdays.
            Same-day enquiries answered, usually within the hour.
          </p>
          <div className="mt-10">
            <Booking.PrimaryTrigger label="Book Now" />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

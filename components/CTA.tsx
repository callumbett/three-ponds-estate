import Image from "next/image";
import BookNow from "./BookNow";
import MotionReveal from "./MotionReveal";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-parchment py-24 sm:py-32">
      {/* Soft accent: image floats in from right */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=85"
          alt=""
          fill
          sizes="50vw"
          quality={85}
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <MotionReveal className="max-w-2xl">
          <p className="eyebrow">Book direct</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
            The country is wide.<br />
            Pick a pod.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-soft">
            Direct rates from AU$234 a night. Two-night minimum on weekends.
            Same-day enquiries answered, usually within the hour.
          </p>
          <div className="mt-10">
            <BookNow variant="solid" label="Book your stay" />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

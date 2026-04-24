import Image from "next/image";
import Link from "next/link";
import MotionReveal from "./MotionReveal";
import SectionEyebrow from "./SectionEyebrow";

export default function Story() {
  return (
    <section className="bg-parchment-deep py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 md:grid-cols-12 md:gap-12">
        <MotionReveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2000&q=85"
              alt="A fire pit at dusk, with open paddock beyond"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </MotionReveal>

        <MotionReveal delay={0.15} className="md:col-span-6 md:col-start-7 md:self-center">
          <SectionEyebrow>Our Story</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            A quiet act of stewardship,<br className="hidden sm:block" />
            shaped over years of hosting.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
            Mark and Gillian had hosted friends and family on this land for years
            before the spring of 2020 made the next step obvious. The three pods
            that followed were built with one quiet ambition — to leave the
            country exactly as they found it, and to give guests room for the
            same.
          </p>
          <Link
            href="/story"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-corten hover:gap-3 transition-all"
          >
            Read the full story
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Three Ponds Estate began with a quiet act of stewardship. Mark and Gillian built three pods on the open Riverina country they had long hosted on.",
};

export default function StoryPage() {
  return (
    <>
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
          <MotionReveal>
            <SectionEyebrow className="justify-center">Our Story</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
              Built quietly,<br />on land we already loved.
            </h1>
          </MotionReveal>
        </div>
      </section>

      {/* Editorial image */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
              <Image
                src="/images/story/Bett77.jpg"
                alt="Three Ponds Estate at the close of day"
                fill
                sizes="100vw"
                quality={85}
                className="object-cover"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Long-form story */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <p className="eyebrow">Mark &amp; Gillian</p>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-charcoal sm:text-xl">
              <p>
                For years, Mark and Gillian shared this land with friends and
                family — the kind of unhurried hosting that doesn&apos;t need a
                brochure. The three ponds at the back of the property gave the
                place its name long before there was anything to book.
              </p>
              <p>
                In the spring of 2020, Gillian decided it was time. The decision
                was less about building a business and more about giving more
                people the slow morning, the long horizon, the country at
                closing time.
              </p>
              <p>
                The three pods that followed share an architectural language —
                pale timber, soft linen, restrained line — but each is sited
                for its own moment. The Ophir faces east for sunrise; the Uphaz
                opens west for the evening; the Felix sits between them, the
                quiet middle of the day.
              </p>
              <p>
                The brief was simple: leave the country exactly as you found it,
                and build for guests who want the same.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Two-column: materials & sustainability */}
      <section className="bg-parchment-deep py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 md:grid-cols-2">
          <MotionReveal>
            <SectionEyebrow>Materials</SectionEyebrow>
            <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              Pale timber, matte stone, soft linen.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
              The interior palette stays close to the land outside. We chose
              materials that age slowly, repair easily, and feel right under bare
              feet at six in the morning.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <SectionEyebrow>The land</SectionEyebrow>
            <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              Three ponds, an open paddock, a long sky.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
              The pods are sited to keep the land uninterrupted: each is small,
              detached, and quietly placed. Walk from your deck to a pond, to
              the fire pit, or out to the cycling track that fronts the road.
            </p>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

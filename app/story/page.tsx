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

      {/* Editorial image — circle treatment matching the homepage Story block */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-full sm:max-w-2xl">
              <Image
                src="/images/story/Bett77.jpg"
                alt="Three Ponds Estate at the close of day"
                fill
                sizes="(min-width: 768px) 600px, 100vw"
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
            <div className="prose-body mt-8">
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
                pale timber, soft linen, restrained line. Each opens east to
                hold the sunrise; The Felix and Uphaz add a second, north-facing
                deck so the long late-afternoon light closes the day too.
              </p>
              <p>
                The brief was simple: leave the country exactly as you found it,
                and build for guests who want the same.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

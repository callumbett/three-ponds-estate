import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { pods } from "@/lib/pods";

export const metadata: Metadata = {
  title: "Stay — The Pods",
  description:
    "Three pods at Three Ponds Estate: The Ophir, The Felix, and The Uphaz. Boutique architectural sanctuary in Temora, NSW.",
};

export default function StayPage() {
  return (
    <>
      {/* Page intro */}
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal className="max-w-3xl">
            <SectionEyebrow>The Pods</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
              Three considered rooms,<br />
              one quiet acreage.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-soft">
              Each pod is detached, with its own deck and private parking.
              They share a fire pit, a BBQ, and the same wide horizon. Pick the
              one that matches the time of day you want to keep.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Pod list — alternating editorial layout */}
      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-7xl space-y-32 px-6 sm:px-10">
          {pods.map((pod, i) => {
            const reverse = i % 2 === 1;
            return (
              <MotionReveal key={pod.slug}>
                <article className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
                  <div
                    className={[
                      "md:col-span-7",
                      reverse ? "md:order-2" : "",
                    ].join(" ")}
                  >
                    <Link href={`/stay/${pod.slug}`} className="group block">
                      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-parchment-deep">
                        <Image
                          src={pod.cover.src}
                          alt={pod.cover.alt}
                          fill
                          sizes="(min-width: 768px) 60vw, 100vw"
                          quality={85}
                          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className={["md:col-span-5", reverse ? "md:order-1" : ""].join(" ")}>
                    <p className="eyebrow">{pod.styleNote}</p>
                    <h2 className="mt-4 font-serif text-4xl">{pod.name}</h2>
                    <p className="mt-2 text-sm text-charcoal-soft">{pod.tagline}</p>
                    <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
                      {pod.detail}
                    </p>
                    <div className="mt-8 flex items-center gap-6">
                      <Link
                        href={`/stay/${pod.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-corten hover:gap-3 transition-all"
                      >
                        See {pod.name}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                      <span className="text-xs uppercase tracking-[0.18em] text-charcoal-soft">
                        From AU${pod.fromAud}
                      </span>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

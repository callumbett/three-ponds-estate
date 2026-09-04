import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Three Ponds Estate began with a quiet act of stewardship. Mark and Gillian built three pods on the open Riverina country they had long hosted on.",
  alternates: { canonical: "/story" },
  openGraph: buildOpenGraph({
    path: "/story",
    title: "Our Story · Three Ponds Estate",
    description:
      "Three Ponds Estate began with a quiet act of stewardship. Mark and Gillian built three pods on the open Riverina country they had long hosted on.",
  }),
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

      {/* Editorial image — circle treatment matching the homepage Story block.
          Sized at roughly 60% of the previous footprint (max-w-xl → 350 px,
          max-w-2xl → 400 px) per a May 2026 design adjustment that wanted
          the image to read as a more restrained visual moment in the page. */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <div className="relative mx-auto aspect-square w-full max-w-[350px] overflow-hidden rounded-full sm:max-w-[400px]">
              <Image
                src="/images/story/Bett77.jpg"
                alt="Three Ponds Estate at the close of day"
                fill
                sizes="(min-width: 600px) 400px, 350px"
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
                The story of Three Ponds Estate began with a shared love for
                the land.
              </p>
              <p>
                For Gil and Mark, growing up in the country wasn&apos;t just a
                childhood memory — it was a way of life they were determined to
                pass on. In 1993, that dream took root when they purchased
                their 4.4-hectare property on Airport Street with its little
                run-down miner&apos;s cottage, which quickly became a cosy home
                and a place to welcome family and friends.
              </p>
              <p>
                Drawn to its sweeping rural vistas and the rare balance of
                wide open spaces within reach of town, they transformed the
                acreage into a family haven, filled with horses, children, and
                the quiet rhythms of nature.
              </p>
              <p>
                For decades, Gil harboured a quiet ambition. Known for her love
                of hosting, she envisioned extending the warmth she shared with
                friends and family to travellers in search of a short-term
                sanctuary.
              </p>
              <p>
                She didn&apos;t just want to build accommodation; she wanted to
                create a feeling — a place where the pace of life slows down
                the moment you drive through the gates. After years of
                dreaming, that vision gained traction in the spring of 2020,
                when it became apparent it was the right timing.
              </p>
              <p>
                Today, Three Ponds Estate is a destination of refined
                simplicity. Offering three Scandinavian-inspired barn-style
                pods:
              </p>
              <ul className="mt-5 list-disc space-y-1 pl-6 marker:text-corten/70">
                <li>The Ophir</li>
                <li>The Felix</li>
                <li>The Uphaz</li>
              </ul>
              <p>
                Thoughtfully designed to blend contemporary luxury with the
                softly undulating rural landscape, each pod offers a private
                haven for couples, families, and business guests alike.
              </p>
              <p>
                The pods sit lightly on the country they love, their simple
                forms grounded in natural materials and open space, where
                changing light, wide skies, and the rhythm of the land define
                the experience.
              </p>
              <p>
                A stunning blend of tiny-home simplicity and subtle desert
                luxe, echoed throughout the landscaping.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

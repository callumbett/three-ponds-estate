"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { type LightboxImage } from "./Lightbox";
import MotionReveal from "./MotionReveal";

type Props = {
  images: LightboxImage[];
};

/**
 * Editorial "bento" gallery for a pod detail page.
 *
 *   1st image — full-width feature (16:9), the establishing frame.
 *   2nd & 3rd — side-by-side 50/50 (4:3 each), a contact-sheet pair.
 *   Remainder — repeating 2-col grid (4:3), as before.
 *
 * Every image opens a full-screen <Lightbox /> at its index.
 *
 * The aspect ratios are intentional: a magazine spread varies its image
 * sizes; a uniform grid feels like a product page.
 */
export default function PodGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const feature = images[0];
  const pair = images.slice(1, 3);
  const rest = images.slice(3);

  return (
    <>
      <div className="mt-12 space-y-6 md:mt-16 md:space-y-8">
        {/* 1 · Full-width feature */}
        {feature ? (
          <MotionReveal>
            <Tile
              image={feature}
              index={0}
              aspectClass="aspect-[16/9]"
              onOpen={setActiveIndex}
            />
          </MotionReveal>
        ) : null}

        {/* 2 & 3 · Side-by-side pair */}
        {pair.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {pair.map((img, i) => (
              <MotionReveal key={img.src} delay={i * 0.08}>
                <Tile
                  image={img}
                  index={1 + i}
                  aspectClass="aspect-[4/3]"
                  onOpen={setActiveIndex}
                />
              </MotionReveal>
            ))}
          </div>
        ) : null}

        {/* Remainder · 2-col repeating grid */}
        {rest.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {rest.map((img, i) => (
              <MotionReveal key={img.src} delay={i * 0.08}>
                <Tile
                  image={img}
                  index={3 + i}
                  aspectClass="aspect-[4/3]"
                  onOpen={setActiveIndex}
                />
              </MotionReveal>
            ))}
          </div>
        ) : null}
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(-1)}
        onChange={setActiveIndex}
      />
    </>
  );
}

/**
 * Single thumbnail tile — opens lightbox on click, hover scales the image
 * gently and fades in a small "expand" glyph bottom-right. Same hover /
 * scale treatment as the homepage pod cards so the visual language is
 * consistent.
 */
function Tile({
  image,
  index,
  aspectClass,
  onOpen,
}: {
  image: LightboxImage;
  index: number;
  aspectClass: string;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${image.alt} in lightbox`}
      className={[
        "group relative block w-full overflow-hidden rounded-sm bg-parchment",
        aspectClass,
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4",
      ].join(" ")}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={85}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <span
        aria-hidden
        className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-parchment/85 text-charcoal opacity-0 backdrop-blur transition-opacity duration-200 ease-out group-hover:opacity-100"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

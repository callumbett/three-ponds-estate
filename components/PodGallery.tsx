"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { type LightboxImage } from "./Lightbox";
import MotionReveal from "./MotionReveal";

type Props = {
  images: LightboxImage[];
};

/**
 * Click-to-open photo gallery for a pod detail page.
 *
 * The thumbnails sit in the same 2-col grid as before, but each one
 * is now a button that opens a full-screen <Lightbox /> at that
 * image's index. Hover lifts the image gently (transform + opacity)
 * to signal interactivity.
 *
 * Per composition-patterns: state is owned here, the Lightbox is a
 * controlled component receiving `index` + callbacks.
 */
export default function PodGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <>
      <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        {images.map((img, i) => (
          <MotionReveal key={img.src} delay={i * 0.08}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open ${img.alt} in lightbox`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-parchment focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={85}
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              {/*
               * Subtle hint that the image is clickable — a small
               * "expand" glyph that fades in on hover. Bottom-right.
               */}
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
          </MotionReveal>
        ))}
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

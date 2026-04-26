"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export type Slide = {
  title: string;
  body: string;
  image: { src: string; alt: string };
};

type Props = {
  slides: Slide[];
  /**
   * Time on each slide before auto-advancing. Default 5.5s feels like a
   * comfortable editorial pace — long enough to read the caption,
   * short enough to keep moving.
   */
  intervalMs?: number;
};

/**
 * Featured amenities slideshow. Shows one large image at a time with
 * the title + body caption below it; auto-advances through every slide,
 * loops back to the start, and pauses while the visitor's pointer is
 * over the slideshow.
 *
 * Animation (Bencium MOTION-SPEC):
 *   - Image crossfades (no `mode="wait"`) — incoming and outgoing
 *     overlap for ~0.9s.
 *   - Text fades up with `mode="wait"` so two captions are never
 *     visible at once.
 *   - Both honour `useReducedMotion()` — duration drops to 0.
 *
 * Accessibility:
 *   - Dots below have `aria-label`s and `aria-current="true"` on the
 *     active slide; both are clickable for manual navigation.
 */
export default function AmenitiesSlideshow({
  slides,
  intervalMs = 5500,
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (isPaused || reduceMotion || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs, isPaused, reduceMotion]);

  if (slides.length === 0) return null;
  const current = slides[index];

  const imgDuration = reduceMotion ? 0 : 0.9;
  const textDuration = reduceMotion ? 0 : 0.45;

  return (
    <div
      className="relative mx-auto max-w-5xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image stage */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-parchment-deep">
        <AnimatePresence>
          <motion.div
            key={`img-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: imgDuration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.image.src}
              alt={current.image.alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              quality={85}
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div className="mx-auto mt-8 min-h-[140px] max-w-2xl text-center sm:min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: textDuration, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">
              {current.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots / progress indicator */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={active ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={[
                "h-1.5 rounded-full transition-all duration-300 ease-out",
                "focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4",
                active
                  ? "w-8 bg-charcoal"
                  : "w-1.5 bg-charcoal/25 hover:bg-charcoal/60",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

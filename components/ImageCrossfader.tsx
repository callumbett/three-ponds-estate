"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";

export type CrossfadeImage = { src: string; alt: string };

type Props = {
  images: CrossfadeImage[];
  /**
   * Time spent on each image before crossfading to the next. Default
   * 4000ms — slow enough to read each frame, fast enough to feel alive.
   */
  intervalMs?: number;
  /**
   * Delay before this crossfader starts cycling (ms). Useful for
   * staggering several crossfaders so they don't all switch at once.
   */
  startDelayMs?: number;
  /**
   * Crossfade duration (ms). Default 700ms.
   */
  fadeDurationMs?: number;
  /**
   * If true, render small white prev / next chevron buttons on the
   * left and right edges so visitors can step through manually. Auto-
   * advance still runs in the background and resets each time the user
   * clicks a chevron.
   */
  showControls?: boolean;
  /**
   * Forwarded to next/image — preload-priority for above-the-fold use.
   */
  priority?: boolean;
  /**
   * Forwarded to next/image — responsive `sizes` hint.
   */
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Auto-cycling image crossfader. Renders one image at a time and
 * crossfades to the next on a steady interval. Designed for fixed-shape
 * containers (pod archways, story circle, etc.) where a sliding
 * carousel would break the shape.
 *
 * Behaviour:
 *   - Pauses while the visitor hovers the crossfader.
 *   - Honours `useReducedMotion()` — falls back to showing only the
 *     first image (no auto-advance, no fade).
 *   - Returns null gracefully if `images` is empty.
 *   - Optional prev/next chevron controls (`showControls`) for manual
 *     navigation; clicking one resets the auto-advance timer.
 */
export default function ImageCrossfader({
  images,
  intervalMs = 4000,
  startDelayMs = 0,
  fadeDurationMs = 700,
  showControls = false,
  priority = false,
  sizes,
  className = "",
  imageClassName = "object-cover",
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // `tick` lets manual navigation reset the auto-advance interval.
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion || isPaused || images.length <= 1) return;

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, intervalMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [images.length, intervalMs, startDelayMs, isPaused, reduceMotion, tick]);

  if (images.length === 0) return null;
  const fadeSeconds = (reduceMotion ? 0 : fadeDurationMs) / 1000;
  const hasMultiple = images.length > 1;

  /**
   * The crossfader usually lives inside a wrapping <Link>; clicking a
   * chevron should *not* navigate. Stop the click reaching the link.
   */
  const stepBy = (delta: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + delta + images.length) % images.length);
    setTick((t) => t + 1);
  };

  return (
    <div
      className={["relative h-full w-full", className].join(" ")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={`xf-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeSeconds, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            sizes={sizes}
            quality={85}
            priority={priority && index === 0}
            className={imageClassName}
          />
        </motion.div>
      </AnimatePresence>

      {showControls && hasMultiple && (
        <>
          <CrossfaderArrow
            direction="prev"
            onClick={stepBy(-1)}
            label="Previous image"
          />
          <CrossfaderArrow
            direction="next"
            onClick={stepBy(1)}
            label="Next image"
          />
        </>
      )}
    </div>
  );
}

/**
 * Small white chevron — translucent at rest, fully opaque on hover/focus.
 * A subtle drop-shadow keeps the stroke legible on bright photo regions.
 */
function CrossfaderArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={[
        "absolute top-1/2 z-10 -translate-y-1/2",
        isPrev ? "left-3" : "right-3",
        "text-parchment opacity-70 transition-opacity duration-200 ease-out",
        "hover:opacity-100 focus-visible:opacity-100",
        "[filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.55))]",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-parchment focus-visible:outline-offset-4 focus-visible:rounded-full",
      ].join(" ")}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        {isPrev ? (
          <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

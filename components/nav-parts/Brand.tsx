"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useNav } from "./context";

/**
 * Brand mark — logo only (the wordmark is now part of the logo image
 * itself, dramatically scaled so the embedded text reads at a glance).
 *
 * The asset cross-fades between the white version (over hero
 * photography) and the black version (once the parchment header
 * backdrop has faded in) — opacity-only animation, GPU-accelerated.
 */
export default function NavBrand() {
  const {
    state: { scrolled, onParchment },
    meta: { reduceMotion },
  } = useNav();

  // Color: read the unified onParchment flag — true on every parchment
  // page and once scrolled / menu open on hero pages.
  // Size: still driven by `scrolled` so that on hero pages the logo
  // starts large and collapses on scroll. On parchment pages it
  // starts large too, then collapses when the user scrolls.
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <Link
        href="/"
        aria-label="Three Ponds Estate — home"
        className="group block rounded-sm transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4"
      >
        {/*
         * Logo cross-fades the white/black assets AND collapses to the
         * height of the Book Now pill (~40px) once the page has
         * scrolled — keeps the masthead from dominating the viewport
         * during long reads.
         *
         * Width/height transitions aren't GPU-accelerated but this is
         * a one-shot change driven by scroll-state, not a continuous
         * animation. Per Bencium MOTION-SPEC §"Standard" duration: 300ms
         * with the project's signature cubic-bezier curve.
         */}
        <span
          className={[
            "relative inline-block transition-[width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled ? "h-10 w-10" : "h-32 w-32 sm:h-40 sm:w-40",
          ].join(" ")}
        >
          <Image
            src="/images/logo/beige-logo.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="(min-width: 640px) 160px, 128px"
            className={[
              "absolute inset-0 object-contain transition-opacity duration-300 ease-out",
              onParchment ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <Image
            src="/images/logo/black-logo.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="(min-width: 640px) 160px, 128px"
            className={[
              "absolute inset-0 object-contain transition-opacity duration-300 ease-out",
              onParchment ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </span>
      </Link>
    </motion.div>
  );
}

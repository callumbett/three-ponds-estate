"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Booking } from "./booking";

/**
 * Editorial masthead Hero.
 *
 * Layout (top → bottom):
 *   1. Kicker — location metadata, tracked-out Inter caps.
 *   2. Hairline rule — scales in from the left, magazine-cover device.
 *   3. Headline — Fraunces, fluid clamp() size, tight leading.
 *   4. Italic standfirst — Fraunces italic at a wider measure (~42ch).
 *   5. Dateline — the closing metadata tag.
 *   6. Action row — primary booking pill + secondary "Meet the pods" link.
 *
 * The five text elements stagger in over ~1.5s to feel like a print
 * cover settling into place. Hairline rule animates `scaleX` from a
 * `transform-origin: left` so the line *draws* rather than fades.
 *
 * Parallax on the photograph and gradient floor are unchanged — they
 * work, no need to touch them.
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than the page; copy fades & lifts slightly.
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 220]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal"
    >
      {/* Background image, parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY, scale: imgScale }}
      >
        <Image
          src="/images/hero/hero-2-reduced.jpg"
          alt="Three Ponds Estate"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        {/* Gradient floor for legibility — heavier toward the bottom where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/15 to-charcoal/85" />
        {/* Soft radial vignette under the copy block to ground light text on bright photo regions */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.45),transparent_65%)]" />
      </motion.div>

      {/* Hero copy */}
      <motion.div
        // Top safety padding (`pt-44 sm:pt-52`) ensures the copy block
        // never extends above the masthead even on short viewports —
        // the kicker can't get crammed against the logo any more.
        // Bottom padding tightened on mobile for room.
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pt-44 pb-20 sm:px-10 sm:pt-52 sm:pb-32"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <motion.div
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "visible"}
          className="max-w-3xl"
        >
          {/*
           * Visually-hidden H1 — kicker and headline are removed from
           * the visible Hero per the new direction (let the photo do
           * the heavy lifting), but we keep an H1 for SEO and screen
           * readers. Pulls double duty as the canonical page title
           * for the homepage.
           */}
          <h1 className="sr-only">
            Three Ponds Estate — boutique accommodation in Temora, NSW
          </h1>

          {/* Italic standfirst — now the visible primary copy */}
          <motion.p
            variants={lineVariants}
            className="max-w-[42ch] font-serif italic text-lg leading-[1.55] text-parchment/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:text-2xl"
          >
            Three Ponds Estate is a boutique architectural sanctuary set
            against the open country of the New South Wales Riverina —
            restraint, soft light, and the long horizon at the door.
          </motion.p>

          {/* 5 · Dateline — closing metadata */}
          <motion.p
            variants={lineVariants}
            className="metadata mt-7 text-parchment/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          >
            Open year-round · Three pods · Family-run
          </motion.p>

          {/* 6 · Action row */}
          <motion.div
            variants={lineVariants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Booking.NavTrigger />
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-parchment [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] hover:text-corten"
            >
              Meet the pods
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-parchment/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="metadata text-parchment/80">Scroll</span>
          <span className="block h-8 w-px bg-parchment/50" />
        </div>
      </motion.div>
    </section>
  );
}

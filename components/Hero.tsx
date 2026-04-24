"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BookNow from "./BookNow";

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
          src="/images/hero/Hero.jpg"
          alt="Wide Riverina country at first light, low golden sun across paddock"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        {/* Gradient floor for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/70" />
      </motion.div>

      {/* Hero copy */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 sm:px-10 sm:pb-32"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow text-parchment/80">Temora · Riverina · NSW</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-parchment sm:text-7xl md:text-[5.5rem]">
            A quiet acreage,<br />
            three considered pods.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment/85 sm:text-lg">
            Three Ponds Estate is a boutique architectural sanctuary set against the
            open country of the New South Wales Riverina — restraint, soft light,
            and the long horizon at the door.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookNow variant="solid" label="Book your stay" />
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-parchment hover:text-corten"
            >
              Meet the pods
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-parchment/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-parchment/70">Scroll</span>
          <span className="block h-8 w-px bg-parchment/40" />
        </div>
      </motion.div>
    </section>
  );
}

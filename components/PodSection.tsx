"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { pods } from "@/lib/pods";
import ImageCrossfader from "./ImageCrossfader";
import SectionEyebrow from "./SectionEyebrow";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PodSection() {
  const reduce = useReducedMotion();

  return (
    <section id="pods" className="bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow>The Three Pods</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            Three vantages on the same wide horizon.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-soft">
            Each pod sits alone with its own deck and private parking, sharing
            only the fire pit and the long view. Pick the room that suits the
            time of day you want to keep.
          </p>
        </div>

        <motion.div
          className="mt-16 grid gap-10 md:grid-cols-3"
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
        >
          {pods.map((pod, idx) => {
            // Cycle the cover + every gallery shot for each card. Stagger
            // the start delays so the three cards don't all switch at once
            // — gives the row a more relaxed, breathing rhythm.
            const slideshowImages = [pod.cover, ...pod.gallery];
            const startDelayMs = idx * 1300;

            return (
              <motion.article
                key={pod.slug}
                variants={reduce ? undefined : cardVariants}
                className="group flex flex-col"
              >
                <Link href={`/stay/${pod.slug}`} className="block">
                  {/*
                   * Archway shape — top corners use a 50% radius so they
                   * curve to meet at the apex (Romanesque arch); the
                   * bottom is flat. Crossfading images live inside.
                   */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-none bg-parchment-deep">
                    <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                      <ImageCrossfader
                        images={slideshowImages}
                        intervalMs={4500}
                        startDelayMs={startDelayMs}
                        fadeDurationMs={800}
                        priority={idx === 0}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        showControls
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl text-charcoal">
                      {pod.name}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-charcoal-soft">
                      From AU${pod.fromAud}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-charcoal-soft">{pod.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-soft/90">
                    {pod.intro}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-corten transition-all group-hover:gap-3">
                    Discover {pod.name.replace("The ", "")}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

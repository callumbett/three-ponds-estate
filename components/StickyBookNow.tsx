"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Booking } from "./booking";

/**
 * Sticky mobile-only Book Now pill.
 *
 * Appears once the user has scrolled past ~80vh (i.e. past the Hero
 * on the homepage, or roughly the cover on a pod detail page) and
 * sits bottom-right on top of the page content. Hidden on `md+`
 * because the masthead Book Now is always visible at desktop widths.
 *
 * The actual button reuses `Booking.NavTrigger` so visual treatment
 * stays identical to the masthead pill — no second variant to
 * maintain.
 *
 * Performance / motion:
 *   - Animates `opacity` + `transform` only (GPU-friendly, per
 *     Bencium MOTION-SPEC §"Performance Rules").
 *   - Honours `useReducedMotion()`.
 */
export default function StickyBookNow() {
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const onScroll = () => {
      // 80% of viewport height — past the hero, mid-content
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide the pill when the footer comes into view — the footer contains
  // the dark-mode toggle bottom-right on mobile, and a fixed pill in
  // the same corner makes that toggle unreachable. The IntersectionObserver
  // watches for the footer entering the viewport (any portion). When it
  // does, the pill fades out the same way it does when the modal opens.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "0px" },
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const shown = visible && !footerInView;

  return (
    <motion.div
      aria-hidden={!shown}
      // `inert` removes the hidden pill's Link from the tab order —
      // without it, keyboard users hit an invisible focus stop
      // (aria-hidden content must not contain focusable elements).
      inert={!shown}
      className="pointer-events-none fixed bottom-4 right-4 z-40 md:hidden"
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        y: shown ? 0 : 24,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={shown ? "pointer-events-auto" : ""}>
        {/*
         * Same NavTrigger as the masthead, with a stronger shadow so the
         * pill lifts visibly off parchment page content (the masthead has
         * its own blur backdrop providing elevation; the sticky doesn't).
         */}
        <Booking.NavTrigger className="shadow-xl shadow-charcoal/35 ring-charcoal/10" />
      </div>
    </motion.div>
  );
}

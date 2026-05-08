"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Booking, useBooking } from "./booking";

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
 *   - Hidden entirely while the booking modal is open (otherwise the
 *     pill sits on top of the dialog backdrop, which looks broken).
 *   - Honours `useReducedMotion()`.
 */
export default function StickyBookNow() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  // Read modal open state so we can hide ourselves while it's open.
  const {
    state: { open: modalOpen },
  } = useBooking();

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

  const shown = visible && !modalOpen;

  return (
    <motion.div
      aria-hidden={!shown}
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
        <Booking.NavTrigger />
      </div>
    </motion.div>
  );
}

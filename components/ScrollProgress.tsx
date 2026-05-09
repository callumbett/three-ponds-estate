"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin corten progress bar pinned to the top of the viewport. Reflects
 * how far the visitor has scrolled through the current page.
 *
 * Adapted from a 21st.dev pattern but stripped of shadcn / `cn`
 * dependencies and the container-ref complexity (we're tracking the
 * window, not a sub-scrollable region). Recoloured to the brand
 * accent so the bar reads as an editorial detail rather than a
 * generic web widget.
 *
 * Animation:
 *   - `useScroll` returns the raw 0→1 scroll progress.
 *   - `useSpring` smooths it so the bar glides instead of jumping.
 *   - Animates `transform: scaleX()` only (GPU-accelerated, per
 *     Bencium MOTION-SPEC §"Performance Rules").
 *
 * Z-index sits above the masthead (z-50) so the bar is always
 * visible.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    bounce: 0,
  });

  return (
    <motion.div
      aria-hidden
      data-slot="scroll-progress"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[51] h-[2px] origin-left bg-corten"
    />
  );
}

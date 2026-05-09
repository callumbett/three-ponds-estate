"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Subtle fade-up transition on route change. Wraps the page `<main>`
 * content; remounts on every pathname change (key={pathname}), which
 * triggers the `initial → animate` sequence afresh.
 *
 * Why this pattern over `<AnimatePresence mode="wait">`:
 *   - In Next.js App Router, AnimatePresence's exit animations are
 *     unreliable because Next replaces children synchronously before
 *     AnimatePresence sees the unmount. Key-driven remounting gets
 *     the new-page entrance animation reliably without fighting the
 *     framework.
 *
 * Editorial fit:
 *   - 500 ms duration, project's signature cubic-bezier ease.
 *   - Fade combined with a subtle 8px lift — feels like turning a
 *     magazine page rather than a hard cut.
 *   - Honours `useReducedMotion()` — collapses to instant.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;
  const duration = reduceMotion ? 0 : 0.5;

  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

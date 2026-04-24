"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Delay before the element animates in, in seconds. */
  delay?: number;
  /** How far the element travels in pixels. */
  distance?: number;
  /** Tailwind className passthrough. */
  className?: string;
  /** Use `false` for elements that should remain animated each time they enter view. */
  once?: boolean;
};

/**
 * Lightweight scroll-reveal wrapper. Honors `prefers-reduced-motion`.
 * Children gently float up and fade in as they enter the viewport.
 */
export default function MotionReveal({
  children,
  delay = 0,
  distance = 24,
  className,
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

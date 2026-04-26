"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useNav } from "./context";

/**
 * The fixed sticky shell. Renders a parchment-coloured backdrop that
 * fades in on scroll (animating *opacity only* — GPU-accelerated, per
 * Bencium MOTION-SPEC §"Performance Rules"), and a centred row that
 * holds the brand, links, action, and mobile toggle.
 *
 * Children are composed by SiteNav (or any consumer); Header doesn't
 * know what's inside it.
 */
export default function NavHeader({ children }: { children: ReactNode }) {
  const {
    state: { onParchment, mobileOpen },
    meta: { reduceMotion },
  } = useNav();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/*
       * Parchment overlay: separate element so we can animate just
       * `opacity` on it and leave the row content untouched. Solid
       * parchment (not /85) when the mobile sheet is open so there's
       * no transparency at all behind the open menu. Otherwise /85
       * gives a faint frosted look that adds character on hero pages
       * after scroll.
       */}
      <motion.div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 border-b border-line backdrop-blur",
          mobileOpen ? "bg-parchment" : "bg-parchment/85",
        ].join(" ")}
        initial={false}
        animate={{ opacity: onParchment ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-10 sm:py-4">
        {children}
      </div>
    </header>
  );
}

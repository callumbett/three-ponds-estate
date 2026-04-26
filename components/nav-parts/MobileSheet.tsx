"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useNav } from "./context";
import { useFocusTrap } from "./useFocusTrap";

/**
 * The mobile drawer. Sits below the fixed masthead and slides in/out.
 * Wrapped in <AnimatePresence> so closing animates out.
 *
 * Top offset is scroll-aware — when the masthead is at full size (logo
 * is large), the sheet sits below the tall row; once scrolled (logo
 * collapses to Book-Now size), the sheet slides up to sit below the
 * compact row. transition-[top] keeps the move smooth.
 *
 * Accessibility (AccessLint):
 *   - role="dialog" + aria-modal so assistive tech treats it as a
 *     focus-blocking overlay.
 *   - Focus trap (useFocusTrap) keeps Tab inside while open.
 *   - Escape closes (handled by the Provider).
 *   - Body scroll-lock while open (Provider).
 */
export default function NavMobileSheet({ children }: { children: ReactNode }) {
  const {
    state: { mobileOpen, scrolled },
    meta: { reduceMotion },
  } = useNav();

  const sheetRef = useRef<HTMLDivElement>(null);
  useFocusTrap(sheetRef, mobileOpen);

  const duration = reduceMotion ? 0 : 0.3;

  return (
    <AnimatePresence initial={false}>
      {mobileOpen && (
        <motion.div
          ref={sheetRef}
          key="nav-mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "fixed inset-x-0 z-40 border-y border-line bg-parchment md:hidden",
            "transition-[top] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "top-[64px] sm:top-[72px]"
              : "top-[152px] sm:top-[192px]",
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

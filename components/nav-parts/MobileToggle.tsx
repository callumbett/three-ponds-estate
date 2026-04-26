"use client";

import { useNav } from "./context";

/**
 * Hamburger / X toggle for the mobile sheet. Visible only below md.
 *
 * Icon colour adapts to whatever the masthead is sitting on:
 *   - Over the hero photo (unscrolled, menu closed): parchment with a
 *     subtle drop-shadow so the strokes read on bright photo regions.
 *   - On the parchment backdrop (scrolled OR menu open): charcoal.
 *
 * No corten on hover — opacity-dim instead, matching the "hover colour
 * matches text" rule applied across the masthead.
 */
export default function NavMobileToggle() {
  const {
    state: { mobileOpen, onParchment },
    actions: { toggleMobile },
  } = useNav();

  return (
    <button
      type="button"
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileOpen}
      onClick={toggleMobile}
      className={[
        "transition-[color,opacity] duration-200 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4 md:hidden",
        onParchment
          ? "text-charcoal"
          : "text-parchment [filter:drop-shadow(0_1px_8px_rgba(0,0,0,0.55))]",
      ].join(" ")}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {mobileOpen ? (
          <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
        ) : (
          <>
            <path d="M4 7h16" strokeLinecap="round" />
            <path d="M4 17h16" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}

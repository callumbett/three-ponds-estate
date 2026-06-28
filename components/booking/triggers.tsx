"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * Four explicit booking triggers — one per editorial context.
 * No `variant` prop, no boolean flags. Each component renders exactly one
 * well-defined visual treatment. Per composition-patterns:
 *   - architecture-avoid-boolean-props
 *   - patterns-explicit-variants
 *
 *  NavTrigger     — over-photo CTA used by both the masthead and the
 *                   Hero, so the two primary book buttons read identically
 *                   across the page. Parchment "reservation pill" with
 *                   charcoal label + corten arrow.
 *  PrimaryTrigger — on parchment surfaces (CTA section, pod pages, Contact);
 *                   solid corten, no extra decoration.
 *  QuietTrigger   — kept for backwards-compat / quiet contexts.
 *  MobileTrigger  — mobile drawer; full-width solid.
 *
 * All four navigate to the dedicated /book page, where the Lodgify Search
 * Box lives. (Previously they opened a SiteMinder modal; that engine has
 * been retired in favour of Lodgify.) Each fires the `book_now_click` GA4
 * event on click — the single on-site booking-intent signal that Google
 * Ads attributes spend against — carrying the pod's room-type id when the
 * button is pod-specific.
 */

/**
 * Optional pod scope — passed by the "Book {pod.name}" button on a pod
 * detail page so the analytics event records which pod drove the click.
 */
export type BookingFilter = {
  roomTypeId?: number;
};

type TriggerProps = {
  label?: string;
  className?: string;
  filter?: BookingFilter;
};

/** Destination for every booking trigger. */
const BOOK_HREF = "/book";

/** Fire the booking-intent event; navigation is handled by <Link>. */
function trackBookClick(filter?: BookingFilter) {
  trackEvent("book_now_click", {
    pod_filter: filter?.roomTypeId ?? "any",
  });
}

// 150ms hover transition per Bencium MOTION-SPEC §"Hover state".
const triggerBase =
  "group inline-flex items-center justify-center rounded-full text-sm font-medium tracking-wide transition-[background-color,color,transform,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={["ml-2 transition-transform duration-200 ease-out group-hover:translate-x-0.5", className].join(" ")}
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The over-photo "reservation pill". Parchment fill, charcoal label,
 * corten arrow — with a **shiny sheen** that sweeps across on hover
 * (cream gradient at +12° skew, translates from off-screen-left to
 * off-screen-right over 700 ms). Adapted from a 21st.dev shimmer pattern;
 * brand-appropriate version uses parchment-on-parchment.
 *
 * Used by the masthead, Hero CTA, and sticky mobile pill so the primary
 * booking action looks identical everywhere.
 */
export function BookingNavTrigger({
  label = "Book Now",
  className = "",
  filter,
}: TriggerProps) {
  return (
    <Link
      href={BOOK_HREF}
      onClick={() => trackBookClick(filter)}
      className={[
        triggerBase,
        // Layered structure: relative + overflow-hidden so the sheen
        // can slide across without spilling out of the rounded shape.
        "relative isolate overflow-hidden",
        "bg-parchment px-6 py-2.5 text-charcoal hover:bg-parchment-deep",
        "shadow-md shadow-charcoal/20 ring-1 ring-charcoal/5",
        className,
      ].join(" ")}
    >
      {/*
       * Sheen layer — a pale cream highlight at +12° skew. Lives off the
       * left edge by default (-translate-x-full); on hover it translates
       * fully across to the right edge over 700 ms, like a brushed-light
       * reflection passing the surface.
       */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[12deg] bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
      />
      {/*
       * Subtle inner highlight along the top edge — gives the pill a
       * sense of being "lit from above" rather than flat parchment.
       * Always visible, doesn't animate.
       */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(0,0,0,0.04)]"
      />

      <span className="relative z-10 inline-flex items-center">
        {label}
        <Arrow className="text-corten" />
      </span>
    </Link>
  );
}

export function BookingPrimaryTrigger({
  label = "Book Now",
  className = "",
  filter,
}: TriggerProps) {
  return (
    <Link
      href={BOOK_HREF}
      onClick={() => trackBookClick(filter)}
      className={[
        triggerBase,
        "bg-corten px-6 py-2.5 text-parchment shadow-sm hover:bg-corten-deep",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow />
    </Link>
  );
}

export function BookingQuietTrigger({
  label = "Book Now",
  className = "",
  filter,
}: TriggerProps) {
  return (
    <Link
      href={BOOK_HREF}
      onClick={() => trackBookClick(filter)}
      className={[
        triggerBase,
        "border border-corten/60 px-6 py-2.5 text-corten hover:bg-corten hover:text-parchment",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow />
    </Link>
  );
}

export function BookingMobileTrigger({
  label = "Book Now",
  className = "",
  filter,
}: TriggerProps) {
  return (
    <Link
      href={BOOK_HREF}
      onClick={() => trackBookClick(filter)}
      className={[
        triggerBase,
        "w-full bg-corten px-6 py-3 text-parchment hover:bg-corten-deep",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow />
    </Link>
  );
}

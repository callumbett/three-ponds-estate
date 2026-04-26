"use client";

import { useBooking } from "./context";

/**
 * Four explicit triggers — one per editorial context.
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
 * All four open the same single modal mounted in `app/layout.tsx`.
 */

type TriggerProps = {
  label?: string;
  className?: string;
};

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
 * The over-photo "reservation pill". Parchment fill (the building
 * material of the brand) reads cleanly against any photo. Charcoal
 * label, corten arrow — corten still appears as an accent so the
 * booking action keeps its brand cue, but the pill itself doesn't fight
 * a sunset photo for legibility. Used by both the masthead and the
 * Hero so the two primary CTAs are identical.
 */
export function BookingNavTrigger({
  label = "Book Now",
  className = "",
}: TriggerProps) {
  const {
    actions: { open },
  } = useBooking();
  return (
    <button
      type="button"
      onClick={open}
      className={[
        triggerBase,
        "bg-parchment px-6 py-2.5 text-charcoal hover:bg-parchment-deep",
        "shadow-md shadow-charcoal/20 ring-1 ring-charcoal/5",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow className="text-corten" />
    </button>
  );
}

export function BookingPrimaryTrigger({
  label = "Book your stay",
  className = "",
}: TriggerProps) {
  const {
    actions: { open },
  } = useBooking();
  return (
    <button
      type="button"
      onClick={open}
      className={[
        triggerBase,
        "bg-corten px-6 py-2.5 text-parchment shadow-sm hover:bg-corten-deep",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow />
    </button>
  );
}

export function BookingQuietTrigger({
  label = "Book Now",
  className = "",
}: TriggerProps) {
  const {
    actions: { open },
  } = useBooking();
  return (
    <button
      type="button"
      onClick={open}
      className={[
        triggerBase,
        "border border-corten/60 px-6 py-2.5 text-corten hover:bg-corten hover:text-parchment",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow />
    </button>
  );
}

export function BookingMobileTrigger({
  label = "Book your stay",
  className = "",
}: TriggerProps) {
  const {
    actions: { open },
  } = useBooking();
  return (
    <button
      type="button"
      onClick={open}
      className={[
        triggerBase,
        "w-full bg-corten px-6 py-3 text-parchment hover:bg-corten-deep",
        className,
      ].join(" ")}
    >
      {label}
      <Arrow />
    </button>
  );
}

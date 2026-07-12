"use client";

import { useEffect } from "react";
import {
  LODGIFY_WEBSITE_ID,
  LODGIFY_SLUG,
  LODGIFY_BOOK_NOW_BOX_LOADER,
} from "@/lib/lodgify";
import { trackEvent } from "@/lib/analytics";

/**
 * Lodgify "Booking box" — a per-rental calendar with live pricing and a
 * Book Now button, embedded directly on each pod's /stay/[slug] page.
 *
 * Renders the container `<div id="lodgify-book-now-box">` carrying
 * Lodgify's `data-*` configuration (with this pod's `data-rental-id`),
 * then injects Lodgify's loader script. Like the Search Box, the loader
 * only scans at execution time, so we (re)inject on mount and clean up on
 * unmount — that keeps it working across Next.js client-side navigation
 * (e.g. moving between pods). Only one box renders per page, so the shared
 * container id never collides.
 *
 * Theming lives in `globals.css` under the `--ldg-bnb-*` custom
 * properties (Lodgify's Booking box theming API), mapped to the brand
 * palette.
 *
 * `data-new-tab="true"` (as generated in Lodgify): the Book Now button
 * opens the Lodgify checkout in a new tab.
 */
type Props = {
  /** Lodgify rental id for this pod (see lib/pods.ts → lodgifyRentalId). */
  rentalId: number;
  /** Wrapper class — width / spacing of the box within its column. */
  className?: string;
};

/**
 * Label given to Lodgify via `data-book-button-label` below. Kept as a
 * constant so the analytics click-matcher and the widget config can't
 * drift apart.
 */
const BOOK_BUTTON_LABEL = "Book Now";

export default function LodgifyBookingBox({ rentalId, className = "" }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = LODGIFY_BOOK_NOW_BOX_LOADER;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  /**
   * GA4 `book_now_click` — the single on-site booking-intent signal
   * (Google Ads attributes spend against it). Lodgify renders its own
   * DOM inside the container, so we listen in the capture phase on the
   * wrapper and match the widget's Book Now button by its configured
   * label. Calendar cells and guest steppers are buttons too — the
   * label check keeps them out of the event.
   */
  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    const button = target?.closest("button");
    if (button && button.textContent?.trim() === BOOK_BUTTON_LABEL) {
      trackEvent("book_now_click", { pod_filter: rentalId });
    }
  }

  return (
    <div className={className} onClickCapture={handleClickCapture}>
      <div
        id="lodgify-book-now-box"
        data-rental-id={String(rentalId)}
        data-website-id={LODGIFY_WEBSITE_ID}
        data-slug={LODGIFY_SLUG}
        data-language-code="en"
        data-new-tab="true"
        data-version="stable"
        data-has-guests-breakdown=""
        data-check-in-label="Check-in"
        data-check-out-label="Check-out"
        data-guests-label="Guests"
        data-guests-singular-label={"{{NumberOfGuests}} guest"}
        data-guests-plural-label={"{{NumberOfGuests}} guests"}
        data-location-input-label="Location"
        data-total-price-label="Total price:"
        data-select-dates-to-see-price-label="Select dates to see total price"
        data-minimum-price-per-night-first-label="From"
        data-minimum-price-per-night-second-label="per night"
        data-book-button-label={BOOK_BUTTON_LABEL}
        data-guests-breakdown-label="Guests"
        data-adults-label={'{"one":"adult","other":"adults"}'}
        data-adults-description={"Ages {minAge} or above"}
        data-children-label={'{"one":"child","other":"children"}'}
        data-children-description={"Ages {minAge}-{maxAge}"}
        data-children-not-allowed-label="Not suitable for children"
        data-infants-label={'{"one":"infant","other":"infants"}'}
        data-infants-description={"Under {maxAge}"}
        data-infants-not-allowed-label="Not suitable for infants"
        data-pets-label={'{"one":"pet","other":"pets"}'}
        data-pets-not-allowed-label="Not allowed"
        data-done-label="Done"
      />
    </div>
  );
}

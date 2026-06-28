"use client";

import { useEffect } from "react";
import {
  LODGIFY_WEBSITE_ID,
  LODGIFY_SEARCH_PAGE_URL,
  LODGIFY_SEARCH_BAR_LOADER,
} from "@/lib/lodgify";

/**
 * Lodgify "Search Box" (portable search bar).
 *
 * Renders the container `<div id="lodgify-search-bar">` carrying all of
 * Lodgify's `data-*` configuration, then injects Lodgify's loader script.
 * The loader scans the DOM for `#lodgify-search-bar` *when it executes*
 * and renders the live bar into it.
 *
 * Why inject the script in an effect rather than once in the layout:
 * the loader only scans at execution time. In a Next.js App Router SPA,
 * client-side navigation mounts a fresh container the original page-load
 * scan never saw — so we (re)inject on every mount and remove on unmount.
 * Only one instance is ever on screen at a time (homepage *or* /book),
 * so the shared `id` never collides.
 *
 * Theming lives in `globals.css` under the `--ldg-*` custom properties
 * (Lodgify's own theming API), mapped to the brand palette.
 *
 * NOTE: `data-search-page-url` points at the booking subdomain. Until the
 * subdomain DNS + Lodgify linking is live the bar renders and is fully
 * interactive, but the post-search redirect won't resolve yet.
 */
type Props = {
  /** Wrapper class — width / spacing of the bar within its section. */
  className?: string;
};

export default function LodgifySearchBar({ className = "" }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = LODGIFY_SEARCH_BAR_LOADER;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className={className}>
      <div
        id="lodgify-search-bar"
        data-website-id={LODGIFY_WEBSITE_ID}
        data-language-code="en"
        data-search-page-url={LODGIFY_SEARCH_PAGE_URL}
        data-dates-check-in-label="Check-in"
        data-dates-check-out-label="Check-out"
        data-guests-counter-label="Guests"
        data-guests-input-singular-label={"{{NumberOfGuests}} guest"}
        data-guests-input-plural-label={"{{NumberOfGuests}} guests"}
        data-location-input-label="Location"
        data-search-button-label="Search"
        data-dates-input-min-stay-tooltip-text={
          '{"one":"Minimum {minStay} night","other":"Minimum {minStay} nights"}'
        }
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
        data-new-tab="false"
        data-version="stable"
        data-has-guests-breakdown=""
        data-hide-location=""
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Document-level click listener that fires GA4 conversion events for
 * `tel:`, `mailto:`, and `/site-maps/` link clicks. One mount in the
 * root layout covers every current and future link of these types,
 * so we don't need to instrument individual components — the Footer,
 * Contact, Terms, Privacy, FAQ pages, and the BookingModal all benefit
 * automatically.
 *
 * Returns null — this is a side-effect-only component.
 */
export default function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        trackEvent("tel_click", { tel: href.slice(4) });
      } else if (href.startsWith("mailto:")) {
        const email = href.slice(7).split("?")[0];
        trackEvent("email_click", { email });
      } else if (href.startsWith("/site-maps/")) {
        trackEvent("site_map_download", { file: href });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

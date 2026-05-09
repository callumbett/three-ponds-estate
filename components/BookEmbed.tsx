"use client";

import { useEffect } from "react";
import { reInitSiteMinder } from "@/lib/siteminder";
import { useBooking } from "@/components/booking";

type Props = {
  /** Forwarded to the embed div for direct CSS sizing. */
  className?: string;
};

/**
 * Inline SiteMinder booking-engine embed for the dedicated /book page.
 *
 * Reads `channelcode` and `region` from the BookingProvider context
 * (same source as the modal). Re-triggers SiteMinder's DOM scan after
 * mount because the script scans once on initial page load and misses
 * client-rendered routes.
 *
 * Reads URL query params automatically — when the user arrives from
 * the homepage availability search with `?check_in_date=…` and
 * `?check_out_date=…`, the embed picks them up and pre-fills.
 */
export default function BookEmbed({ className = "" }: Props) {
  const {
    meta: { channelcode, region },
  } = useBooking();

  useEffect(() => {
    if (!channelcode) return;
    // 100 ms wait so React has actually painted the embed div before
    // we ask SiteMinder's script to look for it.
    const t = window.setTimeout(reInitSiteMinder, 100);
    return () => window.clearTimeout(t);
  }, [channelcode]);

  if (!channelcode) {
    return (
      <div className="rounded-sm border border-line bg-parchment-deep p-10">
        <p className="eyebrow">Booking integration pending</p>
        <h3 className="mt-4 font-serif text-2xl text-charcoal">
          The booking engine will mount here.
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-charcoal-soft">
          Set <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">NEXT_PUBLIC_LH_CHANNELCODE</code>{" "}
          in Vercel → Settings → Environment Variables to enable.
        </p>
      </div>
    );
  }

  return (
    <div
      className={["ibe", className].join(" ")}
      data-region={region}
      data-channelcode={channelcode}
      data-widget="embed"
      data-mobile_fullscreen="false"
      data-use_parent="true"
    />
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, type MouseEvent } from "react";
import { reInitSiteMinder } from "@/lib/siteminder";
import { useBooking } from "./context";

/**
 * The single booking dialog for the entire site.
 * Mounted once in `app/layout.tsx`; every <Booking.*Trigger /> opens this.
 *
 * Three rendering modes, in priority order:
 *   1. SiteMinder embed widget — when NEXT_PUBLIC_LH_CHANNELCODE is set.
 *      This mounts the booking engine *inline* on our domain (not an
 *      iframe to their site) using the SiteMinder JS library loaded in
 *      app/layout.tsx.
 *   2. Legacy iframe — when NEXT_PUBLIC_LITTLE_HOTELIER_URL is set
 *      (older integration pattern, keeps the dialog working until the
 *      embed channel code is provided).
 *   3. Placeholder — when neither env var is set, shows a clearly-marked
 *      "integration pending" state so design review still passes.
 */
export default function BookingModal() {
  const {
    state: { open, primed },
    actions: { close },
    meta: { url, channelcode, region },
  } = useBooking();

  const useEmbed = channelcode.length > 0;

  // When the modal opens with a SiteMinder embed div freshly in the
  // DOM, kick the SiteMinder script to scan for it.
  useEffect(() => {
    if (!open || !useEmbed) return;
    // 100 ms wait so motion's enter animation has painted the div
    // before we trigger init — without this, the scan can race and
    // miss the not-yet-mounted node.
    const t = window.setTimeout(reInitSiteMinder, 100);
    return () => window.clearTimeout(t);
  }, [open, useEmbed]);

  // Preconnect / dns-prefetch on the underlying booking host so the
  // first request feels instant once the user has interacted with the
  // page. React 19 hoists <link> elements to <head>.
  const preconnectHost = useEmbed
    ? region === "emea"
      ? "https://direct-book.com"
      : "https://book-directonline.com"
    : null;

  let iframeOrigin: string | null = null;
  try {
    iframeOrigin = url ? new URL(url).origin : null;
  } catch {
    iframeOrigin = null;
  }

  return (
    <>
      {primed && useEmbed && preconnectHost && (
        <>
          <link rel="preconnect" href={preconnectHost} />
          <link rel="dns-prefetch" href={preconnectHost} />
          <link rel="preconnect" href="https://widget.siteminder.com" />
        </>
      )}
      {primed && !useEmbed && iframeOrigin && (
        <>
          <link rel="preconnect" href={iframeOrigin} />
          <link rel="dns-prefetch" href={iframeOrigin} />
        </>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            // Outer wrapper: edge-to-edge on mobile so the dialog can
            // claim the full viewport; centred + padded on sm+.
            className="fixed inset-0 z-[60] flex items-stretch justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Book your stay at Three Ponds Estate"
          >
            <div className="absolute inset-0 bg-charcoal/55 backdrop-blur-sm" />

            <motion.div
              /*
               * Mobile: fill the dynamic viewport (`100dvh` — handles
               * iOS Safari's collapsing address bar).
               *
               * Desktop: width snaps to the SiteMinder embed's natural
               * size. Their booking content is ≈1024 px wide, so we
               * cap at max-w-5xl (1024 px) instead of max-w-6xl
               * (1152 px). Result: no large empty band on the right
               * of the modal in dark mode where their iframe stops
               * before our modal edge.
               */
              className="relative flex w-full flex-col overflow-hidden bg-parchment shadow-2xl h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:max-w-5xl sm:rounded-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <header className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
                <div>
                  <p className="eyebrow">Book your stay</p>
                  <h2 className="mt-1 font-serif text-xl text-charcoal">
                    Three Ponds Estate
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close booking dialog"
                  className="text-charcoal-soft transition-colors duration-150 ease-out hover:text-charcoal focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                  </svg>
                </button>
              </header>

              <div className="flex flex-1 flex-col overflow-auto bg-parchment">
                {useEmbed ? (
                  // Mode 1 · SiteMinder inline embed widget.
                  // The SiteMinder JS (loaded in app/layout.tsx) scans for
                  // class="ibe" and replaces this div with the live engine.
                  // `data-use_parent` lets the iframe size to our flex-1
                  // container instead of demanding a fixed minimum height.
                  <div
                    key={`ibe-${open}`}
                    className="ibe flex-1 min-h-[420px]"
                    data-region={region}
                    data-channelcode={channelcode}
                    data-widget="embed"
                    data-mobile_fullscreen="false"
                    data-use_parent="true"
                  />
                ) : url ? (
                  // Mode 2 · Legacy iframe.
                  <iframe
                    src={url}
                    title="Little Hotelier booking"
                    className="h-[70vh] w-full border-0 bg-parchment"
                  />
                ) : (
                  // Mode 3 · Placeholder.
                  <BookingPlaceholder />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Shown when neither integration variable is configured. */
function BookingPlaceholder() {
  return (
    <div className="flex min-h-[400px] flex-col items-start justify-center gap-4 p-10">
      <p className="eyebrow">Booking integration pending</p>
      <h3 className="font-serif text-2xl text-charcoal">
        The Little Hotelier booking engine will mount here.
      </h3>
      <p className="max-w-lg text-sm leading-relaxed text-charcoal-soft">
        To wire up the inline embed, set{" "}
        <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">
          NEXT_PUBLIC_LH_CHANNELCODE
        </code>{" "}
        (and optionally{" "}
        <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">
          NEXT_PUBLIC_LH_REGION
        </code>
        ) in Vercel → Settings → Environment Variables. The SiteMinder
        widget will appear inline as soon as the deployment redeploys
        and the domain is whitelisted.
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        <a
          href="mailto:info@threepondsestate.com"
          className="rounded-full border border-corten/60 px-5 py-2 text-sm text-corten transition-colors duration-150 hover:bg-corten hover:text-parchment"
        >
          Enquire by email
        </a>
        <a
          href="tel:+61403433300"
          className="rounded-full bg-corten px-5 py-2 text-sm text-parchment transition-colors duration-150 hover:bg-corten-deep"
        >
          Call 0403 433 300
        </a>
      </div>
    </div>
  );
}

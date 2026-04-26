"use client";

import { AnimatePresence, motion } from "motion/react";
import { type MouseEvent } from "react";
import { useBooking } from "./context";

/**
 * The single booking dialog for the entire site.
 * Mounted once in `app/layout.tsx`; every <Booking.*Trigger /> opens this.
 *
 * Falls back to a clearly-marked placeholder when the
 * NEXT_PUBLIC_LITTLE_HOTELIER_URL env var is unset, so the build still
 * passes for design review even before the booking engine is wired up.
 */
export default function BookingModal() {
  const {
    state: { open, primed },
    actions: { close },
    meta: { url },
  } = useBooking();

  // D5 — once the user has interacted with the page, warm up the
  // connection to the booking host so clicking a Book button feels
  // instant. React 19 hoists <link> elements to <head> automatically.
  const bookingOrigin = (() => {
    try {
      return url ? new URL(url).origin : null;
    } catch {
      return null;
    }
  })();

  return (
    <>
      {primed && bookingOrigin && (
        <>
          <link rel="preconnect" href={bookingOrigin} />
          <link rel="dns-prefetch" href={bookingOrigin} />
        </>
      )}
      <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
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
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-parchment shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-4">
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

            {url ? (
              <iframe
                src={url}
                title="Little Hotelier booking"
                className="h-[70vh] w-full border-0 bg-parchment"
              />
            ) : (
              <BookingPlaceholder />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

/** Shown when the booking integration URL hasn't been configured. */
function BookingPlaceholder() {
  return (
    <div className="flex min-h-[400px] flex-col items-start justify-center gap-4 p-10">
      <p className="eyebrow">Booking integration pending</p>
      <h3 className="font-serif text-2xl text-charcoal">
        The Little Hotelier engine will mount here.
      </h3>
      <p className="max-w-lg text-sm leading-relaxed text-charcoal-soft">
        To wire this up: set{" "}
        <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">
          NEXT_PUBLIC_LITTLE_HOTELIER_URL
        </code>{" "}
        in{" "}
        <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">
          .env.local
        </code>{" "}
        to your property&apos;s reservations URL. The modal will then iframe
        the booking widget directly.
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

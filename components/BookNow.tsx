"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";

type Props = {
  variant?: "solid" | "ghost";
  label?: string;
  className?: string;
};

/**
 * Trigger for the Little Hotelier booking engine.
 *
 * Wiring:
 *   1. Set NEXT_PUBLIC_LITTLE_HOTELIER_URL in .env.local
 *      (e.g. https://reservations.littlehotelier.com/properties/THREEPONDS).
 *   2. The modal will iframe that URL automatically.
 *      If the env var is empty, the modal renders a clearly-marked stub so
 *      the build still passes for design review.
 */
export default function BookNow({
  variant = "solid",
  label = "Book Now",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const url = process.env.NEXT_PUBLIC_LITTLE_HOTELIER_URL ?? "";

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300";
  const styles =
    variant === "solid"
      ? "bg-corten text-parchment hover:bg-corten-deep shadow-sm"
      : "border border-corten/60 text-corten hover:bg-corten hover:text-parchment";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[base, styles, className ?? ""].join(" ")}
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="ml-2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
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
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <div>
                  <p className="eyebrow">Book your stay</p>
                  <h2 className="mt-1 font-serif text-xl">Three Ponds Estate</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-charcoal-soft hover:text-charcoal"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {url ? (
                <iframe
                  src={url}
                  title="Little Hotelier booking"
                  className="h-[70vh] w-full border-0 bg-parchment"
                />
              ) : (
                <div className="flex min-h-[400px] flex-col items-start justify-center gap-4 p-10">
                  <p className="eyebrow">Booking integration pending</p>
                  <h3 className="font-serif text-2xl text-charcoal">
                    The Little Hotelier engine will mount here.
                  </h3>
                  <p className="max-w-lg text-sm leading-relaxed text-charcoal-soft">
                    To wire this up: set <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">NEXT_PUBLIC_LITTLE_HOTELIER_URL</code>{" "}
                    in <code className="rounded bg-parchment-deep px-1.5 py-0.5 text-xs">.env.local</code>{" "}
                    to your property&apos;s reservations URL. The modal will then
                    iframe the booking widget directly.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href="mailto:hello@threepondsestate.com.au"
                      className="rounded-full border border-corten/60 px-5 py-2 text-sm text-corten hover:bg-corten hover:text-parchment"
                    >
                      Enquire by email
                    </a>
                    <a
                      href="tel:+61"
                      className="rounded-full bg-corten px-5 py-2 text-sm text-parchment hover:bg-corten-deep"
                    >
                      Call us
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

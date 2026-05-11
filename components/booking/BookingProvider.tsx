"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BookingContext,
  type BookingContextValue,
  type BookingFilter,
} from "./context";

type Props = { children: ReactNode };

/**
 * Owns the booking modal's open/closed state, the scroll-lock side effect,
 * the Escape-to-close handler, and the Little Hotelier URL.
 *
 * D5 — "primed" state: on the user's first interaction (mousemove,
 * scroll, touch), we flip `primed` to true. The Modal then injects
 * preconnect / dns-prefetch hints to the booking host so when the user
 * eventually clicks a Book button, the TLS handshake is already done
 * and the iframe loads instantly.
 *
 * Mounted once at the site root in `app/layout.tsx`.
 */
export default function BookingProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [primed, setPrimed] = useState(false);
  const [filter, setFilter] = useState<BookingFilter | null>(null);
  const url = process.env.NEXT_PUBLIC_LITTLE_HOTELIER_URL ?? "";
  const channelcode = process.env.NEXT_PUBLIC_LH_CHANNELCODE ?? "";
  const rawRegion = process.env.NEXT_PUBLIC_LH_REGION ?? "apac";
  const region = rawRegion === "emea" ? "emea" : "apac";

  const openModal = useCallback((nextFilter?: BookingFilter) => {
    // Reset filter on each open — generic "Book Now" buttons clear any
    // previous pod-specific scope; pod-page buttons set their own.
    setFilter(nextFilter ?? null);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Prime on first user interaction (D5).
  useEffect(() => {
    if (primed) return;
    const prime = () => setPrimed(true);
    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "scroll",
      "touchstart",
      "keydown",
    ];
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    events.forEach((evt) => window.addEventListener(evt, prime, opts));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, prime));
    };
  }, [primed]);

  const value = useMemo<BookingContextValue>(
    () => ({
      state: { open, primed, filter },
      actions: { open: openModal, close: closeModal },
      meta: { url, channelcode, region },
    }),
    [open, primed, filter, openModal, closeModal, url, channelcode, region],
  );

  return <BookingContext value={value}>{children}</BookingContext>;
}

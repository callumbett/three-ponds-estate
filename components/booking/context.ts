"use client";

import { createContext, use } from "react";

/**
 * Context interface follows the {state, actions, meta} shape from
 * composition-patterns/rules/state-context-interface.md — generic enough
 * that the provider is the only place that knows *how* state is managed.
 */
export type BookingContextValue = {
  state: { open: boolean; primed: boolean };
  actions: { open: () => void; close: () => void };
  meta: {
    /**
     * Legacy iframe URL. Falls back to placeholder when neither
     * iframe URL nor the SiteMinder channel code is configured.
     */
    url: string;
    /**
     * SiteMinder / TheBookingButton channel code, e.g. "THREEPONDS".
     * When set, the modal renders the SiteMinder widget inline
     * (not an iframe) using the engine's `embed` widget pattern.
     */
    channelcode: string;
    /**
     * SiteMinder region — "apac" or "emea". Defaults to "apac".
     */
    region: "apac" | "emea";
  };
};

export const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Read booking state from the nearest <BookingProvider />.
 *
 * React 19: we use `use()` rather than `useContext()` per
 * composition-patterns/rules/react19-no-forwardref.md.
 */
export function useBooking(): BookingContextValue {
  const ctx = use(BookingContext);
  if (!ctx) {
    throw new Error(
      "useBooking() must be used inside a <BookingProvider />. " +
        "It is mounted at the root in app/layout.tsx.",
    );
  }
  return ctx;
}

"use client";

import type { ReactNode } from "react";

/**
 * Right-side slot of the masthead, hidden on mobile. The mobile drawer
 * has its own action region so we don't need to render this twice.
 *
 * Currently used for <Booking.QuietTrigger />, but kept as a generic
 * slot so future variants (e.g. an account/login link) can drop in
 * without touching the Nav internals.
 */
export default function NavAction({ children }: { children: ReactNode }) {
  return <div className="hidden md:block">{children}</div>;
}

"use client";

import { Nav } from "./nav-parts";
import { Booking } from "./booking";

/**
 * The Three Ponds Estate masthead — the single explicit variant of the
 * Nav compound that this site uses.
 *
 * Per composition-patterns/rules/patterns-explicit-variants.md, this
 * file is *self-documenting*: you can read top-to-bottom what the nav
 * actually contains. No flags, no conditionals. If we ever needed a
 * different nav (e.g. a checkout-flow nav), we'd write a second
 * explicit variant rather than adding a `variant` prop here.
 */
const LINKS = [
  { href: "/stay", label: "Stay" },
  { href: "/story", label: "Story" },
  { href: "/explore", label: "Explore" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <Nav.Provider>
      <Nav.Header>
        <Nav.Brand />
        <Nav.LinksRail links={LINKS} />
        <Nav.Action>
          {/*
           * Parchment "reservation pill" — bright parchment fill with
           * charcoal label and a corten arrow. The pill's contrast is
           * reliable against any photograph, and reserving corten for
           * the arrow (not the whole button) keeps it as a *moment*
           * colour rather than the dominant tone.
           */}
          <Booking.NavTrigger />
        </Nav.Action>
        <Nav.MobileToggle />
      </Nav.Header>
      <Nav.MobileSheet>
        <Nav.LinksStack links={LINKS} />
        <Booking.MobileTrigger />
      </Nav.MobileSheet>
    </Nav.Provider>
  );
}

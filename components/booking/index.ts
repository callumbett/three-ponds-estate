import {
  BookingMobileTrigger,
  BookingNavTrigger,
  BookingPrimaryTrigger,
  BookingQuietTrigger,
} from "./triggers";

/**
 * The Booking compound — drop explicit triggers anywhere on the page.
 * Every trigger navigates to the dedicated /book page, where the Lodgify
 * Search Box lives, and fires the `book_now_click` GA4 event on click.
 *
 * (There is no longer a Provider or Modal: the previous SiteMinder
 * inline-modal engine has been retired in favour of Lodgify's hosted
 * booking flow, so triggers are now simple links and need no shared
 * client state.)
 *
 * @example
 *   // components/Nav.tsx & components/Hero.tsx — the over-photo CTAs
 *   <Booking.NavTrigger />
 *
 *   // components/Nav.tsx (mobile drawer)
 *   <Booking.MobileTrigger />
 *
 *   // CTA section / contact page
 *   <Booking.PrimaryTrigger label="Book Now" />
 *
 *   (Pod pages now book via the inline <LodgifyBookingBox />, not a
 *   trigger — see app/stay/[slug]/page.tsx.)
 */
export const Booking = {
  NavTrigger: BookingNavTrigger,
  PrimaryTrigger: BookingPrimaryTrigger,
  QuietTrigger: BookingQuietTrigger,
  MobileTrigger: BookingMobileTrigger,
};

export type { BookingFilter } from "./triggers";

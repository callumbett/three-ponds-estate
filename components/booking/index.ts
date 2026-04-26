import BookingProvider from "./BookingProvider";
import BookingModal from "./BookingModal";
import {
  BookingMobileTrigger,
  BookingNavTrigger,
  BookingPrimaryTrigger,
  BookingQuietTrigger,
} from "./triggers";

/**
 * The Booking compound — mount the Provider once at the root, then drop
 * explicit triggers anywhere on the page. Every trigger opens the same
 * single modal.
 *
 * @example
 *   // app/layout.tsx
 *   <Booking.Provider>
 *     {children}
 *     <Booking.Modal />
 *   </Booking.Provider>
 *
 *   // components/Hero.tsx & components/Nav.tsx — the over-photo CTAs
 *   <Booking.NavTrigger />
 *
 *   // components/Nav.tsx (mobile drawer)
 *   <Booking.MobileTrigger />
 *
 *   // app/stay/[slug]/page.tsx
 *   <Booking.PrimaryTrigger label={`Book ${pod.name}`} />
 */
export const Booking = {
  Provider: BookingProvider,
  Modal: BookingModal,
  NavTrigger: BookingNavTrigger,
  PrimaryTrigger: BookingPrimaryTrigger,
  QuietTrigger: BookingQuietTrigger,
  MobileTrigger: BookingMobileTrigger,
};

export { useBooking } from "./context";
export type { BookingContextValue } from "./context";

import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Booking, cancellation, occupancy, and stay-related terms for Three Ponds Estate, Temora NSW.",
};

const SECTION_CLASS = "mt-10 first:mt-0";
const H_CLASS = "font-serif text-2xl text-charcoal sm:text-3xl";
const P_CLASS = "mt-4 text-base leading-relaxed text-charcoal-soft";

export default function TermsPage() {
  return (
    <>
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Legal</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
              The terms below set out the agreement between Three Ponds Estate
              and our guests. Please read them before booking — making a booking
              constitutes acceptance of these terms.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-charcoal-soft/70">
              Last updated · {new Date().toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <article className="prose-body">
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Bookings &amp; payment</h2>
                <p className={P_CLASS}>
                  Bookings can be made via our reservations engine, by email
                  to <a href="mailto:info@threepondsestate.com" className="text-corten hover:underline">info@threepondsestate.com</a>, or by phone on{" "}
                  <a href="tel:+61403433300" className="text-corten hover:underline">0403 433 300</a>.
                  Full payment is taken at the time of booking unless otherwise
                  agreed in writing. Rates are quoted in Australian dollars and
                  include GST.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Cancellation</h2>
                <p className={P_CLASS}>
                  Cancellations made more than 14 days before the scheduled
                  check-in are eligible for a full refund less any third-party
                  payment fees. Cancellations within 14 days are non-refundable
                  unless the stay can be re-let. We reserve the right to vary
                  these terms in case of natural disaster, public health order,
                  or other circumstances beyond reasonable control.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Check-in &amp; check-out</h2>
                <p className={P_CLASS}>
                  Check-in is from 2pm. Check-out is by 10am. We do not offer
                  Saturday check-outs. Late check-out may be available on
                  request, subject to the next booking.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Occupancy</h2>
                <p className={P_CLASS}>
                  Each pod has a maximum guest count stated on its detail page.
                  Visitors who are not staying overnight must be agreed in
                  advance. The pods are not suitable for events, parties, or
                  group functions.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Conduct</h2>
                <p className={P_CLASS}>
                  We ask guests to treat the property and its surrounds with
                  the same care we do. Damage caused by negligence or wilful
                  conduct may be charged to the guest. The property is
                  non-smoking inside. Pets are not permitted unless agreed in
                  writing prior to arrival.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Liability</h2>
                <p className={P_CLASS}>
                  Three Ponds Estate accepts no liability for personal injury,
                  loss, or damage to guest property except to the extent
                  required by Australian Consumer Law. Guests are responsible
                  for their own insurance.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Governing law</h2>
                <p className={P_CLASS}>
                  These terms are governed by the laws of New South Wales,
                  Australia.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Contact</h2>
                <p className={P_CLASS}>
                  Questions about these terms? Email{" "}
                  <a href="mailto:info@threepondsestate.com" className="text-corten hover:underline">info@threepondsestate.com</a>{" "}
                  or call{" "}
                  <a href="tel:+61403433300" className="text-corten hover:underline">0403 433 300</a>.
                </p>
                <p className={P_CLASS}>
                  See also our{" "}
                  <Link href="/privacy" className="text-corten hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/cookies" className="text-corten hover:underline">
                    Cookie Policy
                  </Link>.
                </p>
              </div>

              <p className={`${P_CLASS} mt-12 text-xs italic text-charcoal-soft/70`}>
                These terms are provided as a starting template. Three Ponds
                Estate recommends reviewing them with legal counsel before
                relying on them in commercial trade.
              </p>
            </article>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

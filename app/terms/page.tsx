import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Booking, cancellation, occupancy, and stay-related terms for Three Ponds Estate, Temora NSW.",
};

const SECTION_CLASS = "mt-12 first:mt-0";
const H_CLASS = "font-serif text-2xl text-charcoal sm:text-3xl";
const SUB_H_CLASS =
  "mt-6 font-serif text-base font-medium text-charcoal sm:text-lg";
const P_CLASS = "mt-3 text-base leading-relaxed text-charcoal-soft";

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
              and our guests. Please read them before booking — making a
              booking constitutes acceptance of these terms.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-charcoal-soft/70">
              Last updated ·{" "}
              {new Date().toLocaleDateString("en-AU", {
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
              {/* 1. Definitions */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>1 · Definitions</h2>
                <p className={P_CLASS}>
                  <strong className="text-charcoal">&ldquo;Booking&rdquo;</strong>{" "}
                  means the period for which you have paid to stay at the
                  Property.
                </p>
                <p className={P_CLASS}>
                  <strong className="text-charcoal">&ldquo;Property&rdquo;</strong>{" "}
                  means Three Ponds Estate, including all accommodation pods,
                  communal areas, fixtures, fittings, and surrounding grounds.
                </p>
                <p className={P_CLASS}>
                  <strong className="text-charcoal">&ldquo;Management&rdquo;</strong>{" "}
                  means the owners and operators of Three Ponds Estate.
                </p>
                <p className={P_CLASS}>
                  <strong className="text-charcoal">&ldquo;Guests&rdquo;</strong>{" "}
                  means the persons who reside overnight in the Property during
                  the Booking.
                </p>
              </div>

              {/* 2. Booking, Payment, and Security Bond */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  2 · Booking, payment &amp; security bond
                </h2>

                <h3 className={SUB_H_CLASS}>2.1 · Age requirement</h3>
                <p className={P_CLASS}>
                  To secure a Booking with Three Ponds Estate, the primary
                  guest must be 18 years of age or older.
                </p>

                <h3 className={SUB_H_CLASS}>2.2 · Accuracy of information</h3>
                <p className={P_CLASS}>
                  You must provide accurate, current, and complete details at
                  the time of booking, including the exact number of staying
                  guests.
                </p>

                <h3 className={SUB_H_CLASS}>2.3 · Payment</h3>
                <p className={P_CLASS}>
                  Full payment is required at the time of booking to confirm
                  and secure your reservation.
                </p>

                <h3 className={SUB_H_CLASS}>
                  2.4 · Credit card authorization (security bond)
                </h3>
                <p className={P_CLASS}>
                  Management reserves the right to request a credit card
                  authorization or hold prior to your arrival. This hold will
                  be released post-checkout, minus any charges for property
                  damage, missing items, excessive cleaning requirements, or
                  breaches of these Terms.
                </p>
              </div>

              {/* 3. Cancellation and Variation Policy */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  3 · Cancellation &amp; variation policy
                </h2>

                <h3 className={SUB_H_CLASS}>3.1 · Refund window</h3>
                <p className={P_CLASS}>
                  A full refund will be issued for cancellations made up to
                  five (5) days prior to your scheduled arrival date.
                  Cancellations or variations made within five (5) days of
                  arrival are strictly non-refundable.
                </p>

                <h3 className={SUB_H_CLASS}>3.2 · Travel insurance</h3>
                <p className={P_CLASS}>
                  Because our cancellation policy is strictly enforced, we
                  strongly recommend that all guests obtain comprehensive
                  travel insurance to cover unforeseen circumstances, medical
                  issues, or trip interruptions.
                </p>
              </div>

              {/* 4. Liability and Property Disclaimer */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>4 · Liability &amp; property disclaimer</h2>

                <h3 className={SUB_H_CLASS}>4.1 · Limitation of liability</h3>
                <p className={P_CLASS}>
                  Three Ponds Estate accepts no responsibility or liability
                  for any personal injury, illness, loss, or damage to
                  personal property suffered by guests, either directly or
                  indirectly, during their stay.
                </p>

                <h3 className={SUB_H_CLASS}>4.2 · Indemnity</h3>
                <p className={P_CLASS}>
                  You agree to indemnify and hold harmless Three Ponds Estate
                  from all claims, causes of action, or expenses arising from
                  any damage or injury caused by you or your guests.
                </p>

                <h3 className={SUB_H_CLASS}>4.3 · Adverse weather</h3>
                <p className={P_CLASS}>
                  Management accepts no liability for the impact of adverse
                  weather conditions (e.g. severe rain, wind, or extreme heat)
                  on your stay. No refunds or credits will be issued if
                  outdoor communal facilities (such as the firepit or BBQ)
                  cannot be used due to weather or local fire bans.
                </p>
              </div>

              {/* 5. Check-Out Restrictions */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>5 · Check-out restrictions</h2>

                <h3 className={SUB_H_CLASS}>5.1 · No Saturday check-outs</h3>
                <p className={P_CLASS}>
                  Please note that departures and check-outs are strictly
                  unavailable on Saturdays. Bookings must be structured to
                  check out on alternative days.
                </p>
              </div>

              {/* 6. Pod Care, Energy Efficiency, and Security */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  6 · Pod care, energy efficiency &amp; security
                </h2>

                <h3 className={SUB_H_CLASS}>6.1 · Estate speed limit</h3>
                <p className={P_CLASS}>
                  For the safety of wildlife and all guests, the speed limit
                  throughout Three Ponds Estate is strictly 5 km/h (walking
                  pace). Vehicles must remain on designated gravel driveways
                  and are strictly prohibited from driving onto the
                  grass/paddocks.
                </p>

                <h3 className={SUB_H_CLASS}>6.2 · Energy conservation</h3>
                <p className={P_CLASS}>
                  To support our energy-efficiency goals, all electronic
                  appliances — including lights, televisions, fans, and air
                  conditioning units — must be turned off whenever you exit
                  your pod.
                </p>

                <h3 className={SUB_H_CLASS}>6.3 · Securing the pod</h3>
                <p className={P_CLASS}>
                  To protect against unexpected weather and pests, all
                  windows, blinds, and doors must be securely closed whenever
                  leaving the accommodation unattended.
                </p>

                <h3 className={SUB_H_CLASS}>6.4 · Insect protection</h3>
                <p className={P_CLASS}>
                  Flyscreen / gauze doors must remain closed at all times to
                  prevent local insects and wildlife from entering the pods.
                </p>

                <h3 className={SUB_H_CLASS}>6.5 · Key return</h3>
                <p className={P_CLASS}>
                  Upon check-out, keys must be returned to the coded lockbox
                  located outside your pod. Please ensure the box is securely
                  locked and the combination numbers are thoroughly jumbled.
                </p>
              </div>

              {/* 7. Guest Behaviour, Quiet Hours, and Visitors */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  7 · Guest behaviour, quiet hours &amp; visitors
                </h2>

                <h3 className={SUB_H_CLASS}>7.1 · Peaceful enjoyment</h3>
                <p className={P_CLASS}>
                  Guests must maintain a respectful environment. Disturbance
                  to other guests or neighbouring properties will not be
                  tolerated.
                </p>

                <h3 className={SUB_H_CLASS}>7.2 · Quiet hours</h3>
                <p className={P_CLASS}>
                  A strict noise curfew is enforced between 12:00 AM and
                  8:00 AM, seven days a week. No offensive noise or music is
                  permitted during these hours.
                </p>

                <h3 className={SUB_H_CLASS}>7.3 · Alcohol &amp; behaviour</h3>
                <p className={P_CLASS}>
                  Excessive alcohol consumption, rowdy behaviour, or unsafe
                  conduct will result in immediate eviction from the property
                  with a complete forfeiture of all funds paid.
                </p>

                <h3 className={SUB_H_CLASS}>7.4 · Registered guests only</h3>
                <p className={P_CLASS}>
                  The property and its communal spaces (including the BBQ and
                  firepit) are strictly reserved for paying, registered
                  guests. Outside visitors are not permitted on the property
                  at any time.
                </p>

                <h3 className={SUB_H_CLASS}>7.5 · Smoking policy</h3>
                <p className={P_CLASS}>
                  Smoking, vaping, and the use of e-cigarettes are strictly
                  prohibited inside the pods and across all timber deck areas.
                </p>
              </div>

              {/* 8. Child Supervision and Pod Occupancy */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  8 · Child supervision &amp; pod occupancy
                </h2>

                <h3 className={SUB_H_CLASS}>8.1 · Adult supervision</h3>
                <p className={P_CLASS}>
                  Guests are fully responsible for the safety and conduct of
                  their children. Children must be accompanied by a
                  responsible adult at all times, both inside the pods and
                  throughout the estate grounds. Management accepts no
                  responsibility for unsupervised minors.
                </p>

                <h3 className={SUB_H_CLASS}>8.2 · Occupancy rules</h3>
                <p className={P_CLASS}>
                  An adult must reside in each booked pod alongside any
                  staying children. Adults are strictly prohibited from
                  booking a separate pod exclusively for minors (under 18
                  years of age).
                </p>

                <h3 className={SUB_H_CLASS}>8.3 · Pet policy</h3>
                <p className={P_CLASS}>
                  To protect the comfort of guests and local wildlife, pets
                  are strictly prohibited from entering the property.
                </p>
              </div>

              {/* 9. Commercial Restrictions */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>9 · Commercial restrictions</h2>

                <h3 className={SUB_H_CLASS}>9.1 · Commercial activity</h3>
                <p className={P_CLASS}>
                  No person, business, or charity may undertake promotional,
                  commercial, or marketing activities — including commercial
                  photography or videography — on the property without the
                  express written permission of Management.
                </p>
              </div>

              {/* 10. CCTV and Security Monitoring */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>10 · CCTV &amp; security monitoring</h2>

                <h3 className={SUB_H_CLASS}>10.1 · Security coverage</h3>
                <p className={P_CLASS}>
                  For the safety and protection of our guests, staff, and
                  property assets, Closed-Circuit Television (CCTV) cameras
                  are active externally outside each pod, monitoring the
                  outdoor entry thresholds and communal grounds.
                </p>

                <h3 className={SUB_H_CLASS}>10.2 · Privacy assurance</h3>
                <p className={P_CLASS}>
                  In accordance with privacy legislation, no cameras are
                  located inside the accommodation pods. Footage is handled
                  securely, kept confidential, and is only reviewed by
                  Management in the event of a security incident, property
                  damage, or a clear breach of these Terms.
                </p>
              </div>

              {/* 11. Breach of Terms and Termination */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  11 · Breach of terms &amp; termination
                </h2>

                <h3 className={SUB_H_CLASS}>11.1 · Immediate eviction</h3>
                <p className={P_CLASS}>
                  Three Ponds Estate reserves the right to terminate your
                  booking and require you to vacate the premises immediately
                  if you, your children, or your guests breach any part of
                  these Terms and Conditions.
                </p>

                <h3 className={SUB_H_CLASS}>11.2 · Forfeiture of funds</h3>
                <p className={P_CLASS}>
                  In the event of eviction due to a breach, you will forfeit
                  the full amount of your booking. Three Ponds Estate will
                  not be held liable for any alternative accommodation costs,
                  travel expenses, or consequential damages.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Contact &amp; related policies</h2>
                <p className={P_CLASS}>
                  Questions about these terms? Email{" "}
                  <a
                    href="mailto:info@threepondsestate.com"
                    className="text-corten hover:underline"
                  >
                    info@threepondsestate.com
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+61403433300"
                    className="text-corten hover:underline"
                  >
                    0403 433 300
                  </a>
                  . See also our{" "}
                  <Link href="/privacy" className="text-corten hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/cookies" className="text-corten hover:underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </article>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

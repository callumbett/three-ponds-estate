import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Three Ponds Estate collects, uses, discloses, and protects personal information from website visitors, guests, and enquiries.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: "https://threepondsestate.com/privacy",
    title: "Privacy Policy · Three Ponds Estate",
    description:
      "How Three Ponds Estate collects, uses, discloses, and protects personal information from website visitors, guests, and enquiries.",
  },
};

const SECTION_CLASS = "mt-12 first:mt-0";
const H_CLASS = "font-serif text-2xl text-charcoal sm:text-3xl";
const SUB_H_CLASS =
  "mt-6 font-serif text-base font-medium text-charcoal sm:text-lg";
const P_CLASS = "mt-3 text-base leading-relaxed text-charcoal-soft";
const LIST_CLASS =
  "mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-charcoal-soft marker:text-corten/70";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Legal</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
              This policy explains how Three Ponds Estate collects, uses,
              discloses, and protects your personal data, and the choices you
              can make regarding your information.
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
          {/*
           * No outer MotionReveal around the article body — the article
           * is much taller than the viewport, and MotionReveal's
           * `viewport={{ amount: 0.2 }}` requirement (20% of the wrapped
           * element must be in view) can never be met for a multi-page
           * legal document. The result is a stuck `opacity: 0` and a
           * blank page after the title. The intro section above keeps
           * its own MotionReveal — that one's short enough to trigger.
           */}
          <article>
              {/* 1. Introduction */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>1 · Introduction</h2>
                <p className={P_CLASS}>
                  This Privacy Policy explains how Three Ponds Estate (
                  &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
                  collects, uses, discloses, and protects your personal data,
                  and the choices you can make regarding your information.
                </p>
                <p className={P_CLASS}>
                  We respect your privacy and are committed to protecting the
                  confidentiality and security of the personal data you
                  provide to us when using our website, booking platform,
                  social media pages, or when communicating with us via phone
                  or email (collectively, the &ldquo;Services&rdquo;). By
                  making a reservation or using our Services, you consent to
                  the terms of this Privacy Policy.
                </p>
              </div>

              {/* 2. Personal Information We Collect */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  2 · Personal information we collect
                </h2>
                <p className={P_CLASS}>
                  We collect information that identifies you or relates to
                  you as an identifiable person.
                </p>

                <h3 className={SUB_H_CLASS}>
                  Information you provide voluntarily
                </h3>
                <ul className={LIST_CLASS}>
                  <li>
                    Name, contact details (email address, telephone number,
                    and postal address).
                  </li>
                  <li>
                    Payment details (credit / debit card number, expiration
                    date, and security code) to process bookings.
                  </li>
                  <li>
                    Stay preferences and details, including arrival /
                    departure dates, number of guests, and the ages of any
                    accompanying children.
                  </li>
                  <li>
                    Special requests or accessibility requirements (e.g.
                    health or mobility details you voluntarily share so we
                    can accommodate your stay).
                  </li>
                </ul>

                <h3 className={SUB_H_CLASS}>
                  Information collected automatically
                </h3>
                <ul className={LIST_CLASS}>
                  <li>
                    <strong className="text-charcoal">
                      Website analytics:
                    </strong>{" "}
                    when you visit our website, our system may automatically
                    log generic, non-identifiable data such as your IP
                    address, browser type, access times, and the pages you
                    visit. This helps us understand website traffic and
                    improve our user experience.
                  </li>
                  <li>
                    <strong className="text-charcoal">Cookies:</strong> we
                    use basic cookies to ensure our website functions
                    correctly and to remember your preferences. You can
                    adjust your browser settings to refuse cookies, though
                    some website features may become unavailable.
                  </li>
                </ul>
              </div>

              {/* 3. How We Use Your Information */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>3 · How we use your information</h2>
                <p className={P_CLASS}>
                  We use your personal information strictly for legitimate
                  business purposes, including:
                </p>
                <ul className={LIST_CLASS}>
                  <li>
                    Processing, confirming, and managing your bookings and
                    payments.
                  </li>
                  <li>
                    Communicating operational updates, check-in instructions,
                    and responding to your enquiries.
                  </li>
                  <li>
                    Providing for the safety and security of our guests,
                    staff, and property (including the use of outdoor CCTV).
                  </li>
                  <li>
                    Sending occasional promotional offers or guest surveys if
                    you have opted in to receive marketing communications.
                  </li>
                  <li>
                    Meeting our legal, regulatory, and tax obligations.
                  </li>
                </ul>
              </div>

              {/* 4. CCTV and Security Monitoring */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>4 · CCTV &amp; security monitoring</h2>

                <h3 className={SUB_H_CLASS}>4.1 · Purpose</h3>
                <p className={P_CLASS}>
                  For the protection, safety, and security of our guests,
                  staff, and physical property, Closed-Circuit Television
                  (CCTV) cameras are positioned externally outside each pod
                  to monitor entry thresholds, driveways, and communal
                  grounds.
                </p>

                <h3 className={SUB_H_CLASS}>4.2 · Privacy protection</h3>
                <p className={P_CLASS}>
                  In accordance with Australian privacy guidelines, no
                  cameras are located inside the accommodation pods.
                </p>

                <h3 className={SUB_H_CLASS}>4.3 · Data retention &amp; access</h3>
                <p className={P_CLASS}>
                  CCTV footage is recorded securely and automatically
                  overwritten on a rolling basis. Footage is strictly
                  confidential and will only be accessed or reviewed by
                  Management in the event of a security incident, suspected
                  illegal activity, property damage, or a clear breach of
                  our Terms and Conditions. Footage may be shared with law
                  enforcement authorities if required by law.
                </p>
              </div>

              {/* 5. Disclosing Your Information */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>5 · Disclosing your information</h2>
                <p className={P_CLASS}>
                  We do not sell, rent, or trade your personal information.
                  Your data is only shared with third parties under the
                  following strict conditions:
                </p>
                <ul className={LIST_CLASS}>
                  <li>
                    <strong className="text-charcoal">
                      Service providers:
                    </strong>{" "}
                    trusted third-party platforms who assist us in running
                    our business, such as our property management system,
                    secure payment gateways, and email distribution tools.
                    These providers are contractually required to keep your
                    data secure.
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Legal requirements:
                    </strong>{" "}
                    if required to do so by law, court order, or government
                    regulation (e.g. assisting police investigations).
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Property protection:
                    </strong>{" "}
                    if necessary to enforce our Terms and Conditions,
                    investigate potential violations, or protect the safety
                    and rights of Three Ponds Estate, our guests, or the
                    public.
                  </li>
                </ul>
              </div>

              {/* 6. Data Security */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>6 · Data security</h2>
                <p className={P_CLASS}>
                  We take all reasonable technical and administrative
                  precautions to protect your personal information from
                  loss, misuse, unauthorised access, or alteration. However,
                  please note that no data transmission over the internet
                  can be guaranteed as 100% secure. You are responsible for
                  ensuring the security of the devices you use to communicate
                  with us.
                </p>
              </div>

              {/* 7. Managing Your Privacy & Marketing Opt-Out */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  7 · Managing your privacy &amp; marketing opt-out
                </h2>
                <ul className={LIST_CLASS}>
                  <li>
                    You are not required to provide your personal data, but
                    failing to do so will mean we cannot process your
                    booking.
                  </li>
                  <li>
                    If you receive promotional emails from us, you can opt
                    out at any time by clicking the &ldquo;unsubscribe&rdquo;
                    link at the bottom of the email. Even if you unsubscribe
                    from marketing, you will still receive operational
                    emails regarding your bookings.
                  </li>
                </ul>
              </div>

              {/* 8. Accessing and Correcting Your Information */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>
                  8 · Accessing &amp; correcting your information
                </h2>
                <p className={P_CLASS}>
                  You have the right to request access to the personal
                  information we hold about you, or to request that we
                  correct any inaccuracies. To make a request, please contact
                  us using the details provided below.
                </p>
              </div>

              {/* 9. Children's Privacy */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>9 · Children&rsquo;s privacy</h2>
                <p className={P_CLASS}>
                  We do not knowingly collect personal information directly
                  from children under the age of 18. Information regarding
                  children is only collected via their parent or legal
                  guardian as part of the booking registration process.
                </p>
              </div>

              {/* 10. Retention of Information */}
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>10 · Retention of information</h2>
                <p className={P_CLASS}>
                  We only retain your personal data for as long as necessary
                  to fulfill the purposes for which it was collected, or to
                  satisfy legal, accounting, and tax reporting requirements.
                  When no longer required, data is securely destroyed or
                  anonymised.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Contact &amp; related policies</h2>
                <p className={P_CLASS}>
                  Privacy questions go to{" "}
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
                  <Link href="/terms" className="text-corten hover:underline">
                    Terms &amp; Conditions
                  </Link>
                  .
                </p>
              </div>
          </article>
        </div>
      </section>
    </>
  );
}

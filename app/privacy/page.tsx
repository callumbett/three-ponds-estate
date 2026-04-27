import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Three Ponds Estate handles personal information collected through bookings, enquiries, and the website.",
};

const SECTION_CLASS = "mt-10 first:mt-0";
const H_CLASS = "font-serif text-2xl text-charcoal sm:text-3xl";
const P_CLASS = "mt-4 text-base leading-relaxed text-charcoal-soft";

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
              We collect only the information we need to host your stay. This
              policy explains what we collect, how we use it, and your rights
              under Australian privacy law.
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
            <article>
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Who we are</h2>
                <p className={P_CLASS}>
                  Three Ponds Estate is a boutique accommodation business
                  located at 79 Airport Street, Temora, NSW 2666, Australia.
                  Throughout this policy, "we", "us", and "our" refer to
                  Three Ponds Estate.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>What we collect</h2>
                <p className={P_CLASS}>
                  When you make a booking or send an enquiry, we collect: your
                  name, email, phone number, payment details (handled by our
                  reservations provider), and the dates and pod relevant to
                  your stay. When you visit the website, we may also collect
                  basic technical information — IP address, browser type,
                  device, and pages viewed — to help us understand how the
                  site is used.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>How we use it</h2>
                <p className={P_CLASS}>
                  Your information is used to confirm and host your booking,
                  respond to enquiries, comply with our legal obligations, and
                  improve the way the site works. We do not sell or rent your
                  personal information to third parties.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Sharing</h2>
                <p className={P_CLASS}>
                  We share information only with service providers who help us
                  run the business — payment processors, our reservations
                  engine (Little Hotelier), email and analytics providers — and
                  only the minimum needed for them to perform their function.
                  Each is bound by their own privacy obligations.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Cookies &amp; analytics</h2>
                <p className={P_CLASS}>
                  The website uses cookies for basic functionality and may use
                  analytics tools to understand site usage. See our{" "}
                  <Link href="/cookies" className="text-corten hover:underline">
                    Cookie Policy
                  </Link>{" "}
                  for details, including how to opt out.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Your rights</h2>
                <p className={P_CLASS}>
                  Under the Australian Privacy Act, you have the right to ask
                  what personal information we hold about you, to correct it,
                  and to ask us to delete it (subject to our legal obligations
                  to retain certain records). To exercise any of these rights,
                  email{" "}
                  <a href="mailto:info@threepondsestate.com" className="text-corten hover:underline">
                    info@threepondsestate.com
                  </a>.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Retention</h2>
                <p className={P_CLASS}>
                  Booking and enquiry records are kept for as long as required
                  by tax, accounting, and consumer-law obligations, then
                  securely deleted.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Contact</h2>
                <p className={P_CLASS}>
                  Privacy questions go to{" "}
                  <a href="mailto:info@threepondsestate.com" className="text-corten hover:underline">
                    info@threepondsestate.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+61403433300" className="text-corten hover:underline">0403 433 300</a>.
                </p>
              </div>

              <p className={`${P_CLASS} mt-12 text-xs italic text-charcoal-soft/70`}>
                This policy is provided as a starting template. Three Ponds
                Estate recommends reviewing it with legal counsel before
                relying on it.
              </p>
            </article>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import { Booking } from "@/components/booking";
import MotionReveal from "@/components/MotionReveal";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Book Three Ponds Estate directly via the Little Hotelier engine, or send a quiet enquiry to Mark and Gillian.",
  alternates: { canonical: "/contact" },
  openGraph: buildOpenGraph({
    path: "/contact",
    title: "Contact & Book · Three Ponds Estate",
    description:
      "Book Three Ponds Estate directly via the Little Hotelier engine, or send a quiet enquiry to Mark and Gillian.",
  }),
};

export default function ContactPage() {
  return (
    <>
      {/* Page masthead — editorial language to match Hero / Explore */}
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <p className="metadata">Contact &amp; Book</p>
            <span
              aria-hidden
              className="mt-5 mb-6 block h-px w-12 bg-corten"
            />
            <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-7xl">
              Two ways<br />to begin.
            </h1>
            <p className="mt-6 max-w-xl font-serif italic text-lg leading-snug text-charcoal-soft sm:text-xl">
              Book directly through our reservations engine for instant
              confirmation, or send a quiet note and we&apos;ll be in touch.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Two columns — book direct on the left, enquiry on the right */}
      <section className="bg-parchment pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20">
          {/* Book direct — slim editorial panel */}
          <MotionReveal className="lg:col-span-5">
            <div className="border-t border-line pt-10">
              <p className="metadata">01 · Book direct</p>
              <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-[-0.015em] sm:text-4xl">
                Live availability for all three pods.
              </h2>
              <p className="prose-body mt-5">
                Direct rates from <strong className="text-charcoal">AU$239 / night</strong>,
                with 5% off two-night stays and 10% off three or more.
                No check-out on Saturdays. Best-rate guarantee versus
                third-party channels.
              </p>
              <div className="mt-8">
                <Booking.PrimaryTrigger label="Open booking" />
              </div>

              {/* The practical details — address / email / phone / check-in */}
              <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2">
                <div>
                  <dt className="metadata">Address</dt>
                  <dd className="mt-3 text-base leading-relaxed text-charcoal-soft">
                    79 Airport Street
                    <br />
                    Temora, NSW 2666
                    <br />
                    <span className="text-charcoal-soft/75">
                      (500 m from the Aviation Museum)
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="metadata">Email</dt>
                  <dd className="mt-3 text-base text-charcoal-soft">
                    <a
                      href="mailto:info@threepondsestate.com"
                      className="text-charcoal transition-colors duration-150 hover:text-corten"
                    >
                      info@threepondsestate.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="metadata">Phone</dt>
                  <dd className="mt-3 text-base text-charcoal-soft">
                    <a
                      href="tel:+61403433300"
                      className="text-charcoal transition-colors duration-150 hover:text-corten"
                    >
                      0403 433 300
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="metadata">Check-in / out</dt>
                  <dd className="mt-3 text-base leading-relaxed text-charcoal-soft">
                    From 2pm
                    <br />
                    By 10am
                    <br />
                    <span className="text-charcoal-soft/75">
                      (no Saturday check-outs)
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </MotionReveal>

          {/* Or reach us directly */}
          <MotionReveal delay={0.1} className="lg:col-span-7">
            <div className="border-t border-line pt-10">
              <p className="metadata">02 · Or reach us directly</p>
              <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-[-0.015em] sm:text-4xl">
                Prefer to talk it<br />through first?
              </h2>
              <p className="prose-body mt-5 max-w-md">
                Tell us about your trip — your dates, which pod, and anything
                you&apos;d like to know. We read every message and reply
                personally, usually within a day.
              </p>
              <dl className="mt-10 space-y-8">
                <div>
                  <dt className="metadata">Email</dt>
                  <dd className="mt-3 text-lg">
                    <a
                      href="mailto:info@threepondsestate.com"
                      className="text-charcoal transition-colors duration-150 hover:text-corten"
                    >
                      info@threepondsestate.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="metadata">Phone</dt>
                  <dd className="mt-3 text-lg">
                    <a
                      href="tel:+61403433300"
                      className="text-charcoal transition-colors duration-150 hover:text-corten"
                    >
                      0403 433 300
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* A signed note from the owners — gives the page warmth */}
      <section className="bg-parchment-deep py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <MotionReveal>
            <p className="metadata">A note from the hosts</p>
            <p className="mt-8 font-serif text-2xl italic leading-relaxed text-charcoal sm:text-3xl">
              We built three quiet rooms on land we already loved.
              Whether you book direct or send a note, we&apos;ll do
              everything we can to make the country feel yours for the
              weekend.
            </p>
            <p className="mt-8 font-serif text-base text-charcoal-soft sm:text-lg">
              — Mark &amp; Gillian
            </p>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

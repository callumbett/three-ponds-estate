import type { Metadata } from "next";
import { Booking } from "@/components/booking";
import EnquiryForm from "@/components/EnquiryForm";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Book Three Ponds Estate directly via the Little Hotelier engine, or send a quiet enquiry. Mark and Gillian usually reply within the hour.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Contact &amp; Book</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
              Two ways to begin.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-soft">
              Book directly through our reservations engine for instant
              confirmation, or send a quiet note and we&apos;ll be in touch.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Two-column: book direct + enquiry */}
      <section className="bg-parchment pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12">
          <MotionReveal className="lg:col-span-5">
            <div className="rounded-sm border border-line bg-parchment-deep p-10">
              <p className="eyebrow">Book direct</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight">
                Live availability for all three pods.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-charcoal-soft">
                Direct rates from AU$230 / night. No check-out on Saturdays.
                Best-rate guarantee versus third-party channels.
              </p>
              <div className="mt-8">
                <Booking.PrimaryTrigger label="Open booking" />
              </div>

              <div className="mt-10 space-y-5 border-t border-line pt-8 text-sm text-charcoal-soft">
                <div>
                  <p className="eyebrow">Address</p>
                  <p className="mt-2">
                    79 Airport Street
                    <br />
                    Temora, NSW 2666
                    <br />
                    (opposite the Aviation Museum)
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Email</p>
                  <a
                    href="mailto:info@threepondsestate.com"
                    className="mt-2 block text-charcoal hover:text-corten"
                  >
                    info@threepondsestate.com
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Phone</p>
                  <a
                    href="tel:+61403433300"
                    className="mt-2 block text-charcoal hover:text-corten"
                  >
                    0403 433 300
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Check-in &amp; check-out</p>
                  <p className="mt-2">
                    Private check-in from 2pm. Check-out by 10am.
                    No check-outs on Saturdays.
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="lg:col-span-7">
            <p className="eyebrow">Or send a note</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight">
              Tell us a little about your trip.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal-soft">
              Mark or Gillian will reply, usually within the hour during the
              day.
            </p>
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

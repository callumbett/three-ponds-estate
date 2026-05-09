import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Frequently Asked",
  description:
    "Common questions about staying at Three Ponds Estate — check-in, parking, pets, breakfast, the surrounding region and more.",
};

type Group = {
  group: string;
  items: { q: string; a: string }[];
};

const faqs: Group[] = [
  {
    group: "Getting here & checking in",
    items: [
      {
        q: "Where exactly is Three Ponds Estate?",
        a: "We're at 79 Airport Street, Temora NSW 2666 — 500 m from the Temora Aviation Museum and roughly three minutes by car from the heart of town. From Sydney, it's a four-and-a-half-hour drive (via Cowra and Young). From Canberra, around three and a half hours. Wagga Wagga's airport is the closest commercial option — about 75 minutes by road.",
      },
      {
        q: "What time can I check in?",
        a: "Private check-in is from 2 pm. We send check-in instructions and the gate code by SMS the morning of arrival, so you can let yourself in whenever you're ready after 2 pm — no front-desk wait, no key collection.",
      },
      {
        q: "And check-out?",
        a: "By 10 am. Late check-out can sometimes be arranged depending on the next booking — just ask a day or two ahead.",
      },
      {
        q: "Is there a no-Saturday-checkout policy?",
        a: "Yes — we don't accept check-outs on Saturdays. Most stays are Friday-to-Sunday or Sunday-to-Friday, which lets us do a thorough mid-week reset.",
      },
      {
        q: "Where do I park?",
        a: "Each pod has its own private parking space directly out front. No shared lot, no walking with luggage.",
      },
    ],
  },
  {
    group: "The pods",
    items: [
      {
        q: "How are the three pods different?",
        a: "All three open east for sunrise, and all three share the fire pit, BBQ, and the same wide horizon. The Ophir is a one-bedroom, sleeps two, Hamptons-minimal in feel — best for couples. The Felix and Uphaz are two-bedroom Scandi-barn-style pods, each sleeping four, with both an east-facing deck for the morning AND a north-facing deck for the long late-afternoon light.",
      },
      {
        q: "Are the pods family-friendly?",
        a: "Yes — the Felix and Uphaz comfortably sleep families of up to four, with two queen rooms and a shared open living/kitchen volume. The Ophir is one bedroom and best suited to couples or solo travellers.",
      },
      {
        q: "Are the pods accessible?",
        a: "There are a small number of steps onto each deck, and the bathroom doors aren't wheelchair-width. If you have specific accessibility needs, please email us before booking and we'll be honest about what works and what doesn't.",
      },
      {
        q: "What's the bathroom like?",
        a: "Modern, full-height tiled, with 800 gsm Turkish cotton towels and quiet bath products from a local Australian maker.",
      },
      {
        q: "Is there a kitchen?",
        a: "Each pod has a fully equipped kitchen — Smeg and Artusi appliances, full cookware, glassware, and the basics (oil, salt, pepper, condiments). Bring your own groceries; the IGA in town stocks everything you'd expect.",
      },
    ],
  },
  {
    group: "What's included",
    items: [
      {
        q: "Is breakfast provided?",
        a: "We don't run an in-house breakfast service, but we leave a small welcome basket on arrival — local sourdough, jam, and tea/coffee — to get the first morning started. After that, the kitchen is yours.",
      },
      {
        q: "Is there Wi-Fi?",
        a: "Yes, fast Wi-Fi in all three pods. Strong enough for a video meeting if you need to take one — though most guests come here to stop taking them.",
      },
      {
        q: "Linen and towels?",
        a: "All linen, bath towels (800 gsm Turkish cotton), and a hair-dryer are provided. You don't need to bring any of that.",
      },
      {
        q: "Heating and cooling?",
        a: "Reverse-cycle climate control in every pod. Riverina summers can be hot and winters cool — both are well-handled.",
      },
    ],
  },
  {
    group: "Bookings & policies",
    items: [
      {
        q: "What's your cancellation policy?",
        a: "Cancellations more than 14 days before check-in receive a full refund less any third-party payment fees. Within 14 days, the booking is non-refundable unless we can re-let the dates. See the Terms & Conditions for the full version.",
      },
      {
        q: "Can I book directly to avoid OTA commission?",
        a: "Yes — direct bookings via this site are the same rate (or better) than Airbnb / Booking.com without their commission. Use the Book Now button anywhere on the site, or email info@threepondsestate.com for help.",
      },
      {
        q: "Do you offer gift vouchers?",
        a: "Email us at info@threepondsestate.com — we'll arrange a custom voucher for the value or stay length you'd like.",
      },
      {
        q: "Are pets allowed?",
        a: "We're not currently set up for pets. If you'd like to bring one, please email us before booking — there are some exceptions for very well-trained dogs, by prior arrangement.",
      },
      {
        q: "Are events or parties OK?",
        a: "The pods are designed for quiet stays. Day visitors who aren't staying overnight need to be cleared with us in advance, and the property isn't suited to weddings, large gatherings, or parties.",
      },
    ],
  },
  {
    group: "The region",
    items: [
      {
        q: "What's worth doing nearby?",
        a: "The Temora Aviation Museum is 500 m away — one of the world's finest collections of flying warbirds. Lake Centenary is 1.8 km north for swimming, walking, fishing, and (across multiple weekends each year) the V8 Superboat Championships. The Canola Trail in spring is unforgettable. See our Explore page for the full list.",
      },
      {
        q: "When's the best time of year to visit?",
        a: "Spring (August–October) is canola season — fields of yellow stretching to the horizon. Summer is long, warm evenings on the deck. Autumn is crisp and golden. Winter has the shortest days and the longest fires. Each has its own thing.",
      },
      {
        q: "Is there phone signal?",
        a: "Yes — all major Australian carriers reach the property reliably.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Frequently asked</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              The questions we hear most.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
              If you don&apos;t see your question below, just{" "}
              <a
                href="mailto:info@threepondsestate.com"
                className="text-corten hover:underline"
              >
                send us a note
              </a>{" "}
              or call{" "}
              <a
                href="tel:+61403433300"
                className="text-corten hover:underline"
              >
                0403 433 300
              </a>
              . Mark or Gillian will reply, usually within the hour during the
              day.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          {faqs.map((group, gi) => {
            const groupNumber = String(gi + 1).padStart(2, "0");
            const total = String(faqs.length).padStart(2, "0");

            return (
              <MotionReveal key={group.group} delay={gi * 0.05}>
                <div className="mt-24 first:mt-0">
                  {/* Chapter kicker — corten metadata + corten hairline,
                      gives each group a clear editorial header that
                      lifts off the parchment. */}
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-corten"
                    />
                    <p className="metadata text-corten">
                      {groupNumber} / {total}
                    </p>
                  </div>
                  <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-[-0.015em] text-charcoal sm:text-4xl">
                    {group.group}
                  </h2>

                  <div className="mt-10">
                    {group.items.map((item, i) => {
                      const itemNumber = String(i + 1).padStart(2, "0");
                      return (
                        <details
                          key={i}
                          className="group border-t border-line py-7 transition-colors duration-200 ease-out last:border-b open:bg-parchment-deep/30"
                        >
                          <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                            {/* Numbered question — corten chapter mark
                                pulls the eye to each row. */}
                            <span className="flex flex-1 items-baseline gap-4 sm:gap-5">
                              <span className="metadata shrink-0 pt-1 text-corten">
                                {itemNumber}
                              </span>
                              <h3 className="font-serif text-lg leading-snug text-charcoal transition-colors duration-150 group-hover:text-corten sm:text-xl">
                                {item.q}
                              </h3>
                            </span>
                            <span
                              aria-hidden
                              className="mt-1 shrink-0 text-charcoal-soft/60 transition-transform duration-300 ease-out group-open:rotate-45"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path
                                  d="M12 5v14M5 12h14"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                          </summary>
                          {/* Indent the answer so it aligns under the
                              question text, not under the corten number. */}
                          <p className="prose-body mt-4 pl-9 sm:pl-10">
                            {item.a}
                          </p>
                        </details>
                      );
                    })}
                  </div>
                </div>
              </MotionReveal>
            );
          })}

          {/* CTA — back to booking */}
          <MotionReveal>
            <div className="mt-24 border-t border-line pt-12">
              <p className="eyebrow">Ready when you are</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight">
                Pick a pod, pick a weekend.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft">
                Direct rates from AU$230 / night. No check-out on Saturdays.
              </p>
              <div className="mt-6">
                <Link
                  href="/stay"
                  className="inline-flex items-center gap-2 text-sm font-medium text-corten transition-all hover:gap-3"
                >
                  See the three pods
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

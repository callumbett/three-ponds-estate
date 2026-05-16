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
        a: "We're at 79 Airport Street, Temora NSW 2666 — 500 m from the Temora Aviation Museum and roughly three minutes by car from the heart of town. From Sydney, it's a four and a half hour drive. From Canberra, around three and a half hours. Wagga Wagga's airport is the closest commercial option — about 75 minutes by road. Or — if you're flying private — Temora airport is walking distance from the property.",
      },
      {
        q: "What are the check-in and check-out times?",
        a: "Check-in is from 2 pm, and check-out by 10 am. We send check-in instructions prior to arrival so you can let yourself in whenever you're ready after 2 pm — no front-desk wait, no key collection.",
      },
      {
        q: "Is there a no-Saturday-checkout policy?",
        a: "Yes — we don't accept Saturday check-outs.",
      },
      {
        q: "Where do I park?",
        a: "Each pod has its own parking space directly out front. No shared lot, no walking with luggage.",
      },
    ],
  },
  {
    group: "The pods",
    items: [
      {
        q: "How are the three pods different?",
        a: "All three open east for sunrise, and all three share the fire pit, BBQ, and the same wide horizon. The Ophir is a one-bedroom, sleeps two, Hamptons-minimal in feel. The Felix and Uphaz are two-bedroom Scandi-style pods, each sleeping four — well suited to anyone wanting a roomier feel, whether that's a family, friends, or a couple after more space. Both add a north-facing deck for the long late-afternoon light alongside the east-facing morning deck.",
      },
      {
        q: "Are the pods family-friendly?",
        a: "Yes — the Felix and Uphaz comfortably sleep families of up to four, with two queen rooms and a shared open living/kitchen volume. The Ophir is one bedroom and best suited to couples or solo travellers.",
      },
      {
        q: "Are the pods accessible?",
        a: "There are a small number of steps onto each deck. If you have specific accessibility needs, please email us before booking and we'll be honest about what works and what doesn't.",
      },
      {
        q: "Is there a kitchen?",
        a: "Each pod has a fully equipped kitchen — Smeg and Artusi appliances, full cookware, glassware, and the basics (oil, salt, pepper, condiments). Bring your own groceries; the IGA and Woolworths in town stock everything you'd expect.",
      },
    ],
  },
  {
    group: "What's included",
    items: [
      {
        q: "Is there Wi-Fi?",
        a: "Yes, fast Wi-Fi in all three pods. Strong enough for a video meeting if you need to take one — though most guests come here to stop taking them.",
      },
      {
        q: "Linen and towels?",
        a: "All linen, bath towels, and a hair-dryer are provided. You don't need to bring any of that.",
      },
      {
        q: "Heating and cooling?",
        a: "Reverse-cycle climate control in the living area and bedrooms of every pod. Riverina summers can be hot and winters cool — both are well-handled.",
      },
    ],
  },
  {
    group: "Bookings & policies",
    items: [
      {
        q: "What's your cancellation policy?",
        a: "Full refund for cancellations made five or more days before check-in. Non-refundable inside that window. See the Terms & Conditions for the full version.",
      },
      {
        q: "How can I get the cheapest rate?",
        a: "Book direct. Our website is always the cheapest option over third parties like Airbnb. Use the Book Now button anywhere on the site, or email info@threepondsestate.com.",
      },
      {
        q: "Do you offer gift vouchers?",
        a: "Email us at info@threepondsestate.com — we'll arrange a custom voucher for the value or stay length you'd like.",
      },
      {
        q: "Are pets allowed?",
        a: "No — pets aren't permitted at the property.",
      },
      {
        q: "Are events or parties OK?",
        a: "The pods are designed for quiet stays. For events, please email info@threepondsestate.com.",
      },
    ],
  },
  {
    group: "The region",
    items: [
      {
        q: "What's worth doing nearby?",
        a: "The Temora Aviation Museum is 500 m away — one of the world's finest collections of flying warbirds. Lake Centenary is 1.8 km north for swimming, walking, fishing, and the V8 Superboat Championships. The Canola Trail in spring is unforgettable. See our Explore page for the full list.",
      },
      {
        q: "When's the best time of year to visit?",
        a: "Spring (August–September) is canola season — fields of yellow stretching to the horizon. Summer is long, warm evenings on the deck. Autumn is crisp and golden. Winter has the shortest days and the longest fires. Each has its own thing.",
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
              .
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          {faqs.map((group, gi) => (
            <MotionReveal key={group.group} delay={gi * 0.05}>
              <div className="mt-24 first:mt-0">
                {/* Section header — short corten hairline + serif title.
                    Gives each group a clear visual lift off the
                    parchment without the chapter numbering. */}
                <span
                  aria-hidden
                  className="block h-px w-12 bg-corten"
                />
                <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-[-0.015em] text-charcoal sm:text-4xl">
                  {group.group}
                </h2>

                <div className="mt-10">
                  {group.items.map((item, i) => (
                    <details
                      key={i}
                      className="group border-t border-line py-7 transition-colors duration-200 ease-out last:border-b open:bg-parchment-deep/30"
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="flex-1 font-serif text-lg leading-snug text-charcoal transition-colors duration-150 group-hover:text-corten sm:text-xl">
                          {item.q}
                        </h3>
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
                      <p className="prose-body mt-4">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}

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

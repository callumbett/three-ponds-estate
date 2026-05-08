import Image from "next/image";
import MotionReveal from "./MotionReveal";
import SectionEyebrow from "./SectionEyebrow";

/**
 * Aggregated trust indicators — one card per channel.
 *
 * Update `platforms` below as new reviews come in. Each card links to
 * the actual review page so visitors can verify.
 *
 * Optional `logoSrc` lets each card show the platform's official logo
 * above the rating. Drop logos into public/images/reviews/ and set the
 * path here. Cards without a logo render the platform name in text
 * (the existing fallback).
 */
type Platform = {
  name: string;
  rating: string;
  scale: string;
  reviewCount: number | null;
  href: string;
  logoSrc?: string;
  logoAlt?: string;
};

const platforms: Platform[] = [
  {
    name: "Google",
    rating: "5.0",
    scale: "/ 5",
    reviewCount: 113,
    href: "https://www.google.com/maps/place/Three+Ponds+Estate/@-34.4240369,147.5172122,17z/data=!4m9!3m8!1s0x6b190f1eb6a813fb:0x684a709a0169c2cb!5m2!4m1!1i2!8m2!3d-34.4240369!4d147.5197925!16s%2Fg%2F11kjg1t5lz",
    logoSrc: "/images/reviews/G%20logo.png",
    logoAlt: "Google",
  },
  {
    name: "Airbnb",
    rating: "4.97",
    scale: "/ 5",
    reviewCount: 140,
    href: "https://www.airbnb.com.au/users/profile/1470287728197379560",
    logoSrc: "/images/reviews/airbnb-2-logo-png-transparent.png",
    logoAlt: "Airbnb",
  },
  {
    name: "Booking.com",
    rating: "9.6",
    scale: "/ 10",
    reviewCount: 130,
    href: "https://www.booking.com/hotel/au/three-ponds-estate-temora.en-gb.html",
    logoSrc: "/images/reviews/booking.com-logo.png",
    logoAlt: "Booking.com",
  },
];

const FilledStar = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.4l2.95 6.18 6.8.62-5.16 4.62 1.55 6.66L12 16.95l-6.14 3.53 1.55-6.66L2.25 9.2l6.8-.62L12 2.4z" />
  </svg>
);

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Reviews() {
  return (
    <section className="bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow>Reviews</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            113 five-star reviews on Google,<br />
            a consistent five everywhere else.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-soft">
            Quietly accumulated across Google, Airbnb, and Booking.com.
            Every rating below is live — read them all.
          </p>
        </div>

        {/*
         * Three-card panel. The 1px hairlines between cards are produced
         * by `gap-px` over a line-coloured backdrop; each card paints its
         * own parchment background back over the gap so only the seams
         * show as hairlines.
         */}
        <div className="mt-16 grid overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3 md:gap-px">
          {platforms.map((p, i) => {
            const isPlaceholder = p.href === "#";
            const Wrapper = isPlaceholder ? "div" : "a";
            const wrapperProps = isPlaceholder
              ? {}
              : {
                  href: p.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `Read ${p.reviewCount ?? "all"} reviews on ${p.name}`,
                };

            return (
              <MotionReveal key={p.name} delay={i * 0.08}>
                <Wrapper
                  {...wrapperProps}
                  className="group relative flex h-full flex-col bg-parchment p-10 transition-colors duration-200 ease-out hover:bg-parchment-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:-outline-offset-2"
                >
                  {/* Platform identity — logo if supplied, otherwise name */}
                  {p.logoSrc ? (
                    <div className="relative h-10 w-40">
                      <Image
                        src={p.logoSrc}
                        alt={p.logoAlt ?? p.name}
                        fill
                        sizes="160px"
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <p className="metadata text-charcoal-soft">{p.name}</p>
                  )}

                  {/* Five filled corten stars */}
                  <div className="mt-6 flex items-center gap-1 text-corten">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <FilledStar key={s} />
                    ))}
                  </div>

                  {/* Rating number — large serif */}
                  <p className="mt-6 font-serif text-6xl leading-none text-charcoal">
                    {p.rating}
                    <span className="ml-2 text-2xl text-charcoal-soft/55">
                      {p.scale}
                    </span>
                  </p>

                  {/* Review count */}
                  <p className="mt-5 text-sm text-charcoal-soft">
                    {p.reviewCount !== null
                      ? `${p.reviewCount} reviews`
                      : "Reviews counting…"}
                  </p>

                  {/* Read-on link — only when href is set */}
                  {!isPlaceholder && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-medium text-corten transition-all group-hover:gap-3">
                      Read on {p.name}
                      <Arrow />
                    </span>
                  )}
                </Wrapper>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

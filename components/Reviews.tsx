import MotionReveal from "./MotionReveal";
import SectionEyebrow from "./SectionEyebrow";

/**
 * Aggregated trust indicators — one card per channel.
 *
 * To keep this in sync with reality, just update the values in the
 * `platforms` array below as new reviews come in. Each card links to
 * the actual review page on that channel so visitors can verify.
 *
 * Notes on the rating field:
 *   - Use a string ("5.0", "4.97", "9.6") so trailing zeros render.
 *   - `scale` shows the denominator ("/ 5", "/ 10") in muted text.
 *
 * Set `href` to a real URL (e.g. the property's Google Maps listing,
 * the Airbnb listing, the Booking.com property page). The placeholder
 * `#` URLs render gracefully but should be replaced before launch.
 */
const platforms = [
  {
    name: "Google",
    rating: "5.0",
    scale: "/ 5",
    reviewCount: 113,
    href: "#", // TODO — Google Maps listing URL
  },
  {
    name: "Airbnb",
    rating: "5.0",
    scale: "/ 5",
    reviewCount: null, // TODO — fill in your Airbnb review count
    href: "#", // TODO — Airbnb listing URL
  },
  {
    name: "Booking.com",
    rating: "9.6",
    scale: "/ 10",
    reviewCount: null, // TODO — fill in your Booking.com review count
    href: "#", // TODO — Booking.com property URL
  },
] as const;

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
    <section className="bg-charcoal py-24 text-parchment sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow className="text-parchment/80">Reviews</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-parchment sm:text-5xl">
            113 five-star reviews,<br />
            across every channel.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-parchment/75">
            A consistent record on Google, Airbnb, and Booking.com. Every
            rating below is live — read them all.
          </p>
        </div>

        {/*
         * Three-card panel. The 1px parchment hairlines between cards
         * are produced by `gap-px` over a parchment/10 backdrop; each
         * card paints its own charcoal background back over the gap so
         * only the seams show as hairlines.
         */}
        <div className="mt-16 grid overflow-hidden rounded-sm bg-parchment/10 md:grid-cols-3 md:gap-px">
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
                  className="group relative flex h-full flex-col bg-charcoal p-10 transition-colors duration-200 ease-out hover:bg-charcoal/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-parchment focus-visible:-outline-offset-2"
                >
                  <p className="metadata text-parchment/55">{p.name}</p>

                  {/* Five filled parchment stars */}
                  <div className="mt-6 flex items-center gap-1 text-parchment">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <FilledStar key={s} />
                    ))}
                  </div>

                  {/* Rating number — large serif */}
                  <p className="mt-6 font-serif text-6xl leading-none text-parchment">
                    {p.rating}
                    <span className="ml-2 text-2xl text-parchment/45">
                      {p.scale}
                    </span>
                  </p>

                  {/* Review count */}
                  <p className="mt-5 text-sm text-parchment/70">
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

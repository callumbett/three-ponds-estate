import type { Metadata } from "next";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";

export const metadata: Metadata = {
  title: "Explore the Region",
  description:
    "What's on the doorstep at Three Ponds Estate: the Temora Aviation Museum, Lake Centenary, the Canola Trail, the Temora pool and Temora town.",
};

type Place = {
  chapter: string;
  eyebrow: string;
  title: string;
  standfirst: string;
  body: string;
  bodyLink?: { href: string; label: string };
  image: string;
  alt: string;
  layout?: "image-right" | "image-left" | "full-bleed";
};

const places: Place[] = [
  {
    chapter: "01",
    eyebrow: "500 m away",
    title: "Temora Aviation Museum",
    standfirst:
      "One of the world's finest collections of flying warbirds — quietly, just across the road.",
    body:
      "Two of Australia's flying Spitfires. The only flying Lockheed Hudson on the planet. The oldest flying Tiger Moth in the country. Three full-motion simulators (Spitfire, Mustang, Kittyhawk) and the Guardhouse Café for breakfast and lunch.",
    image: "/images/explore/aviation-museum.JPG",
    alt: "The Temora Aviation Museum",
    layout: "full-bleed",
  },
  {
    chapter: "02",
    eyebrow: "1.8 km north",
    title: "Lake Centenary",
    standfirst:
      "A 2.7 km lake loop, picnic lawns, and the thunder of V8 Superboats across multiple weekends a year.",
    body:
      "Walking, swimming, fishing, kayaking. The dedicated Canola Walk starts here. The V8 Superboat Championships return on a published calendar — the rest of the year it's still and quiet again by Sunday afternoon.",
    bodyLink: {
      href: "https://www.v8superboats.com.au/calendar/",
      label: "See the V8 Superboats calendar",
    },
    image: "/images/explore/lake-centenary.jpg",
    alt: "Lake Centenary, Temora",
    layout: "image-left",
  },
  {
    chapter: "03",
    eyebrow: "August – October",
    title: "The Canola Trail",
    standfirst:
      "When spring lands, Yellow Bloom Road stops being a metaphor.",
    body:
      "The country around Temora turns gold for two months a year. Walk it from your front gate, drive it for the whole afternoon, photograph it from the deck. Hot-air balloon flights run during the bloom — sunrise lifts, gold underneath.",
    image: "/images/explore/hot-air-ballon.jpg",
    alt: "A hot-air balloon over the canola fields near Temora",
    layout: "full-bleed",
  },
  {
    chapter: "04",
    eyebrow: "In town",
    title: "Temora Pool",
    standfirst:
      "Lap lanes, grassed banks, and the unhurried country-summer ritual.",
    body:
      "A short drive from the estate, in the heart of Temora. Open through the warmer months. Pack a picnic, claim a patch of grass.",
    image: "/images/explore/temora-pool.JPG",
    alt: "Temora Pool",
    layout: "image-right",
  },
  {
    chapter: "05",
    eyebrow: "3 minutes by car",
    title: "Temora town",
    standfirst:
      "Heritage main street, country pubs, and the cafés we send guests to.",
    body:
      "What locals call the friendliest town in the state. The Guardhouse Café at the museum stays open daily, and there are a few good independent kitchens worth the short drive in.",
    image: "/images/explore/temora-1.webp",
    alt: "Temora town",
    layout: "image-left",
  },
];

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
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Editorial standfirst-and-body block, used by every layout variant. */
function PlaceCopy({ place }: { place: Place }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="font-serif text-5xl text-corten leading-none sm:text-6xl">
          {place.chapter}
        </span>
        <span className="metadata">{place.eyebrow}</span>
      </div>
      <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.015em] sm:text-5xl">
        {place.title}
      </h2>
      <p className="mt-5 font-serif italic text-lg leading-snug text-charcoal-soft sm:text-xl">
        {place.standfirst}
      </p>
      <p className="prose-body mt-6">{place.body}</p>
      {place.bodyLink ? (
        <a
          href={place.bodyLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-corten transition-all hover:gap-3"
        >
          {place.bodyLink.label}
          <Arrow />
        </a>
      ) : null}
    </>
  );
}

export default function ExplorePage() {
  return (
    <>
      {/* Page masthead — Hero-language editorial intro */}
      <section className="bg-parchment pt-48 pb-20 sm:pt-60 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <p className="metadata">The Region · Riverina · NSW</p>
            <span
              aria-hidden
              className="mt-5 mb-6 block h-px w-12 bg-corten"
            />
            <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-7xl">
              What&apos;s on<br />the doorstep.
            </h1>
            <p className="mt-6 max-w-xl font-serif italic text-lg leading-snug text-charcoal-soft sm:text-xl">
              The Riverina is a slower country. Five places we&apos;d point a
              guest to first — starting across the road and working outward.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* The five chapters */}
      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-7xl space-y-32 px-6 sm:px-10 sm:space-y-40">
          {places.map((place) => {
            const layout = place.layout ?? "image-right";

            if (layout === "full-bleed") {
              // Full-width image followed by centered editorial copy below.
              return (
                <MotionReveal key={place.title}>
                  <article>
                    <div className="relative -mx-6 aspect-[16/9] overflow-hidden bg-parchment-deep sm:-mx-10 md:mx-0 md:rounded-sm">
                      <Image
                        src={place.image}
                        alt={place.alt}
                        fill
                        sizes="(min-width: 1280px) 1280px, 100vw"
                        quality={85}
                        className="object-cover"
                      />
                    </div>
                    <div className="mx-auto mt-12 max-w-2xl">
                      <PlaceCopy place={place} />
                    </div>
                  </article>
                </MotionReveal>
              );
            }

            const reverse = layout === "image-left";
            return (
              <MotionReveal key={place.title}>
                <article className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
                  <div
                    className={[
                      "md:col-span-7",
                      reverse ? "md:order-2" : "",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-parchment-deep">
                      <Image
                        src={place.image}
                        alt={place.alt}
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        quality={85}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className={[
                      "md:col-span-5",
                      reverse ? "md:order-1" : "",
                    ].join(" ")}
                  >
                    <PlaceCopy place={place} />
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* Quiet closing — a soft CTA back to the estate */}
      <section className="bg-parchment-deep py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <MotionReveal>
            <p className="metadata">All distances from the estate gate</p>
            <p className="mt-6 font-serif text-2xl italic leading-snug text-charcoal sm:text-3xl">
              The country starts wide and stays that way.
              <br className="hidden sm:block" />
              Come and see.
            </p>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

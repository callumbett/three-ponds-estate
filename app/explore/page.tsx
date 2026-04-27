import type { Metadata } from "next";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Explore the Region",
  description:
    "What's on the doorstep at Three Ponds Estate: the Temora Aviation Museum, Lake Centenary, the Bundawarrah Centre, the Canola Trail and Temora town.",
};

type Place = {
  eyebrow: string;
  title: string;
  body: string;
  bodyLink?: { href: string; label: string };
  image: string;
  alt: string;
};

const places: Place[] = [
  {
    eyebrow: "500 m away",
    title: "Temora Aviation Museum",
    body: "One of the world's finest collections of flying warbirds — two of Australia's flying Spitfires, the only flying Lockheed Hudson, the oldest flying Tiger Moth in the country. Three full-motion simulators (Spitfire, Mustang, Kittyhawk) and the Guardhouse Café for breakfast and lunch.",
    image: "/images/explore/aviation-museum.JPG",
    alt: "The Temora Aviation Museum",
  },
  {
    eyebrow: "1.8 km north",
    title: "Lake Centenary",
    body:
      "A 2.7 km lake loop walking track, swimming, fishing, picnic lawns, and — across multiple weekends each year — the V8 Superboat Championships. The dedicated Canola Walk starts here.",
    bodyLink: {
      href: "https://www.v8superboats.com.au/calendar/",
      label: "See the V8 Superboats calendar",
    },
    image: "/images/explore/lake-centenary.jpg",
    alt: "Lake Centenary, Temora",
  },
  {
    eyebrow: "August – October",
    title: "The Canola Trail",
    body: "When spring arrives, the country around Temora turns gold. Yellow Bloom Road. A whole region painted in canola. Walk it from your front gate, drive it for the whole afternoon.",
    image: "/images/explore/hot-air-ballon.jpg",
    alt: "A hot-air balloon over the canola fields near Temora",
  },
  {
    eyebrow: "In town",
    title: "Temora Pool",
    body: "Grassed picnic banks, lap lanes, and the country-summer ritual of an afternoon swim. A short drive from the estate, in the heart of Temora.",
    image: "/images/explore/temora-pool.JPG",
    alt: "Temora Pool",
  },
  {
    eyebrow: "3 minutes by car",
    title: "Temora town",
    body: "Heritage main street, country pubs, a few good cafés, and what locals call the friendliest town in the state. The Guardhouse Café at the museum stays open daily.",
    image: "/images/explore/temora-1.webp",
    alt: "Temora town",
  },
];

export default function ExplorePage() {
  return (
    <>
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>The Region</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
              What&apos;s on the doorstep.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-soft">
              The Riverina is a slower country. Here are the places we&apos;d
              point a guest to first — starting across the road and working
              outward.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-7xl space-y-32 px-6 sm:px-10">
          {places.map((place, i) => {
            const reverse = i % 2 === 1;
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
                    <p className="eyebrow">{place.eyebrow}</p>
                    <h2 className="mt-4 font-serif text-4xl leading-tight">
                      {place.title}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
                      {place.body}
                    </p>
                    {place.bodyLink ? (
                      <a
                        href={place.bodyLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-corten transition-all hover:gap-3"
                      >
                        {place.bodyLink.label}
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
                      </a>
                    ) : null}
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

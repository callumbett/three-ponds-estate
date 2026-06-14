import type { Metadata } from "next";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";

export const metadata: Metadata = {
  title: "Explore the Region",
  // Trimmed from 212 chars to 140 chars — under the 155-char display limit.
  description:
    "Things to do near Three Ponds Estate, Temora NSW — Aviation Museum, Lake Centenary, Canola Trail, Coolamon Cheese Co, Junee Licorice Factory and more.",
  alternates: { canonical: "/explore" },
  openGraph: {
    url: "https://threepondsestate.com/explore",
    title: "Explore the Region · Three Ponds Estate",
    description:
      "Things to do near Three Ponds Estate, Temora NSW — Aviation Museum, Lake Centenary, Canola Trail, Coolamon Cheese Co, Junee Licorice Factory and more.",
  },
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
    body:
      "One of the world's finest collections of flying warbirds — Spitfires, the only flying Hudson, the oldest Tiger Moth in Australia. Three full-motion simulators and the Guardhouse Café.",
    bodyLink: {
      href: "https://www.aviationmuseum.com.au/",
      label: "Visit their site",
    },
    image: "/images/explore/aviation-museum.JPG",
    alt: "The Temora Aviation Museum",
  },
  {
    eyebrow: "1.8 km north",
    title: "Lake Centenary",
    body:
      "A 2.7 km lake loop, picnic lawns, swimming, fishing — and the V8 Superboat Championships.",
    bodyLink: {
      href: "https://www.v8superboats.com.au/calendar/",
      label: "V8 Superboats calendar",
    },
    image: "/images/explore/lake-centenary.jpg",
    alt: "Lake Centenary, Temora",
  },
  {
    eyebrow: "August – September",
    title: "The Canola Trail",
    body:
      "When spring lands, Yellow Bloom Road stops being a metaphor. Hot-air balloon flights run during the bloom — sunrise lifts, gold underneath.",
    image: "/images/explore/hot-air-ballon.jpg",
    alt: "A hot-air balloon over the canola fields near Temora",
  },
  {
    eyebrow: "In town",
    title: "Bundawarrah Centre",
    body:
      "Three acres of Australiana — the NSW Ambulance Museum, Sir Donald Bradman's cottage, and Willo's Wiradjuri Keeping Place.",
    image: "/images/explore/bundawarrah-centre.jpg",
    alt: "Bundawarrah Centre, Temora Rural Museum",
  },
  {
    eyebrow: "In town",
    title: "Diamonds & Dust Café",
    body:
      "Stunning jewellery for every expression. A locally-loved kitchen for breakfast and lunch. Heritage room, warm welcome, the kind of place where you stay longer than you planned.",
    image: "/images/explore/diamonds-and-dust.jpg",
    alt: "Diamonds & Dust Café, Temora",
  },
  {
    eyebrow: "63 km southwest · 40–45 min",
    title: "Coolamon Cheese Co",
    body:
      "Award-winning farmhouse cheeses, made on-site. Sample the line, take a wheel home, lunch on the deck. Worth the short drive any season.",
    image: "/images/explore/coolamon-cheese.jpg",
    alt: "Coolamon Cheese Co",
  },
  {
    eyebrow: "56 km south · 35–40 min",
    title: "Junee Licorice & Chocolate Factory",
    body:
      "Australia's only certified-organic licorice and chocolate maker. Tour the historic factory, taste the range, and leave with the Riverina's best souvenir.",
    image: "/images/explore/junee-licorice.jpg",
    alt: "Junee Licorice & Chocolate Factory",
  },
  {
    eyebrow: "In town",
    title: "Temora Pool",
    body:
      "Lap lanes, grassed banks, and the unhurried country-summer ritual. A short drive from the estate.",
    image: "/images/explore/temora-pool.JPG",
    alt: "Temora Pool",
  },
  {
    eyebrow: "3 minutes by car",
    title: "Temora town",
    body:
      "Heritage main street, country pubs, and the cafés we send guests to. The friendliest town in the state.",
    image: "/images/explore/temora-1.webp",
    alt: "Temora town",
  },
];

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className="ml-1"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ExplorePage() {
  return (
    <>
      {/* Page masthead */}
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
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
              The Riverina is a slower country. A handful of places we&apos;d
              point a guest to — starting across the road and working outward.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Tile grid — uniformly sized cards so the section reads as a
          curated guide rather than alternating editorial spreads. */}
      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place, i) => (
              <MotionReveal key={place.title} delay={i * 0.04}>
                <article className="group flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-parchment-deep">
                    <Image
                      src={place.image}
                      alt={place.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      quality={85}
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="metadata mt-5 text-corten">{place.eyebrow}</p>
                  <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.01em] text-charcoal sm:text-[1.65rem]">
                    {place.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
                    {place.body}
                  </p>
                  {place.bodyLink ? (
                    <a
                      href={place.bodyLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-corten transition-all hover:gap-2"
                    >
                      {place.bodyLink.label}
                      <Arrow />
                    </a>
                  ) : null}
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quiet closing */}
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

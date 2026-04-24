import type { Metadata } from "next";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Explore the Region",
  description:
    "What's on the doorstep at Three Ponds Estate: the Temora Aviation Museum, Lake Centenary, the Bundawarrah Centre, the Canola Trail and Temora town.",
};

const places = [
  {
    eyebrow: "Across the road",
    title: "Temora Aviation Museum",
    body: "One of the world's finest collections of flying warbirds — two of Australia's flying Spitfires, the only flying Lockheed Hudson, the oldest flying Tiger Moth in the country. Three full-motion simulators (Spitfire, Mustang, Kittyhawk) and the Guardhouse Café for breakfast and lunch.",
    image:
      "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=2400&q=85",
    alt: "Vintage warbird aircraft on a sunlit hangar floor",
  },
  {
    eyebrow: "1.8 km north",
    title: "Lake Centenary",
    body: "A 2.7 km lake loop walking track, swimming, fishing, picnic lawns, and — for one weekend a year — the V8 Superboat Championships. The dedicated Canola Walk starts here.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85",
    alt: "A still inland lake at golden hour",
  },
  {
    eyebrow: "In town",
    title: "Bundawarrah Centre",
    body: "Three acres of Australiana including the NSW Ambulance Museum, Sir Donald Bradman's cottage, and Willo's Wiradjuri Keeping Place. Quiet, unhurried, and quietly extraordinary.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=2400&q=85",
    alt: "Soft archival interior with display cases",
  },
  {
    eyebrow: "August – October",
    title: "The Canola Trail",
    body: "When spring arrives, the country around Temora turns gold. Yellow Bloom Road. A whole region painted in canola. Walk it from your front gate, drive it for the whole afternoon.",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=2400&q=85",
    alt: "Endless yellow canola field under a wide blue sky",
  },
  {
    eyebrow: "3.1 km south",
    title: "Temora town",
    body: "Heritage main street, country pubs, a few good cafés, and what locals call the friendliest town in the state. The Guardhouse Café at the museum stays open daily.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=85",
    alt: "A quiet country main street at dusk",
  },
];

export default function ExplorePage() {
  return (
    <>
      <section className="bg-parchment pt-40 pb-16 sm:pt-48 sm:pb-24">
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

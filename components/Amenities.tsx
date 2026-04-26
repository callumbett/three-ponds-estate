import AmenitiesSlideshow, { type Slide } from "./AmenitiesSlideshow";
import MotionReveal from "./MotionReveal";
import SectionEyebrow from "./SectionEyebrow";

const slides: Slide[] = [
  {
    title: "Communal fire pit",
    body: "An open hearth between the pods — for cold mornings and longer evenings.",
    image: {
      src: "/images/amenities/fire-pit/fire.jpg",
      alt: "Communal fire pit at Three Ponds Estate",
    },
  },
  {
    title: "Outdoor kitchen & BBQ",
    body: "A shared gathering spot for grilling under wide country sky.",
    image: {
      src: "/images/amenities/kitchen-bbq/DSC01847.jpg",
      alt: "Outdoor kitchen and BBQ",
    },
  },
  {
    title: "Walking & cycling track",
    body: "Onto our doorstep — 1.8 km north to Lake Centenary, 3.1 km south to town.",
    image: {
      src: "/images/amenities/walking-track/IMG_4706.JPEG",
      alt: "The walking and cycling track at Three Ponds Estate",
    },
  },
  {
    title: "Aviation Museum at the gate",
    body: "Directly opposite — Spitfires, Mustangs, and the world's only flying Hudson.",
    image: {
      src: "/images/amenities/aviation-museum/TAM-245.JPG",
      alt: "The Temora Aviation Museum, opposite the estate",
    },
  },
  {
    title: "Linen & towels",
    body: "Plush queens, warm bedside lighting, and 800 gsm Turkish cotton in the bath.",
    image: {
      src: "/images/amenities/linen/linen.png",
      alt: "Linen and towels",
    },
  },
  {
    title: "Quiet acreage",
    body: "Each pod sits alone with its own deck and private parking.",
    image: {
      src: "/images/amenities/acreage/DSC01857.jpg",
      alt: "The acreage at Three Ponds Estate",
    },
  },
];

export default function Amenities() {
  return (
    <section className="bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow>What&apos;s shared</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            Considered amenities,<br />
            quietly placed.
          </h2>
        </div>

        <MotionReveal className="mt-16">
          <AmenitiesSlideshow slides={slides} />
        </MotionReveal>
      </div>
    </section>
  );
}

// Single source of truth for the three pods.
// All image references point at the estate's own photography under
// public/images/pods/<slug>/.

export type Pod = {
  slug: "the-ophir" | "the-felix" | "the-uphaz";
  name: string;
  tagline: string;
  bedrooms: number;
  sleeps: number;
  styleNote: string;
  intro: string;
  detail: string;
  spec: { label: string; value: string }[];
  amenities: string[];
  cover: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  // Pricing is indicative until the Little Hotelier feed is wired in.
  fromAud: number;
};

export const pods: Pod[] = [
  {
    slug: "the-ophir",
    name: "The Ophir",
    tagline: "One bedroom · the eastern pod, for sunrise",
    bedrooms: 1,
    sleeps: 2,
    styleNote: "Hamptons-minimal",
    intro:
      "A single, considered room of pale timber and clean line. The Ophir faces east — built for the kind of slow morning that begins with light spilling across the deck before anyone else is awake.",
    detail:
      "Pared back without being austere. A plush queen, warm bedside lamps, an airy living area in natural materials, and a kitchen quietly equipped with Smeg and Artusi. The dining table opens straight onto the eastern deck, where the day arrives over open paddock.",
    spec: [
      { label: "Configuration", value: "1 bedroom · 1 bathroom" },
      { label: "Sleeps", value: "2 guests" },
      { label: "Aspect", value: "East-facing deck (sunrise)" },
      { label: "Style", value: "Minimalist Hamptons" },
      { label: "Kitchen", value: "Smeg & Artusi appliances" },
    ],
    amenities: [
      "Queen bed with warm bedside lighting",
      "Fully equipped kitchen — Smeg & Artusi",
      "Modern bathroom with full-height tile",
      "Eastern-facing private deck",
      "Reverse-cycle climate control",
      "Fast Wi-Fi",
      "Private parking",
      "Access to communal fire pit & BBQ",
    ],
    cover: {
      src: "/images/pods/the-ophir/DSC01766.jpg",
      alt: "The Ophir — establishing view of the pod and its setting",
    },
    gallery: [
      {
        src: "/images/pods/the-ophir/DSC01522.jpg",
        alt: "The Ophir interior",
      },
      {
        src: "/images/pods/the-ophir/DSC01534.jpg",
        alt: "The Ophir interior",
      },
      {
        src: "/images/pods/the-ophir/DSC01541.jpg",
        alt: "The Ophir interior",
      },
      {
        src: "/images/pods/the-ophir/DSC01503.jpg",
        alt: "The Ophir interior",
      },
      {
        src: "/images/pods/the-ophir/DSC01510.jpg",
        alt: "The Ophir interior",
      },
      {
        src: "/images/pods/the-ophir/DSC01827.jpg",
        alt: "The Ophir — wider view",
      },
    ],
    fromAud: 234,
  },
  {
    slug: "the-felix",
    name: "The Felix",
    tagline: "Two bedrooms · Scandi barn, for couples or small families",
    bedrooms: 2,
    sleeps: 4,
    styleNote: "Scandi barn",
    intro:
      "A two-bedroom barn pod in the Scandinavian register — restrained palette, generous proportions, and a quiet that settles over you the moment you arrive.",
    detail:
      "Two queen rooms sit either side of an open living and kitchen volume. The materials do the talking: pale timber, soft linen, matte stone. 800 gsm Turkish cotton in the bathroom, a fully equipped kitchen, and a deck that opens onto the same wide horizon as its sister pod.",
    spec: [
      { label: "Configuration", value: "2 bedrooms · 1 bathroom" },
      { label: "Sleeps", value: "4 guests" },
      { label: "Aspect", value: "Private deck onto open paddock" },
      { label: "Style", value: "Modern Scandinavian barn" },
      { label: "Linen", value: "800 gsm Turkish cotton towels" },
    ],
    amenities: [
      "Two queen bedrooms",
      "Fully equipped modern kitchen",
      "800 gsm Turkish cotton towels",
      "Reverse-cycle climate control",
      "Private outdoor deck",
      "Fast Wi-Fi",
      "Private parking",
      "Access to communal fire pit & BBQ",
    ],
    cover: {
      src: "/images/pods/the-felix/DSC01805.jpg",
      alt: "The Felix — establishing view of the pod and its setting",
    },
    gallery: [
      {
        src: "/images/pods/the-felix/DSC01658.jpg",
        alt: "The Felix interior",
      },
      {
        src: "/images/pods/the-felix/DSC01671.jpg",
        alt: "The Felix interior",
      },
      {
        src: "/images/pods/the-felix/DSC01643.jpg",
        alt: "The Felix interior",
      },
      {
        src: "/images/pods/the-felix/DSC01631.jpg",
        alt: "The Felix interior",
      },
      {
        src: "/images/pods/the-felix/DSC01625.jpg",
        alt: "The Felix interior",
      },
      {
        src: "/images/pods/the-felix/DSC01867.jpg",
        alt: "The Felix — wider view",
      },
    ],
    fromAud: 289,
  },
  {
    slug: "the-uphaz",
    name: "The Uphaz",
    tagline: "Two bedrooms · Scandi barn, the western sibling",
    bedrooms: 2,
    sleeps: 4,
    styleNote: "Scandi barn",
    intro:
      "Sister to The Felix and shaped by the same architectural language — but oriented for the long Riverina sunsets that close the day in slow gold.",
    detail:
      "The Uphaz mirrors the Felix in plan and finish: two queen rooms, a single open living volume, the same restrained material palette. What it owns alone is the sky over the deck at six o'clock.",
    spec: [
      { label: "Configuration", value: "2 bedrooms · 1 bathroom" },
      { label: "Sleeps", value: "4 guests" },
      { label: "Aspect", value: "Western deck (sunset)" },
      { label: "Style", value: "Modern Scandinavian barn" },
      { label: "Linen", value: "800 gsm Turkish cotton towels" },
    ],
    amenities: [
      "Two queen bedrooms",
      "Fully equipped modern kitchen",
      "800 gsm Turkish cotton towels",
      "Reverse-cycle climate control",
      "Western-facing deck for sunset",
      "Fast Wi-Fi",
      "Private parking",
      "Access to communal fire pit & BBQ",
    ],
    cover: {
      src: "/images/pods/the-uphaz/DSC01832.jpg",
      alt: "The Uphaz — establishing view of the pod and its setting",
    },
    gallery: [
      {
        src: "/images/pods/the-uphaz/DSC01739.jpg",
        alt: "The Uphaz interior",
      },
      {
        src: "/images/pods/the-uphaz/DSC01754.jpg",
        alt: "The Uphaz interior",
      },
      {
        src: "/images/pods/the-uphaz/DSC01702.jpg",
        alt: "The Uphaz interior",
      },
      {
        src: "/images/pods/the-uphaz/DSC01715.jpg",
        alt: "The Uphaz interior",
      },
      {
        src: "/images/pods/the-uphaz/DSC01708.jpg",
        alt: "The Uphaz interior",
      },
      {
        src: "/images/pods/the-uphaz/DSC01692.jpg",
        alt: "The Uphaz interior",
      },
    ],
    fromAud: 289,
  },
];

export function podBySlug(slug: string): Pod | undefined {
  return pods.find((p) => p.slug === slug);
}

export const podSlugs = pods.map((p) => p.slug);

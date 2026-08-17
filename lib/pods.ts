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
  /**
   * Short meta description for the pod's /stay/[slug] page.
   * Must be under 155 characters. If omitted, `intro` is used as
   * a fallback (but intro can exceed the limit for some pods).
   */
  metaDescription?: string;
  detail: string;
  spec: { label: string; value: string }[];
  amenities: string[];
  cover: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  // Pricing is indicative until the Little Hotelier feed is wired in.
  fromAud: number;
  /**
   * SiteMinder room-type ID for this pod. Used by the booking modal
   * to open the embed widget pre-filtered to just this pod's room
   * type — passed through to the SiteMinder embed as
   * `data-query-room_type={roomTypeId}`. Provided by SiteMinder
   * support per their reservation back office.
   */
  roomTypeId: number;
};

export const pods: Pod[] = [
  {
    slug: "the-ophir",
    name: "The Ophir",
    tagline: "One bedroom · east-facing, for sunrise",
    bedrooms: 1,
    sleeps: 2,
    styleNote: "Hamptons-minimal",
    intro:
      "A single, considered room of pale timber and clean line. The Ophir faces east — built for the kind of slow morning that begins with light spilling across the deck before anyone else is awake.",
    // intro is 191 chars — over the 155-char meta description limit.
    // This shorter version (142 chars) is used for the <meta description> only.
    metaDescription:
      "One considered room of pale timber and clean line. The Ophir faces east — a slow morning, light across the deck, before anyone else is awake.",
    detail:
      "Pared back without feeling austere. A plush queen, warm bedside lighting, an airy living space layered in natural materials, and a quietly equipped Artusi kitchen. The dining area opens directly onto the eastern deck, where the day arrives gently across open country.",
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
      { src: "/images/pods/the-ophir/DSC01522.jpg", alt: "The Ophir bedroom" },
      { src: "/images/pods/the-ophir/DSC01534.jpg", alt: "The Ophir bathroom" },
      { src: "/images/pods/the-ophir/DSC01541.jpg", alt: "The Ophir dining room and kitchen" },
      { src: "/images/pods/the-ophir/DSC01503.jpg", alt: "The Ophir lounge and dining room" },
      { src: "/images/pods/the-ophir/DSC01510.jpg", alt: "The Ophir lounge room with smart TV" },
      { src: "/images/pods/the-ophir/DSC01827.jpg", alt: "The Ophir — wider view" },
    ],
    fromAud: 239,
    roomTypeId: 109125,
  },
  {
    slug: "the-felix",
    name: "The Felix",
    tagline: "Two bedrooms · east + north decks, sunrise to sunset",
    bedrooms: 2,
    sleeps: 4,
    styleNote: "Scandinavian",
    intro:
      "A two-bedroom pod in the Scandinavian register — restrained palette, generous proportions, and a quiet that settles over you the moment you arrive.",
    detail:
      "Two queen rooms sit either side of an open living space and fully equipped kitchen featuring Smeg. Pale timber and soft linen create a calm, understated warmth throughout. Two decks invite the outdoors in — east for sunrise mornings, north for the long late-afternoon light that gently closes the day.",
    spec: [
      { label: "Configuration", value: "2 bedrooms · 1 bathroom" },
      { label: "Sleeps", value: "4 guests" },
      { label: "Aspect", value: "East-facing deck (sunrise) · north-facing deck (sunset)" },
      { label: "Style", value: "Modern Scandinavian" },
      { label: "Linen", value: "800 gsm Turkish cotton towels" },
    ],
    amenities: [
      "Two queen bedrooms",
      "Fully equipped modern kitchen",
      "800 gsm Turkish cotton towels",
      "Reverse-cycle climate control",
      "East-facing deck for sunrise",
      "North-facing deck for late afternoon and sunset",
      "Fast Wi-Fi",
      "Private parking",
      "Access to communal fire pit & BBQ",
    ],
    cover: {
      src: "/images/pods/the-felix/DSC01805.jpg",
      alt: "The Felix — establishing view of the pod and its setting",
    },
    gallery: [
      { src: "/images/pods/the-felix/DSC01658.jpg", alt: "The Felix bedroom one" },
      { src: "/images/pods/the-felix/DSC01671.jpg", alt: "The Felix bathroom" },
      { src: "/images/pods/the-felix/DSC01643.jpg", alt: "The Felix kitchen with Artusi cooktop" },
      { src: "/images/pods/the-felix/DSC01631.jpg", alt: "The Felix lounge and dining room with smart TV" },
      { src: "/images/pods/the-felix/DSC01625.jpg", alt: "The Felix bedroom two" },
      { src: "/images/pods/the-felix/DSC01867.jpg", alt: "The Felix — wider view" },
    ],
    fromAud: 299,
    roomTypeId: 109124,
  },
  {
    slug: "the-uphaz",
    name: "The Uphaz",
    tagline: "Two bedrooms · east + north decks, sunrise to sunset",
    bedrooms: 2,
    sleeps: 4,
    styleNote: "Scandinavian",
    intro:
      "Sister to The Felix and shaped by the same architectural language — two decks, two aspects, the long Riverina day held from sunrise to sunset.",
    detail:
      "The Uphaz mirrors the Felix in both plan and finish: two queen bedrooms, a single open living space, with Smeg fitted kitchen and the same restrained material palette. Twin decks extend the experience outdoors — east-facing for the morning light, and north-facing for the slow golden glow that closes the day.",
    spec: [
      { label: "Configuration", value: "2 bedrooms · 1 bathroom" },
      { label: "Sleeps", value: "4 guests" },
      { label: "Aspect", value: "East-facing deck (sunrise) · north-facing deck (sunset)" },
      { label: "Style", value: "Modern Scandinavian" },
      { label: "Linen", value: "800 gsm Turkish cotton towels" },
    ],
    amenities: [
      "Two queen bedrooms",
      "Fully equipped modern kitchen",
      "800 gsm Turkish cotton towels",
      "Reverse-cycle climate control",
      "East-facing deck for sunrise",
      "North-facing deck for late afternoon and sunset",
      "Fast Wi-Fi",
      "Private parking",
      "Access to communal fire pit & BBQ",
    ],
    cover: {
      src: "/images/pods/the-uphaz/DSC01832.jpg",
      alt: "The Uphaz — establishing view of the pod and its setting",
    },
    gallery: [
      { src: "/images/pods/the-uphaz/DSC01739.jpg", alt: "The Uphaz bedroom one" },
      { src: "/images/pods/the-uphaz/DSC01754.jpg", alt: "The Uphaz bathroom" },
      { src: "/images/pods/the-uphaz/DSC01702.jpg", alt: "The Uphaz dining and lounge room" },
      { src: "/images/pods/the-uphaz/DSC01715.jpg", alt: "The Uphaz lounge room with smart TV" },
      { src: "/images/pods/the-uphaz/DSC01708.jpg", alt: "The Uphaz bedroom two" },
      { src: "/images/pods/the-uphaz/DSC01692.jpg", alt: "The Uphaz deck with sunset view" },
    ],
    fromAud: 299,
    roomTypeId: 109123,
  },
];

export function podBySlug(slug: string): Pod | undefined {
  return pods.find((p) => p.slug === slug);
}

export const podSlugs = pods.map((p) => p.slug);

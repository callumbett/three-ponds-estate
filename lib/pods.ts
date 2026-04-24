// Single source of truth for the three pods.
// Image URLs are curated Unsplash references — replace with the estate's own
// photography by editing the `gallery` arrays below.

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

const UNSPLASH = (id: string, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

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
      src: UNSPLASH("1505691938895-1758d7feb511"),
      alt: "Sun rising over a soft minimalist interior with timber floors",
    },
    gallery: [
      {
        src: UNSPLASH("1505691938895-1758d7feb511"),
        alt: "Pale interior bathed in morning light",
      },
      {
        src: UNSPLASH("1556909114-f6e7ad7d3136"),
        alt: "Linen-draped queen bed in a quiet bedroom",
      },
      {
        src: UNSPLASH("1600585154340-be6161a56a0c"),
        alt: "Open-plan kitchen with stone island and timber cabinetry",
      },
      {
        src: UNSPLASH("1554995207-c18c203602cb"),
        alt: "Soft pendant lighting above a small dining table",
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
      src: UNSPLASH("1600585154526-990dced4db0d"),
      alt: "Modern Scandinavian barn-style interior with vaulted ceiling",
    },
    gallery: [
      {
        src: UNSPLASH("1600585154526-990dced4db0d"),
        alt: "Vaulted living room in pale timber and white linen",
      },
      {
        src: UNSPLASH("1522708323590-d24dbb6b0267"),
        alt: "Quiet queen bedroom with soft natural light",
      },
      {
        src: UNSPLASH("1558211583-d26f610c1eb1"),
        alt: "Stone-topped kitchen island with Scandinavian stools",
      },
      {
        src: UNSPLASH("1591088398332-8a7791972843"),
        alt: "Timber deck under a wide country sky",
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
      src: UNSPLASH("1564013799919-ab600027ffc6"),
      alt: "Modern barn pod under a golden sunset sky",
    },
    gallery: [
      {
        src: UNSPLASH("1564013799919-ab600027ffc6"),
        alt: "Pod silhouette against a golden western sky",
      },
      {
        src: UNSPLASH("1505693416388-ac5ce068fe85"),
        alt: "Calm bedroom with soft late-afternoon light",
      },
      {
        src: UNSPLASH("1600121848594-d8644e57abab"),
        alt: "Open kitchen and dining with view to deck",
      },
      {
        src: UNSPLASH("1493809842364-78817add7ffb"),
        alt: "Fire pit at dusk in open country",
      },
    ],
    fromAud: 289,
  },
];

export function podBySlug(slug: string): Pod | undefined {
  return pods.find((p) => p.slug === slug);
}

export const podSlugs = pods.map((p) => p.slug);

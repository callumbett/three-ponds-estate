import type { Metadata } from "next";

/**
 * Shared Open Graph construction.
 *
 * WHY THIS EXISTS — Next.js does NOT deep-merge metadata. If a page
 * exports its own `openGraph` object, the root layout's `openGraph` is
 * replaced wholesale, not merged into. From the Next.js docs:
 *
 *   "All `openGraph` fields from app/layout.js are replaced in
 *    app/blog/page.js because app/blog/page.js sets openGraph metadata."
 *
 * Every page here sets `openGraph` (for a per-page og:url and og:title),
 * which silently discarded the layout's `images`, `type` and `locale`.
 * The result was 12 pages shipping no og:image at all — every shared
 * link on Facebook, LinkedIn, WhatsApp, iMessage and Slack rendered as
 * bare text with no photograph. Ahrefs flagged it as "Open Graph tags
 * incomplete" across all 12 URLs (4 Sep 2026).
 *
 * Routing every page through this helper means the shared fields cannot
 * be forgotten again — a new page gets them by construction.
 */

const SITE_URL = "https://threepondsestate.com";

/**
 * The site-wide social preview: the sunset shot of all three pods.
 *
 * Served as a static asset from `public/` rather than via Next's
 * `app/opengraph-image.jpg` file convention. The convention generates a
 * URL carrying an internal cache query string, which Vercel's `dpl=`
 * param then doubled — producing "?opengraph-image.xxx?dpl=…" and
 * failing Open Graph validation. Referencing the static file directly
 * avoids any query-string mutation.
 */
const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.jpg`,
  width: 945,
  height: 630,
  alt: "Three Ponds Estate — boutique pod accommodation in Temora, NSW",
} as const;

type OpenGraphInput = {
  /** Route path, leading slash included — e.g. "/stay" or "/". */
  path: string;
  title: string;
  description: string;
};

export function buildOpenGraph({
  path,
  title,
  description,
}: OpenGraphInput): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_AU",
    siteName: "Three Ponds Estate",
    url: `${SITE_URL}${path}`,
    title,
    description,
    images: [OG_IMAGE],
  };
}

/**
 * Lodgify booking-widget configuration — single source of truth.
 *
 * We integrate Lodgify's hosted booking engine via two widget types:
 *   - Search Box (portable search bar) on the homepage and /book.
 *   - Booking box per pod on each /stay/[slug] page (added per rental,
 *     once the per-rental embed codes are generated in Lodgify).
 *
 * WEBSITE_ID is the Lodgify account/website identifier embedded in the
 * widget's `data-website-id` attribute.
 *
 * SEARCH_PAGE_URL is where the Search Box sends a guest after they pick
 * dates. For the seamless flow it points at the booking subdomain
 * (book.threepondsestate.com), which is CNAME'd to Lodgify and serves
 * the Lodgify "all properties" / checkout pages under our own brand.
 *
 *   ⚠️  Until the subdomain DNS + Lodgify domain-linking is live, the
 *       Search button will not resolve. The widget still renders and is
 *       interactive on the preview; only the post-search redirect is
 *       gated on that DNS work. See the lodgify-switchback handoff.
 */

export const LODGIFY_WEBSITE_ID = "425875";

export const LODGIFY_SEARCH_PAGE_URL =
  "https://book.threepondsestate.com/en/all-properties";

/** Loader script that scans for `#lodgify-search-bar` and renders the bar. */
export const LODGIFY_SEARCH_BAR_LOADER =
  "https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js";

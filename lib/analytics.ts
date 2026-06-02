/**
 * Centralised analytics helpers — fires events to Google Analytics 4
 * via the `gtag()` function defined by Google's snippet in
 * `app/layout.tsx`. Safe-noop when gtag isn't available (SSR, build
 * time, or visitors with analytics blockers).
 *
 * Event-naming convention matches GA4 best practice: snake_case verbs.
 * Each event must be marked as a Conversion in GA4 Admin → Events
 * before Google Ads will attribute spend against it.
 *
 * Wired events (June 2026):
 *   book_now_click     — any Book Now / booking trigger clicked.
 *                        Params: pod_filter (room type id, or "any").
 *   contact_submit     — enquiry form submitted successfully.
 *                        Params: pod_choice.
 *   tel_click          — phone number link clicked.
 *                        Params: tel.
 *   email_click        — mailto: link clicked.
 *                        Params: email.
 *   site_map_download  — pre-arrival PDF site-map link clicked.
 *                        Params: file.
 */

type GtagParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

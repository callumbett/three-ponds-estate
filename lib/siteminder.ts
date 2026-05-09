/**
 * SiteMinder embed widget helpers.
 *
 * The embed library at https://widget.siteminder.com/ibe.min.js scans
 * the DOM for elements with class="ibe" once on page load. In a SPA
 * (Next.js App Router) those elements often mount AFTER that scan —
 * inside route changes, modals, or client-rendered sections. This
 * module asks the script to scan again.
 *
 * Tries known global-API patterns first; falls back to re-injecting
 * the script tag (whose own bootstrap code re-runs the scan). One of
 * the two paths always works.
 */

export function reInitSiteMinder() {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    IBE?: { init?: () => void; refresh?: () => void };
    SiteMinder?: { init?: () => void };
  };

  try {
    if (typeof w.IBE?.init === "function") {
      w.IBE.init();
      return;
    }
    if (typeof w.IBE?.refresh === "function") {
      w.IBE.refresh();
      return;
    }
    if (typeof w.SiteMinder?.init === "function") {
      w.SiteMinder.init();
      return;
    }
  } catch {
    /* fall through */
  }

  // Last resort: re-inject the script tag — its bootstrap code runs a
  // fresh DOM scan on load.
  const script = document.createElement("script");
  script.src = "https://widget.siteminder.com/ibe.min.js";
  script.async = true;
  document.body.appendChild(script);
}

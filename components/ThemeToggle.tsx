"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "tpe-theme";
const CURTAIN_DURATION = 550;

/**
 * Light / dark mode toggle.
 *
 * Adapted from a 21st.dev ThemeToggle — kept the curtain-sweep
 * transition (a full-screen colour wipe top→bottom on toggle) and the
 * icon variant; dropped the variant's app-bar / search / avatar
 * scaffolding (we already have our own masthead) and recoloured the
 * button to use brand tokens (parchment / charcoal / corten) instead
 * of the original's hardcoded palette.
 *
 * Persists choice to localStorage. The inline FOUC-prevention script
 * in `app/layout.tsx` reads that key on first paint and applies the
 * `.dark` class before React hydrates so visitors don't see a
 * light-mode flash on page load.
 *
 * Animation:
 *   - On toggle, a fixed-position div scales from `scaleY(0)` to
 *     `scaleY(1)` from the top — the "curtain falling".
 *   - Mid-animation, we swap `.dark` on <html>; the page underneath
 *     repaints in the new theme.
 *   - The curtain then scales back to 0 from the top — the "curtain
 *     rising", revealing the new theme.
 *   - Total: ~1.1 s of editorial drama.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [phase, setPhase] = useState<"idle" | "falling" | "rising">("idle");
  const curtainColorRef = useRef<string>("#f6f2e8");

  // Mount: hydrate from whatever the FOUC script set on <html>.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const next: Theme = theme === "light" ? "dark" : "light";

    // Curtain colour = the BG of the theme we're transitioning *to*.
    // Reads the resolved CSS variable so we always get the live value
    // (rather than a hardcoded duplicate).
    const probe = document.createElement("div");
    probe.classList.toggle("dark", next === "dark");
    probe.style.position = "fixed";
    probe.style.visibility = "hidden";
    probe.style.background = "var(--color-parchment)";
    document.body.appendChild(probe);
    curtainColorRef.current = getComputedStyle(probe).backgroundColor;
    document.body.removeChild(probe);

    setPhase("falling");

    window.setTimeout(() => {
      setTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* localStorage may be unavailable (private browsing, etc.) */
      }
      document.documentElement.classList.toggle("dark", next === "dark");
      setPhase("rising");
      window.setTimeout(() => setPhase("idle"), CURTAIN_DURATION + 60);
    }, CURTAIN_DURATION);
  }, [phase, theme]);

  return (
    <>
      {/* Curtain — fixed full-screen, scales top-to-bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997] origin-top"
        style={{
          background: curtainColorRef.current,
          transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
          transition:
            phase !== "idle"
              ? `transform ${CURTAIN_DURATION}ms var(--ease-editorial)`
              : "none",
        }}
      />

      {/* Icon button — sun in dark mode, moon in light mode. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={
          theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
        aria-pressed={theme === "dark"}
        className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-parchment-deep text-charcoal transition-all duration-200 ease-out hover:scale-105 hover:bg-parchment-deep/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4 active:scale-95"
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

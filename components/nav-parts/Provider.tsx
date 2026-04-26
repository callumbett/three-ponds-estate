"use client";

import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NavContext, type NavContextValue } from "./context";

/**
 * Owns the Nav's runtime state:
 *   - whether the page has scrolled past the threshold
 *   - whether the mobile sheet is open
 *   - whether the user prefers reduced motion
 *   - whether the *current page* has a hero photo at the top
 *
 * The single derived `onParchment` flag answers the question every
 * part of the masthead actually needs to ask: "is the chrome sitting
 * on a parchment surface, or floating over photography?"
 *
 * Hero-photo pages: `/` (home) and `/stay/<slug>` (individual pods).
 * Everything else (`/stay` listing, `/story`, `/explore`, `/contact`)
 * starts with parchment, so the logo / icons / backdrop should adopt
 * their parchment-state appearance immediately.
 */
const HERO_PHOTO_PATHNAME_RE = /^\/stay\/[^/]+\/?$/;

export default function NavProvider({ children }: { children: ReactNode }) {
  // `||` (not `??`) so empty strings during hydration windows fall back too.
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const hasHeroPhoto =
    pathname === "/" || HERO_PHOTO_PATHNAME_RE.test(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Esc-to-close for the mobile sheet (AccessLint).
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  const value = useMemo<NavContextValue>(
    () => ({
      state: {
        scrolled,
        mobileOpen,
        onParchment: scrolled || mobileOpen || !hasHeroPhoto,
      },
      actions: { toggleMobile, closeMobile },
      meta: { reduceMotion },
    }),
    [scrolled, mobileOpen, hasHeroPhoto, toggleMobile, closeMobile, reduceMotion],
  );

  return <NavContext value={value}>{children}</NavContext>;
}

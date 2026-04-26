"use client";

import { createContext, use } from "react";

/**
 * {state, actions, meta} interface per
 * composition-patterns/rules/state-context-interface.md.
 *
 * The provider is the only place that knows *how* this state is
 * implemented (scroll listener, useState, useReducedMotion). Every part
 * of the Nav reads from this single context.
 */
export type NavContextValue = {
  state: {
    scrolled: boolean;
    mobileOpen: boolean;
    /**
     * True whenever the masthead is sitting on parchment rather than
     * over a hero photo. Single source of truth for "should the logo
     * be black, the icons charcoal, the backdrop opaque" — derived
     * from scroll, mobile-menu state, AND the current pathname.
     */
    onParchment: boolean;
  };
  actions: { toggleMobile: () => void; closeMobile: () => void };
  meta: { reduceMotion: boolean };
};

export const NavContext = createContext<NavContextValue | null>(null);

/**
 * React 19: we use `use()` rather than `useContext()` per
 * composition-patterns/rules/react19-no-forwardref.md.
 */
export function useNav(): NavContextValue {
  const ctx = use(NavContext);
  if (!ctx) {
    throw new Error(
      "useNav() must be used inside <Nav.Provider />. " +
        "Compose the nav with <Nav.Provider>...</Nav.Provider> at the root.",
    );
  }
  return ctx;
}

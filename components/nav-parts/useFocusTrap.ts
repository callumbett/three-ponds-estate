"use client";

import { useEffect, type RefObject } from "react";

/**
 * Traps keyboard focus inside the referenced element while `active` is
 * true. On activation, focus moves to the first focusable element. On
 * deactivation, focus returns to whatever was focused before activation.
 *
 * Used by the mobile nav sheet so screen-reader and keyboard users
 * can't tab "behind" the open drawer (AccessLint requirement).
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(node.querySelectorAll<HTMLElement>(focusableSelector));

    // Focus the first focusable element on open.
    const focusables = getFocusable();
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Return focus to where it was before the sheet opened.
      previouslyFocused?.focus?.();
    };
  }, [active, ref]);
}

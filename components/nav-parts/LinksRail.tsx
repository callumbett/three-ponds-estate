"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./context";

export type NavLink = { href: string; label: string };

type Props = { links: NavLink[] };

/**
 * Editorial link rail for the masthead. Lowercase Fraunces serif text,
 * with an animated hairline that draws in beneath on hover or for the
 * active route. The hairline is the *same colour as the text* (parchment
 * over the hero photo, charcoal once the parchment header backdrop has
 * faded in) — corten is reserved for action CTAs only.
 *
 * Lowercasing is done in CSS so screen readers still receive the
 * proper-cased label. Underline animates `transform: scaleX()` from
 * left, GPU-accelerated, 300ms with cubic-bezier(0.22, 1, 0.36, 1).
 */
export default function NavLinksRail({ links }: Props) {
  const pathname = usePathname() ?? "/";
  const {
    state: { onParchment },
  } = useNav();

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-y-0 inset-x-0 mx-auto hidden w-fit items-center gap-9 md:flex"
    >
      {links.map((l) => {
        const isActive =
          pathname === l.href || pathname.startsWith(l.href + "/");

        return (
          <Link
            key={l.href}
            href={l.href}
            data-active={isActive}
            aria-current={isActive ? "page" : undefined}
            className="group relative inline-flex items-center px-1 py-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4"
          >
            <span
              className={[
                "font-serif text-[18px] lowercase tracking-[0.02em]",
                "transition-colors duration-200 ease-out",
                onParchment
                  ? "text-charcoal"
                  : "text-parchment [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]",
              ].join(" ")}
            >
              {l.label}
            </span>

            {/*
             * Hairline matches the text colour — parchment when sitting
             * over a hero photo, charcoal whenever the masthead is on
             * a parchment surface. Animates `transform: scaleX()` from
             * left for GPU-only motion.
             */}
            <span
              aria-hidden
              className={[
                "absolute inset-x-1 -bottom-0.5 h-px origin-left",
                onParchment ? "bg-charcoal" : "bg-parchment",
                "scale-x-0 transition-transform duration-300",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:scale-x-100",
                "group-data-[active=true]:scale-x-100",
              ].join(" ")}
            />
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./context";
import type { NavLink } from "./LinksRail";

type Props = { links: NavLink[] };

/**
 * Vertical link stack for the mobile sheet. Larger Fraunces labels with
 * a chevron that nudges right on hover and "sticks" forward for the
 * active route.
 *
 * No corten on hover — the chevron simply darkens to charcoal (matching
 * the label colour) and slides forward. Corten is reserved for action
 * CTAs.
 */
export default function NavLinksStack({ links }: Props) {
  const pathname = usePathname() ?? "/";
  const {
    actions: { closeMobile },
  } = useNav();

  return (
    <nav aria-label="Mobile primary" className="flex flex-col">
      {links.map((l) => {
        const isActive =
          pathname === l.href || pathname.startsWith(l.href + "/");

        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={closeMobile}
            data-active={isActive}
            aria-current={isActive ? "page" : undefined}
            className="group relative flex items-center justify-between border-t border-line py-5 transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-corten focus-visible:outline-offset-4"
          >
            <span className="font-serif text-2xl leading-tight tracking-[0.02em] lowercase text-charcoal">
              {l.label}
            </span>
            <span
              aria-hidden
              className="text-charcoal-soft/40 transition-[transform,color] duration-200 ease-out group-hover:translate-x-1 group-hover:text-charcoal group-data-[active=true]:translate-x-1 group-data-[active=true]:text-charcoal"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

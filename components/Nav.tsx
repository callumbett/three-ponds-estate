"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BookNow from "./BookNow";

const links = [
  { href: "/stay", label: "Stay" },
  { href: "/story", label: "Story" },
  { href: "/explore", label: "Explore" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-parchment/85 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-charcoal"
          aria-label="Three Ponds Estate — home"
        >
          Three Ponds<span className="text-corten">.</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-charcoal-soft transition-colors hover:text-corten"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <BookNow variant="ghost" />
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-charcoal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-parchment">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-charcoal hover:text-corten"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4">
              <BookNow variant="solid" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    // Footer wants to stay an editorial "dark endpaper" in both light
    // AND dark modes — so we override the natural token-flip with
    // explicit dark: variants here.
    <footer className="bg-charcoal text-parchment dark:bg-[#0a0807] dark:text-[#f4ecd8]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-parchment dark:text-[#f4ecd8]"
          >
            Three Ponds Estate
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/75 dark:text-[#f4ecd8]/75">
            A boutique architectural sanctuary 500 m from the Temora Aviation
            Museum and three minutes from town, set against the open Riverina
            country of New South Wales.
          </p>
        </div>

        <div>
          <p className="metadata text-parchment/60 dark:text-[#f4ecd8]/55">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-parchment/80 dark:text-[#f4ecd8]/80">
            <li>
              <Link href="/stay" className="transition-colors duration-150 hover:text-corten">
                The Pods
              </Link>
            </li>
            <li>
              <Link href="/story" className="transition-colors duration-150 hover:text-corten">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/explore" className="transition-colors duration-150 hover:text-corten">
                The Region
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition-colors duration-150 hover:text-corten">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors duration-150 hover:text-corten">
                Contact &amp; Book
              </Link>
            </li>
            <li>
              <Link href="/book" className="transition-colors duration-150 hover:text-corten">
                Book direct
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="metadata text-parchment/60 dark:text-[#f4ecd8]/55">Find us</p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-parchment/80 dark:text-[#f4ecd8]/80">
            79 Airport Street
            <br />
            Temora, NSW 2666
            <br />
            (500 m from the Aviation Museum)
          </address>

          <p className="metadata mt-6 text-parchment/60 dark:text-[#f4ecd8]/55">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-parchment/80 dark:text-[#f4ecd8]/80">
            <li>
              <a
                href="mailto:info@threepondsestate.com"
                className="transition-colors duration-150 hover:text-corten"
              >
                info@threepondsestate.com
              </a>
            </li>
            <li>
              <a
                href="tel:+61403433300"
                className="transition-colors duration-150 hover:text-corten"
              >
                0403 433 300
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-parchment/15 dark:border-[#f4ecd8]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-parchment/55 dark:text-[#f4ecd8]/50 sm:flex-row sm:items-center sm:px-10">
          <p>© {new Date().getFullYear()} Three Ponds Estate. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <li>
                <Link
                  href="/terms"
                  className="transition-colors duration-150 hover:text-corten"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors duration-150 hover:text-corten"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

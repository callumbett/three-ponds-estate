import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-parchment">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-parchment"
          >
            Three Ponds Estate
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/75">
            A boutique architectural sanctuary 500 m from the Temora Aviation
            Museum and three minutes from town, set against the open Riverina
            country of New South Wales.
          </p>
        </div>

        <div>
          <p className="metadata text-parchment/60">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-parchment/80">
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
          </ul>
        </div>

        <div>
          <p className="metadata text-parchment/60">Find us</p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-parchment/80">
            79 Airport Street
            <br />
            Temora, NSW 2666
            <br />
            (500 m from the Aviation Museum)
          </address>

          <p className="metadata mt-6 text-parchment/60">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-parchment/80">
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

      <div className="border-t border-parchment/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-parchment/55 sm:flex-row sm:items-center sm:px-10">
          <p>© {new Date().getFullYear()} Three Ponds Estate. All rights reserved.</p>
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
            <li>
              <Link
                href="/cookies"
                className="transition-colors duration-150 hover:text-corten"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

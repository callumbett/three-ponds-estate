import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-parchment-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-charcoal"
          >
            Three Ponds Estate
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal-soft">
            A boutique architectural sanctuary opposite the Temora Aviation
            Museum, set against the open Riverina country of New South Wales.
          </p>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-soft">
            <li><Link href="/stay" className="hover:text-corten">The Pods</Link></li>
            <li><Link href="/story" className="hover:text-corten">Our Story</Link></li>
            <li><Link href="/explore" className="hover:text-corten">The Region</Link></li>
            <li><Link href="/contact" className="hover:text-corten">Contact &amp; Book</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Find us</p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
            79 Airport Street
            <br />
            Temora, NSW 2666
            <br />
            (opposite the Aviation Museum)
          </address>
          <p className="eyebrow mt-6">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-soft">
            <li>
              <a
                href="mailto:info@threepondsestate.com"
                className="hover:text-corten"
              >
                info@threepondsestate.com
              </a>
            </li>
            <li>
              <a
                href="tel:+61403433300"
                className="hover:text-corten"
              >
                0403 433 300
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-charcoal-soft sm:flex-row sm:px-10">
          <p>© {new Date().getFullYear()} Three Ponds Estate. All rights reserved.</p>
          <p className="opacity-70">Built with care · Next.js · motion.dev</p>
        </div>
      </div>
    </footer>
  );
}

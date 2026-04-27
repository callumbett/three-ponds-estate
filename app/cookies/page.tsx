import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Three Ponds Estate uses cookies and similar technologies on this website.",
};

const SECTION_CLASS = "mt-10 first:mt-0";
const H_CLASS = "font-serif text-2xl text-charcoal sm:text-3xl";
const P_CLASS = "mt-4 text-base leading-relaxed text-charcoal-soft";

export default function CookiesPage() {
  return (
    <>
      <section className="bg-parchment pt-48 pb-16 sm:pt-60 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Legal</SectionEyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              Cookie Policy
            </h1>
            <p className="mt-6 text-base leading-relaxed text-charcoal-soft">
              Cookies are small text files a site stores in your browser to
              remember things between visits. This policy explains what we use
              them for and how to opt out.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-charcoal-soft/70">
              Last updated · {new Date().toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-parchment pb-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <MotionReveal>
            <article>
              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>What we use</h2>
                <p className={P_CLASS}>
                  This website uses two broad categories of cookies:
                </p>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-charcoal-soft">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-corten" />
                    <span>
                      <strong className="text-charcoal">Strictly necessary</strong> —
                      cookies required for the site to function (e.g.
                      remembering booking-form state). These cannot be turned
                      off.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-corten" />
                    <span>
                      <strong className="text-charcoal">Analytics</strong> —
                      anonymous usage data that helps us understand which
                      pages visitors find useful. These can be disabled
                      through your browser settings.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Third-party cookies</h2>
                <p className={P_CLASS}>
                  When you open the booking dialog, our reservations provider
                  (Little Hotelier) loads its own cookies inside the booking
                  iframe. These are governed by their privacy and cookie
                  policies, which we link to from the booking dialog.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Managing cookies</h2>
                <p className={P_CLASS}>
                  All major browsers let you view, manage, and delete cookies.
                  Look in your browser's settings under "Privacy" or "Site
                  data". Disabling cookies entirely may affect parts of the
                  site that rely on them, including the booking flow.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Changes to this policy</h2>
                <p className={P_CLASS}>
                  We may update this cookie policy as the site evolves. The
                  "last updated" date at the top reflects the most recent
                  revision.
                </p>
              </div>

              <div className={SECTION_CLASS}>
                <h2 className={H_CLASS}>Related</h2>
                <p className={P_CLASS}>
                  See also our{" "}
                  <Link href="/privacy" className="text-corten hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-corten hover:underline">
                    Terms &amp; Conditions
                  </Link>. Questions can go to{" "}
                  <a
                    href="mailto:info@threepondsestate.com"
                    className="text-corten hover:underline"
                  >
                    info@threepondsestate.com
                  </a>.
                </p>
              </div>

              <p className={`${P_CLASS} mt-12 text-xs italic text-charcoal-soft/70`}>
                This policy is provided as a starting template. Three Ponds
                Estate recommends reviewing it with legal counsel before
                relying on it.
              </p>
            </article>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

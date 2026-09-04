import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Booking } from "@/components/booking";
import MotionReveal from "@/components/MotionReveal";
import PodGallery from "@/components/PodGallery";
import SectionEyebrow from "@/components/SectionEyebrow";
import { podBySlug, pods } from "@/lib/pods";

export function generateStaticParams() {
  return pods.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pod = podBySlug(slug);
  if (!pod) return { title: "Not found" };
  // Use pod.metaDescription if set (The Ophir's intro exceeds 155 chars);
  // otherwise fall back to pod.intro (The Felix and Uphaz are within limit).
  const description = pod.metaDescription ?? pod.intro;
  return {
    title: pod.name,
    description,
    alternates: { canonical: `/stay/${pod.slug}` },
    openGraph: buildOpenGraph({
      path: `/stay/${pod.slug}`,
      title: `${pod.name} · Three Ponds Estate`,
      description,
    }),
  };
}

export default async function PodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pod = podBySlug(slug);
  if (!pod) notFound();

  // Find the next pod in the list for the "next pod" footer.
  const idx = pods.findIndex((p) => p.slug === pod.slug);
  const next = pods[(idx + 1) % pods.length];

  return (
    <>
      {/* Hero — full-bleed cover image with editorial masthead overlay */}
      <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-charcoal">
        <Image
          src={pod.cover.src}
          alt={pod.cover.alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/75" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24">
          <p className="metadata text-parchment/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
            {pod.styleNote} · {pod.bedrooms} bedroom
            {pod.bedrooms > 1 ? "s" : ""} · sleeps {pod.sleeps}
          </p>
          <span
            aria-hidden
            className="mt-4 mb-5 block h-px w-12 bg-parchment/75 [box-shadow:0_1px_6px_rgba(0,0,0,0.4)]"
          />
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em] text-parchment [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            {pod.name}
          </h1>
          <p className="mt-4 max-w-xl font-serif italic text-lg leading-snug text-parchment [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:text-xl">
            {pod.tagline}
          </p>
        </div>
      </section>

      {/* Intro + spec */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 md:grid-cols-12">
          <MotionReveal className="md:col-span-7">
            <SectionEyebrow>The room</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-[-0.015em] sm:text-4xl">
              {pod.intro}
            </h2>
            <p className="prose-body mt-8">{pod.detail}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Booking.PrimaryTrigger
                label={`Book ${pod.name}`}
                filter={{ roomTypeId: pod.roomTypeId }}
              />
              <p className="metadata">
                From AU${pod.fromAud} <span className="text-charcoal-soft/70">/ night</span>
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="md:col-span-5">
            <dl className="border-t border-line">
              {pod.spec.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-3 gap-4 border-b border-line py-5"
                >
                  <dt className="metadata col-span-1">{s.label}</dt>
                  <dd className="col-span-2 text-sm leading-relaxed text-charcoal">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </MotionReveal>
        </div>
      </section>

      {/* Gallery — click any image for a full-screen lightbox */}
      <section className="bg-parchment-deep py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Gallery</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">A walk through.</h2>
            <p className="mt-3 text-sm text-charcoal-soft">
              Tap any frame to open it full-screen.
            </p>
          </MotionReveal>

          <PodGallery images={pod.gallery} />
        </div>
      </section>

      {/* Amenities — editorial numbered list */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal className="max-w-2xl">
            <SectionEyebrow>Amenities</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] sm:text-4xl">
              Quietly equipped.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft">
              Everything you need, nothing in the way. Each pod is fitted to
              the same standard.
            </p>
          </MotionReveal>

          <ul className="mt-14 grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {pod.amenities.map((a, i) => (
              <MotionReveal key={a} delay={i * 0.04}>
                <li className="flex items-baseline gap-5 border-t border-line py-5">
                  <span className="metadata shrink-0 text-corten">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-snug text-charcoal">
                    {a}
                  </span>
                </li>
              </MotionReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Where we are — text on the left, square map on the right */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 sm:px-10 md:grid-cols-12 md:gap-16">
          <MotionReveal className="md:col-span-5">
            <SectionEyebrow>Where we are</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              79 Airport Street, Temora.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-soft">
              500 m from the Temora Aviation Museum and three minutes by car
              from the heart of town.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <a
                href="https://www.google.com/maps/place/Three+Ponds+Estate/@-34.4240369,147.5172122,17z/data=!4m9!3m8!1s0x6b190f1eb6a813fb:0x684a709a0169c2cb!5m2!4m1!1i2!8m2!3d-34.4240369!4d147.5197925!16s%2Fg%2F11kjg1t5lz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-corten transition-all hover:gap-3"
              >
                Open in Google Maps
                <svg
                  width="14"
                  height="14"
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
              </a>
              <span className="text-charcoal-soft/70" aria-hidden="true">·</span>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=79+Airport+Street+Temora+NSW+2666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-corten transition-all hover:gap-3"
              >
                Get directions
                <svg
                  width="14"
                  height="14"
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
              </a>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="md:col-span-7">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-line">
              <iframe
                title="Map of Three Ponds Estate, 79 Airport Street, Temora NSW"
                src="https://maps.google.com/maps?q=79+Airport+Street+Temora+NSW+2666&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Next pod — editorial card with the next pod's cover image */}
      <section className="relative overflow-hidden bg-charcoal text-parchment">
        <Link
          href={`/stay/${next.slug}`}
          className="group relative block"
          aria-label={`Continue to ${next.name}`}
        >
          <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
            <Image
              src={next.cover.src}
              alt=""
              fill
              sizes="100vw"
              quality={85}
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/35" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 sm:px-10 sm:pb-20">
              <p className="metadata text-parchment/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
                The next pod
              </p>
              <span
                aria-hidden
                className="mt-4 mb-5 block h-px w-12 bg-parchment/70"
              />
              <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-parchment [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]">
                {next.name}
              </h2>
              <p className="mt-3 max-w-xl font-serif italic text-base leading-snug text-parchment/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:text-lg">
                {next.tagline}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-parchment transition-all group-hover:gap-3 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
                See {next.name}
                <svg
                  width="14"
                  height="14"
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
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}

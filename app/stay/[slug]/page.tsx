import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookNow from "@/components/BookNow";
import MotionReveal from "@/components/MotionReveal";
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
  return {
    title: pod.name,
    description: pod.intro,
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
      {/* Hero — full-bleed cover image */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24">
          <p className="eyebrow text-parchment/80">{pod.styleNote} · {pod.bedrooms} bedroom{pod.bedrooms > 1 ? "s" : ""}</p>
          <h1 className="mt-4 font-serif text-5xl text-parchment sm:text-7xl">
            {pod.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-parchment/85 sm:text-lg">
            {pod.tagline}
          </p>
        </div>
      </section>

      {/* Intro + spec */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 md:grid-cols-12">
          <MotionReveal className="md:col-span-7">
            <SectionEyebrow>The room</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              {pod.intro}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-charcoal-soft">
              {pod.detail}
            </p>
            <div className="mt-10">
              <BookNow variant="solid" label={`Book ${pod.name}`} />
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="md:col-span-5">
            <div className="border-t border-line">
              {pod.spec.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-3 gap-4 border-b border-line py-4"
                >
                  <dt className="col-span-1 text-xs uppercase tracking-[0.18em] text-charcoal-soft">
                    {s.label}
                  </dt>
                  <dd className="col-span-2 text-sm text-charcoal">{s.value}</dd>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-parchment-deep py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Gallery</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">A walk through.</h2>
          </MotionReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {pod.gallery.map((img, i) => (
              <MotionReveal key={img.src} delay={i * 0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-parchment">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities list */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <MotionReveal>
            <SectionEyebrow>Amenities</SectionEyebrow>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">Quietly equipped.</h2>
          </MotionReveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pod.amenities.map((a, i) => (
              <MotionReveal key={a} delay={i * 0.04}>
                <li className="flex items-start gap-3 border-t border-line pt-4 text-sm text-charcoal-soft">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-corten" />
                  <span>{a}</span>
                </li>
              </MotionReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Next pod */}
      <section className="bg-charcoal py-20 text-parchment">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="eyebrow text-parchment/80">Next pod</p>
            <h3 className="mt-2 font-serif text-3xl text-parchment">{next.name}</h3>
            <p className="mt-1 text-sm text-parchment/80">{next.tagline}</p>
          </div>
          <Link
            href={`/stay/${next.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-parchment/40 px-6 py-2.5 text-sm tracking-wide text-parchment transition-colors hover:border-corten hover:text-corten"
          >
            See {next.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

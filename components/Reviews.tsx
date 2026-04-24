import MotionReveal from "./MotionReveal";
import SectionEyebrow from "./SectionEyebrow";

const quotes = [
  {
    quote:
      "We came for the museum across the road and stayed an extra night for the deck at sunset. Quietly perfect.",
    name: "Anna & Dom",
    where: "Sydney",
  },
  {
    quote:
      "The space is beautifully restrained. Everything you need, nothing in the way.",
    name: "James",
    where: "Melbourne",
  },
  {
    quote:
      "We watched the canola turn gold from the kitchen window. We'll be back in spring.",
    name: "The Rileys",
    where: "Canberra",
  },
];

export default function Reviews() {
  return (
    <section className="bg-charcoal py-24 text-parchment sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow className="text-parchment/80">Guest notes</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-parchment sm:text-5xl">
            From the visitors&apos; book.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {quotes.map((q, i) => (
            <MotionReveal key={q.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-corten">
                  <path d="M9 7h2v6H5v-2c0-2.5 1.5-4 4-4zm10 0h2v6h-6v-2c0-2.5 1.5-4 4-4z" />
                </svg>
                <blockquote className="mt-6 font-serif text-xl leading-relaxed text-parchment">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-parchment/70">
                  {q.name} · {q.where}
                </figcaption>
              </figure>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

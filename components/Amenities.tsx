import MotionReveal from "./MotionReveal";
import SectionEyebrow from "./SectionEyebrow";

const items = [
  {
    title: "Communal fire pit",
    body: "An open hearth between the pods — for cold mornings and longer evenings.",
  },
  {
    title: "Outdoor kitchen & BBQ",
    body: "A shared gathering spot for grilling under wide country sky.",
  },
  {
    title: "Walking & cycling track",
    body: "Onto our doorstep — 1.8 km north to Lake Centenary, 3.1 km south to town.",
  },
  {
    title: "Aviation Museum at the gate",
    body: "Directly opposite — Spitfires, Mustangs, and the world's only flying Hudson.",
  },
  {
    title: "Linen & towels",
    body: "Plush queens, warm bedside lighting, and 800 gsm Turkish cotton in the bath.",
  },
  {
    title: "Quiet acreage",
    body: "Each pod sits alone with its own deck and private parking.",
  },
];

export default function Amenities() {
  return (
    <section className="bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow>What&apos;s shared</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            Considered amenities,<br />
            quietly placed.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <MotionReveal key={it.title} delay={i * 0.05}>
              <div className="border-t border-line pt-6">
                <h3 className="font-serif text-xl text-charcoal">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {it.body}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

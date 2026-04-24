import MotionReveal from "./MotionReveal";

const stats = [
  { value: "3", label: "Pods on a quiet acreage" },
  { value: "1.8 km", label: "To Lake Centenary" },
  { value: "0 m", label: "From the Aviation Museum" },
  { value: "2 mins", label: "To Temora town centre by car" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-line bg-parchment py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 sm:grid-cols-4 sm:px-10">
        {stats.map((s, i) => (
          <MotionReveal key={s.label} delay={i * 0.06}>
            <div>
              <p className="font-serif text-3xl text-corten sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-charcoal-soft">
                {s.label}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

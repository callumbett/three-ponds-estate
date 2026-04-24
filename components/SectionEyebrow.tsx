type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionEyebrow({ children, className }: Props) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        className ?? "",
      ].join(" ")}
    >
      <span className="h-px w-8 bg-corten" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

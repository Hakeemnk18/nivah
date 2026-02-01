import type { SectionTitleProps } from "../types/ui.types"; 

export default function SectionTitle({
  label,
  title,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-8 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {/* Accent label */}
      <p
        className="
          text-lg
          sm:text-sm
          md:text-2xl
          font-semibold
          tracking-[0.3em]
          text-[var(--accent)]
        "
      >
        {label}
      </p>

      {/* Main title (optional) */}
      {title && (
        <h2 className="mt-4 text-2xl md:text-3xl font-serif font-medium text-[var(--text)]">
          {title}
        </h2>
      )}
    </div>
  );
}
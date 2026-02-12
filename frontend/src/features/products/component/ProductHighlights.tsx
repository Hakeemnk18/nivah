type HighlightItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Props = {
  items: HighlightItem[];
};

export function ProductHighlights({ items }: Props) {
  return (
    <section className="border-t border-b border-[var(--accent)]/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Always 3 columns */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">

          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              {/* Icon */}
              <div className="text-[var(--accent)] text-xl md:text-2xl mb-2">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-xs sm:text-sm md:text-base">
                {item.title}
              </h3>

              {/* Description (Desktop Only) */}
              <p className="hidden md:block text-sm text-[var(--muted)] mt-2 max-w-[220px]">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

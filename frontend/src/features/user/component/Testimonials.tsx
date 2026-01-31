import SectionTitle from "../../../shared/components/SectionTitle";


type Testimonial = {
  quote: string;
  author: string;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Looks elegant and feels comfortable even after long wear.",
      author: "Sneha K, Bengaluru",
    },
    {
      quote:
        "Looks elegant and feels comfortable even after long wear.",
      author: "Sneha K, Bengaluru",
    },
    {
      quote:
        "Looks elegant and feels comfortable even after long wear.",
      author: "Sneha K, Bengaluru",
    },
  ];

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Section title */}
        <SectionTitle label="TESTIMONIALS" align="center" />

        {/* Testimonials grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <blockquote
              key={index}
              className="rounded-md bg-[var(--bg-secondary)] px-6 py-8 text-center shadow-sm"
            >
              <p className="text-sm md:text-base leading-relaxed text-[var(--text)]">
                “{item.quote}”
              </p>

              <footer className="mt-4 text-xs font-medium tracking-wide text-[var(--accent)]">
                {item.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
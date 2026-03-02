import SectionTitle from "../../../shared/components/SectionTitle";
import { useGetAllUserTestimonial } from "../../testimonial/hooks/use.get.testimonial.user";
import type { UserTestimonialView } from "../../testimonial/type/testimonial.type";


const mockTestimonials: UserTestimonialView[] = [
  {
    id: "1",
    author: "Sneha K, Bengaluru",
    comment: "Looks elegant and feels comfortable even after long wear.",
  },
  {
    id: "2",
    author: "Sneha K, Bengaluru",
    comment: "Looks elegant and feels comfortable even after long wear.",
  },
  {
    id: "3",
    author: "Sneha K, Bengaluru",
    comment: "Looks elegant and feels comfortable even after long wear.",
  },
];

export default function Testimonials() {
  const { data: testimonialData } = useGetAllUserTestimonial();
  const testimonials = testimonialData || mockTestimonials;

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
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-md bg-[var(--bg-secondary)] px-6 py-8 text-center shadow-sm"
            >
              <p className="text-sm md:text-base leading-relaxed text-[var(--text)]">
                “{item.comment}”
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
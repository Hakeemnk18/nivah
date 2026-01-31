import SectionTitle from "../../../shared/components/SectionTitle";


export default function FeaturedStory() {
  return (
    <section
      aria-labelledby="featured-story"
      className="w-full"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-14">
        <SectionTitle
          label="FEATURED STORY"
          align="center"
        />

        <p
          id="featured-story"
          className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-center text-[var(--text)]"
        >
          At <span className="font-medium">NIVAH</span>, every ornament is a
          reflection of timeless craftsmanship, designed to be worn today and
          cherished forever.
        </p>
      </div>
    </section>
  );
}
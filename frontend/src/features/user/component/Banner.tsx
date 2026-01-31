export default function SignatureOfferBanner() {
  return (
    <section
      aria-labelledby="signature-offer-heading"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Background image */}
      <img
        src="/images/signature-offer.png"
        alt="Handcrafted traditional gold necklace with gemstones"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-7xl items-center px-6 py-16">
        <div className="max-w-xl">
          <h2
            id="signature-offer-heading"
            className="text-3xl md:text-4xl font-serif leading-snug text-[var(--accent)]"
          >
            A Signature Offer <br /> in Timeless Gold
          </h2>

          <p className="mt-4 text-sm md:text-base text-[#9ca3af]">
            Handcrafted designs curated for moments that last forever.
          </p>

          <p className="mt-2 text-sm md:text-base text-[#9ca3af]">
            Enjoy exclusive festive pricing for a limited time.
          </p>

          <button
            aria-label="Explore signature gold collection"
            className="mt-6 inline-block border border-[var(--accent)] px-6 py-2 text-sm tracking-wide text-white hover:bg-[var(--accent)] hover:text-black transition"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}
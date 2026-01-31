import SectionTitle from "../../../shared/components/SectionTitle";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function DesignedToBeLoved() {
  const features: Feature[] = [
    {
      title: "Thoughtful Design",
      description:
        "Crafted to complement modern styles and occasions.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v4" />
        </svg>
      ),
    },
    {
      title: "Comfort Finish",
      description:
        "Lightweight, skin-friendly, and easy to wear all day.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 12c4-8 10-8 14 0" />
        </svg>
      ),
    },
    {
      title: "Reliable Delivery",
      description:
        "Carefully packed and delivered to your doorstep.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="14" rx="2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionTitle
          label="DESIGNED TO BE WORN & LOVED"
          align="center"
        />

        {/* Feature cards */}
        <div
          className="
            mt-10
            grid grid-cols-3 gap-4
            md:gap-10 md:grid-cols-3
          "
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                rounded-xl
                bg-[var(--card)]
                px-2 py-4
                text-center
                shadow-sm
                md:bg-transparent md:shadow-none md:px-0 md:py-0
              "
            >
              {/* Icon */}
              <div
                className="
                  mx-auto mb-3
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[var(--accent)]
                  text-[var(--accent)]
                  md:h-14 md:w-14
                "
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  text-xs font-medium
                  text-[var(--text)]
                  md:text-lg md:font-serif md:text-[var(--accent)]
                "
              >
                {feature.title}
              </h3>

              {/* Description (desktop only) */}
              <p
                className="
                  mt-2 hidden
                  text-sm leading-relaxed
                  text-[var(--muted)]
                  md:block
                "
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

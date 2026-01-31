import SectionTitle from "../../../shared/components/SectionTitle";

type Category = {
  id: number;
  title: string;
  image: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: "Necklaces",
    image: "/images/category-necklace.png",
  },
  {
    id: 2,
    title: "Necklaces",
    image: "/images/category-necklace.png",
  },
  {
    id: 3,
    title: "Necklaces",
    image: "/images/category-necklace.png",
  },
  {
    id: 4,
    title: "Necklaces",
    image: "/images/category-necklace.png",
  },
];

export default function SignatureCategories() {
  return (
    <section
      aria-labelledby="signature-categories-heading"
      className="w-full bg-[var(--bg)] py-16"
    >
      <div className="w-full px-4">
        {/* Section heading */}
        <SectionTitle label="SIGNATURE CATEGORIES"/>

        {/* Categories grid */}
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id} className="text-center">
              <figure>
                <img
                  src={category.image}
                  alt={`${category.title} jewelry category`}
                  className="mx-auto w-full max-w-[220px] rounded-xl object-cover"
                  loading="lazy"
                />

                <figcaption className="mt-4 text-sm text-[#d4af37]">
                  {category.title}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
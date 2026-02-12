import EmptyState from "../../../shared/components/EmptyState";
import SectionTitle from "../../../shared/components/SectionTitle";
import { getGridClass } from "../../../shared/utils/grid.style";
import { useSignatureCategories } from "../../category/hooks/use.signature.categories";


type SignatureCategory = {
  id: string;
  name: string;
  image: string;
};



export default function SignatureCategories() {

  
  const { data, isLoading, isError } = useSignatureCategories();
  let categories: SignatureCategory[] = [];
  if (data?.data) {
    categories = data.data;
  }

  return (
    <section
      aria-labelledby="signature-categories-heading"
      className="w-full bg-[var(--bg)] py-16"
    >
      <div className="w-full px-4">
        {/* Section heading */}
        <SectionTitle label="SIGNATURE CATEGORIES" />
        {/* Error */}
        {!isLoading && isError && (
          <EmptyState
            title="Something went wrong"
            description="We couldn’t load featured categories right now. Please try again later."
          />
        )}

        {/* Empty */}
        {!isLoading && !isError && categories.length === 0 && <EmptyState title="No categories found" description="Featured categories will appear here once available." />}

        {/* Categories grid */}
        {!isLoading && categories.length > 0 && (
          <ul className={getGridClass(categories.length)}>
            {categories.map((category) => (
              <li key={category.id} className="text-center">
                <figure>
                  <img
                    src={category.image}
                    alt={`${category.name} jewelry category`}
                    className="mx-auto w-full max-w-[220px] rounded-xl object-cover"
                    loading="lazy"
                  />

                  <figcaption className="mt-4 text-sm text-[#d4af37]">
                    {category.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../../../shared/components/SectionTitle";
import SortSelect from "./SortSelect";
import SearchInput from "./SearchInput";
import CategoryPills from "./CategoryPills";
import EmptyState from "../../../../shared/components/EmptyState";
import ProductCard from "./productCard";
import { useUserProducts } from "../../hook/use.user.products";
import ProductEmptyState from "./ProductEmptyState";
import { useParentCategories } from "../../../category/hooks/use.parent.categories";
import { useSubCategoriesByIdForUser } from "../../../category/hooks/use.sub.categories.by.id";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const parentCategoryId = searchParams.get("parentCategoryId");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [parentId, setParentId] = useState<string | undefined>(parentCategoryId || undefined);
  const [childId, setChildId] = useState<string | undefined>();
  const [firstParentId, setFirstParentId] = useState<string | undefined>();
  const navigate = useNavigate();

  /* ---------- Fetch Parent Categories ---------- */
  const { data: parentData } = useParentCategories();

  const parentCategories = parentData?.data || [];

  // /* ---------- Auto Select First Parent ---------- */
  useEffect(() => {
    if (!parentId && parentCategories.length > 0) {
      setFirstParentId(parentCategories[0].id);
    }
  }, [parentCategories]);

  /* ---------- Fetch Sub Categories Based on Parent ---------- */
  const { data: childData } =
    useSubCategoriesByIdForUser(parentId || firstParentId);

  const childCategories = childData?.data || [];

  /* ---------- Reset Child When Parent Changes ---------- */
  useEffect(() => {
    setChildId(undefined);
  }, [parentId]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useUserProducts(search, sort, {
    parentCategoryId: parentId,
    childCategoryId: childId,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Infinite Scroll ---------- */
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const products =
    data?.pages.flatMap((page) => page.data) || [];

  //const products = sampleProducts;

  return (
    <section className="w-full bg-[var(--bg)] text-[var(--text)] py-8 md:py-12">
      <div className="px-4 max-w-7xl mx-auto">
        <SectionTitle label="Fine Jewellery" />

        {/* Controls */}
        <div className="flex flex-col gap-4 mt-6">
          {/* Top row: Sort + Search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            { }
            {/* Sort */}
            <div className="order-2 sm:order-1 w-36 sm:w-auto">
              <SortSelect value={sort} onChange={setSort} />
            </div>

            {/* Search */}
            <div className="order-1 sm:order-2 w-full sm:w-auto">
              <SearchInput value={search} onChange={setSearch} />
            </div>
          </div>

          {/* Parent categories */}
          <CategoryPills
            items={parentCategories}
            activeId={parentId}
            onSelect={(id) => {
              setParentId(id);
            }}
            variant="parent"
          />

          {/* Child categories */}

          <CategoryPills
            items={childCategories}
            activeId={childId}
            onSelect={setChildId}
            variant="child"
          />
        </div>

        {/* States */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-[var(--card)] animate-pulse rounded-xl"
              />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <EmptyState
            title="Something went wrong"
            description="We couldn’t load products right now."
          />
        )}

        {!isLoading && !isError && products.length === 0 && (
          <ProductEmptyState />
        )}

        {/* Product Grid */}
        {products.length > 0 && !isError && !isLoading && (
          <>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {products.map((product) => (
                <li key={product.id} onClick={() => navigate(`/productDetails?productId=${product.id}`)}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>

            {/* Infinite Scroll Trigger */}
            <div ref={observerRef} className="h-10 mt-8" />

            {isFetchingNextPage && (
              <p className="text-center text-[var(--muted)] mt-4">
                Loading more...
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

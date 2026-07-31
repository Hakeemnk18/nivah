import { useCallback, useEffect, useRef, useState } from "react";
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
    refetch
  } = useUserProducts(search, sort, {
    parentCategoryId: parentId,
    childCategoryId: childId,
  });

  /* ---------- Infinite Scroll ----------
     The sentinel is observed by a single IntersectionObserver that lives for
     the whole session (created once via a callback ref, not recreated on
     every page load). Latest fetchNextPage/hasNextPage/isFetchingNextPage are
     read from refs inside the callback so the observer never needs to be torn
     down and reattached — closing that gap removes a window where a fast
     scroll could slip past undetected.
     threshold: 0 + a rootMargin prefetch buffer means the fetch starts before
     the sentinel is actually visible, so the network round-trip has time to
     finish before the user scrolls into the gap, regardless of scroll speed.

     IntersectionObserver only fires on enter/exit crossings, not continuously.
     If one page's worth of new items doesn't add enough height to push the
     sentinel back outside the rootMargin zone, it never "re-crosses" and the
     callback goes silent — even though more pages exist. The effect below
     covers that: whenever a fetch finishes, if the sentinel is still
     intersecting, it immediately fetches the next page too, draining every
     page that's within view before waiting for the next real scroll.
  */
  const hasNextPageRef = useRef(hasNextPage);
  hasNextPageRef.current = hasNextPage;

  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  isFetchingNextPageRef.current = isFetchingNextPage;

  const fetchNextPageRef = useRef(fetchNextPage);
  fetchNextPageRef.current = fetchNextPage;

  const isSentinelIntersectingRef = useRef(false);
  const scrollObserverRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    scrollObserverRef.current?.disconnect();
    scrollObserverRef.current = null;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSentinelIntersectingRef.current = entry.isIntersecting;
        if (
          entry.isIntersecting &&
          hasNextPageRef.current &&
          !isFetchingNextPageRef.current
        ) {
          fetchNextPageRef.current();
        }
      },
      { threshold: 0, rootMargin: "400px 0px" },
    );

    observer.observe(node);
    scrollObserverRef.current = observer;
  }, []);

  useEffect(() => {
    return () => scrollObserverRef.current?.disconnect();
  }, []);

  // Drain every page still within the prefetch zone after each fetch settles,
  // instead of waiting for a fresh IntersectionObserver crossing event.
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isSentinelIntersectingRef.current) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const products =
    data?.pages.flatMap((page) => page.data) || [];

  const handleResetFilters = () => {
    setParentId(undefined);
    setChildId(undefined);
    setSearch("");
    setSort("newest");
  }

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
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && products.length === 0 && (
          <ProductEmptyState onReset={handleResetFilters} />
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
            <div ref={sentinelRef} className="h-10 mt-8" />

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

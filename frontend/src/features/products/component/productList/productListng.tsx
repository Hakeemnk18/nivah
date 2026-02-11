import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../../../shared/components/SectionTitle";
import SortSelect from "./SortSelect";
import SearchInput from "./SearchInput";
import CategoryPills from "./CategoryPills";
import EmptyState from "../../../../shared/components/EmptyState";
import ProductCard from "./productCard";
import { useUserProducts } from "../../hook/use.user.products";
import { sampleProducts } from "../../../../shared/data/sample.products";
import { sampleChildCategories, sampleParentCategories } from "../../../../shared/data/sample.categories";




export default function ProductListing() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [parentId, setParentId] = useState<string | undefined>();
    const [childId, setChildId] = useState<string | undefined>();
    const [parentCategories, setParentCategories] = useState<{ id: string; name: string }[]>(sampleParentCategories);
    const [childCategories, setChildCategories] = useState<{ id: string; name: string }[]>(sampleChildCategories);
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
                if (entry.isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);

    // const products =
    //     data?.data?.data || [];
    const products = sampleProducts;

    return (
        <section className="w-full bg-[var(--bg)] text-[var(--text)] py-8 md:py-12">
            <div className="px-4 max-w-7xl mx-auto">
                <SectionTitle label="Fine Jewellery" />

                {/* Controls */}
                <div className="flex flex-col gap-4 mt-6">

                    {/* Top row: Sort + Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <SortSelect value={sort} onChange={setSort} />
                        <SearchInput value={search} onChange={setSearch} />
                    </div>

                    {/* Parent categories */}
                    <CategoryPills
                        items={parentCategories}
                        activeId={parentId}
                        onSelect={(id) => {
                            setParentId(id);
                            setChildId(undefined);
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
                            <div key={i} className="h-64 bg-[var(--card)] animate-pulse rounded-xl" />
                        ))}
                    </div>
                )}

                {!isLoading && isError && (
                    <EmptyState
                        title="Something went wrong"
                        description="We couldn’t load products right now."
                    />
                )}

                {!isLoading && products.length === 0 && (
                    <EmptyState
                        title="No products found"
                        description="Try adjusting your filters or search."
                    />
                )}

                {/* Product Grid */}
                {products.length > 0 && (
                    <>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                            {products.map((product) => (
                                <li key={product.id}>
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

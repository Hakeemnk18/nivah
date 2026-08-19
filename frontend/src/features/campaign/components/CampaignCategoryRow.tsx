import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProducts } from "../../products/hook/use.user.products";
import CampaignProductCard from "./CampaignProductCard";

type Props = {
    parentCategoryId: string;
    parentName: string;
};

function shuffle<T>(items: T[]): T[] {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

const MAX_PRODUCTS_PER_ROW = 10;

export default function CampaignCategoryRow({ parentCategoryId, parentName }: Props) {
    const navigate = useNavigate();
    const { data, isLoading } = useUserProducts("", "newest", { parentCategoryId });

    const allProducts = data?.pages[0]?.data ?? [];
    const products = useMemo(
        () => shuffle(allProducts).slice(0, MAX_PRODUCTS_PER_ROW),
        [allProducts]
    );

    if (!isLoading && products.length === 0) {
        return null;
    }

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                    {parentName}
                </h2>
                <button
                    onClick={() => navigate(`/products?parentCategoryId=${parentCategoryId}`)}
                    className="text-sm text-[var(--accent)] hover:underline whitespace-nowrap"
                >
                    View All
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 px-4 sm:px-0 no-scrollbar">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="shrink-0 w-[160px] sm:w-[200px] aspect-square rounded-2xl bg-[var(--card)] animate-pulse"
                        />
                    ))
                    : products.map((product) => (
                        <CampaignProductCard
                            key={product.id}
                            product={product}
                            onClick={() => navigate(`/productDetails?productId=${product.id}`)}
                        />
                    ))}
            </div>
        </section>
    );
}

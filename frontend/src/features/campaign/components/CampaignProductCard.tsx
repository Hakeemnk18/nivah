import { useState } from "react";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";
import type { UserProductListItem } from "../../products/type/product.type";

const MOCK_DISCOUNT_PERCENT = 30;

type Props = {
    product: UserProductListItem;
    onClick?: () => void;
};

export default function CampaignProductCard({ product, onClick }: Props) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Display-only markup: shows the real price as the "now" price, and an
    // inflated "was" price so the badge reads as N% off. No discount is ever
    // applied anywhere else (cart, checkout) — this is a marketing display
    // computed purely on the frontend from the existing real price.
    const wasPrice = Math.ceil(
        product.price / (1 - MOCK_DISCOUNT_PERCENT / 100) / 10
    ) * 10;

    return (
        <div
            onClick={onClick}
            className="
        group shrink-0 w-[160px] sm:w-[200px] cursor-pointer
        bg-[var(--card)] rounded-2xl overflow-hidden
        border border-[var(--muted)]
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
                {!isLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-[var(--muted)]/20" />
                )}
                <img
                    src={getOptimizedImageUrl(product.image, 400)}
                    alt={product.name}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    className={`
            w-full h-full object-cover
            transition-all duration-500
            group-hover:scale-105
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
                />
                <span className="absolute top-2 left-2 bg-[var(--accent)] text-black text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {MOCK_DISCOUNT_PERCENT}% OFF
                </span>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-medium text-[var(--text)] line-clamp-2 min-h-[36px]">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[var(--accent)] font-semibold text-sm">
                        ₹{product.price}
                    </span>
                    <span className="text-[var(--muted)] text-xs line-through">
                        ₹{wasPrice}
                    </span>
                </div>
            </div>
        </div>
    );
}

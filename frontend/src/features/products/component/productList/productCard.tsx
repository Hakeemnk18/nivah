import { useState } from "react";
import { getOptimizedImageUrl } from "../../../../shared/utils/cloudinary";
import { getMockDiscountDisplay } from "../../../../shared/utils/mockDiscount";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function ProductCard({ product }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { percent, wasPrice, savedAmount } = getMockDiscountDisplay(product.price, product.id);

  return (
    <div
      className="
        group
        bg-[var(--card)]
        rounded-2xl
        overflow-hidden
        border border-[var(--muted)]
        transition-all duration-300
        hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* Image Wrapper */}
      <div className="relative aspect-square overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[var(--muted)]/20" />
        )}
        <img
          src={getOptimizedImageUrl(product.image, 500)}
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
          {percent}% OFF
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[124px]">
        {/* Product Name (Fixed height, 2 lines max) */}
        <h3
          className="
            text-sm font-medium
            text-[var(--text)]
            line-clamp-2
            min-h-[40px]
          "
        >
          {product.name}
        </h3>

        {/* Spacer pushes price to bottom */}
        <div className="flex-grow" />

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-[var(--accent)] font-semibold text-sm">
            ₹{product.price}
          </p>
          <p className="text-[var(--muted)] text-xs line-through">
            ₹{wasPrice}
          </p>
        </div>
        <p className="text-[var(--accent)]/80 text-[11px] mt-0.5">
          You save ₹{savedAmount}
        </p>
      </div>
    </div>
  );
}

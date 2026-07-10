import { useState } from "react";
import { getOptimizedImageUrl } from "../../../../shared/utils/cloudinary";

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
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[110px]">
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
        <p className="text-[var(--accent)] font-semibold text-sm">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}

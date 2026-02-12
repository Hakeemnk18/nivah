import { useState } from "react";
import ProductCard from "../component/productList/productCard";
import { BuyNowButton } from "../component/BuyNowButton";
import { QuantitySelector } from "../component/QuantitySelector";
import { SizeSelector } from "../component/SizeSelector";
import { ProductImageGallery } from "../component/ProductImageGallery";
import type { UserProductDetails } from "../type/product.type";
import { ProductHighlights } from "../component/ProductHighlights";
import { Shield, Truck, Gem } from "lucide-react";
import SectionTitle from "../../../shared/components/SectionTitle";

const dummyProduct: UserProductDetails = {
  id: "1",
  name: "Ruby Ring",
  categoryId: "1",
  description:
    "Make a subtle statement with this elegantly designed ruby-tone ring. Crafted with refined detailing and a comfortable finish, it adds a touch of sophistication to both everyday outfits and special occasions.",
  images: [
    { url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1" },
    { url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
    { url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1" },
  ],
  variants: [
    { id: "1", size: "6", price: 199, stock: 1 },
    { id: "2", size: "7", price: 500, stock: 10 },
    { id: "3", size: "8", price: 600, stock: 10 },
  ],
};

const relatedProducts = Array.from({ length: 4 }).map((_, i) => ({
  id: `${i}`,
  name: "Ruby Ring",
  price: 199,
  image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1",
}));

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(
    dummyProduct.images[0].url,
  );
  const [selectedSize, setSelectedSize] = useState(
    dummyProduct.variants[0].size,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = dummyProduct.variants.find(
    (v) => v.size === selectedSize,
  );

  return (
    <section className="bg-[var(--bg)] text-[var(--text)] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="order-1">
            {/* Big Image */}
            <ProductImageGallery
              selectedImage={selectedImage}
              productName={dummyProduct.name}
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6">
              {dummyProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img.url)}
                  className="w-20 h-20 rounded-lg overflow-hidden border border-[var(--muted)]"
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col  order-3  lg:sticky lg:top-24 self-start">
            {/* Top Content */}
            <div>
              <h1 className="text-4xl font-bold tracking-wide">
                {dummyProduct.name}
              </h1>

              <p className="text-2xl font-semibold text-[var(--accent)] mt-3">
                ₹{selectedVariant?.price}
              </p>

              <div className="h-[1px] bg-[var(--accent)] w-24 mt-4 mb-6" />

              <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
                {dummyProduct.description}
              </p>
            </div>

            {/* Bottom Controls (Now aligned to big image bottom) */}
            <div className="mt-auto pt-8 space-y-6">
              <SizeSelector
                variants={dummyProduct.variants}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />

              {selectedVariant && (
                <p
                  className={`text-sm font-medium ${
                    selectedVariant.stock === 0
                      ? "text-red-500"
                      : selectedVariant.stock < 10
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {selectedVariant.stock === 0
                    ? "Out of Stock"
                    : selectedVariant.stock < 10
                      ? `Only ${selectedVariant.stock} left`
                      : "In Stock"}
                </p>
              )}

              <QuantitySelector value={quantity} onChange={setQuantity} />

              <BuyNowButton />
            </div>
          </div>
        </div>

        {/* PRODUCT HIGHLIGHTS OUTSIDE GRID */}
        <ProductHighlights
          items={[
            {
              title: "Handcrafted Luxury",
              description: "Exquisitely crafted for timeless elegance.",
              icon: <Gem size={24} />,
            },
            {
              title: "Certified Quality",
              description:
                "Features a natural ruby set in hallmarked 18k gold.",
              icon: <Shield size={24} />,
            },
            {
              title: "Free Shipping",
              description: "Complimentary insured shipping available.",
              icon: <Truck size={24} />,
            },
          ]}
        />

        <section className="mt-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Title */}
            <div className="text-center mb-12">
              <SectionTitle label="You May Also Like" />
            </div>

            {/* Product Grid */}
            <div
              className="
          grid
          gap-8
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
            >
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

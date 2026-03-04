import { useEffect, useState } from "react";
import ProductCard from "../component/productList/productCard";
import { QuantitySelector } from "../component/QuantitySelector";
import { SizeSelector } from "../component/SizeSelector";
import { ProductImageGallery } from "../component/ProductImageGallery";

import { ProductHighlights } from "../component/ProductHighlights";
import { Shield, Truck, Gem } from "lucide-react";
import SectionTitle from "../../../shared/components/SectionTitle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserProductDetails } from "../hook/use.user.product.details";
import { useRelatedProducts } from "../hook/use.related.product";
import { ProductDetailSkeleton } from "../component/ProductDetailsSckelton";
import { useUserProductVariantDetails } from "../hook/use.user.product.variant";
import { useAddItemToCart } from "../../cart/hooks/use.add.item.to.cart";
import toast from "react-hot-toast";
import { getGuestId } from "../../../shared/utils/guest";
import { handleApiError } from "../../../shared/utils/handle.api.error";


export default function ProductDetailsPage() {
  const [searchParams] = useSearchParams();
  let productId = searchParams.get("productId");
  const { data: productDetails, isLoading: isLoadingProductDetails } = useUserProductDetails(productId);
  const { data: relatedProductsData, isLoading: isLoadingRelatedProducts } = useRelatedProducts(productDetails?.data?.categoryId);
  const relatedProducts = relatedProductsData?.data;
  const product = productDetails?.data;
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const { mutateAsync: addItemToCart, isPending: isAddingItemToCart } = useAddItemToCart();


  const {
    data: variantData,
    refetch: refetchVariant,
    isFetching
  } = useUserProductVariantDetails(productId, selectedVariantId!);

  const selectedVariant = variantData?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0].url);
      setSelectedVariantId(product.variants[0].variantId);
      setQuantity(1);
    }
  }, [product]);

  const onVariantSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    setQuantity(1);
    refetchVariant();
  };

  const handleAddToCart = async () => {
    console.log("inside add to cart")
    if (!selectedVariantId) {
      toast.error("Please select a variant");
      return;
    }
    if (quantity > selectedVariant?.stock!) {
      toast.error("Quantity is greater than stock");
      return;
    }

    if (!product?.id) {
      toast.error("Product not found");
      return;
    }

    const guestId = getGuestId()
    console.log("guest id ", guestId)
    try {
      await addItemToCart({
        productId: product?.id!,
        variantId: selectedVariantId,
        quantity: quantity,
        guestId,
      });
      toast.success("Item added to cart");
    } catch (error) {
      const validateError = handleApiError(error)
      if (validateError?.quantity) {
        toast.error(validateError.quantity)
      }
      if (validateError?.variantId) {
        toast.error(validateError.variantId)
      }
      if (validateError?.productId) {
        toast.error(validateError.productId)
      }
      if (validateError?.guestId) {
        toast.error(validateError.guestId)
      }


    }

  }

  return (
    <section className="bg-[var(--bg)] text-[var(--text)] py-10">
      <div className="max-w-7xl mx-auto px-4">

        {(isLoadingProductDetails || !product) &&
          <ProductDetailSkeleton />
        }
        {/* 2 Column Layout */}
        {!isLoadingProductDetails && productDetails !== undefined &&
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT COLUMN */}
            <div className="order-1">
              {/* Big Image */}
              <ProductImageGallery
                selectedImage={selectedImage}
                productName={product?.name}
              />

              {/* Thumbnails */}
              <div className="flex gap-4 mt-6">
                {product?.images.map((img, i) => (
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
                  {product?.name}
                </h1>

                <p className="text-2xl font-semibold text-[var(--accent)] mt-3">
                  ₹{selectedVariant?.price}
                </p>

                <div className="h-[1px] bg-[var(--accent)] w-24 mt-4 mb-6" />

                <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
                  {product?.description}
                </p>
              </div>

              {/* Bottom Controls (Now aligned to big image bottom) */}
              <div className="mt-auto pt-8 space-y-6">
                <SizeSelector
                  variants={product?.variants || []}
                  selected={selectedVariantId}
                  onSelect={onVariantSelect}
                />

                <p className="text-sm font-medium min-h-[20px]">
                  {isFetching ? (
                    <span className="opacity-60">Updating...</span>
                  ) : selectedVariant ? (
                    selectedVariant.stock === 0
                      ? <span className="text-red-500">Out of Stock</span>
                      : selectedVariant.stock < 10
                        ? <span className="text-yellow-500">
                          Only {selectedVariant.stock} left
                        </span>
                        : <span className="text-green-500">In Stock</span>
                  ) : null}
                </p>

                <QuantitySelector
                  maxQuantity={selectedVariant?.stock!}
                  value={quantity} onChange={setQuantity} />

                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl bg-[var(--accent)] text-black font-semibold text-sm tracking-wide hover:opacity-90 transition shadow-lg cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        }
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
          <div

            className="max-w-7xl mx-auto px-2 sm:px-4">
            {/* Section Title */}
            <div className="text-center mb-12">
              <SectionTitle label="You May Also Like" />
            </div>

            {/* Product Grid */}

            <div
              className="
          grid
          gap-6
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
            >


              {!isLoadingRelatedProducts && relatedProducts !== undefined && relatedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/productDetails?productId=${product.id}`)}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}

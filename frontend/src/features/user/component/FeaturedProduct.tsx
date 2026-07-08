import EmptyState from "../../../shared/components/EmptyState";
import SectionTitle from "../../../shared/components/SectionTitle";
import FeaturedProductSkeleton from "./FeaturedProductSkeleton";
import { useFeaturedProducts } from "../../products/hook/use.featured.product";
import type { UserProductListItem } from "../../products/type/product.type";
import { getGridClass } from "../../../shared/utils/grid.style";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";
import { useNavigate } from "react-router-dom";




export default function FeaturedProducts() {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useFeaturedProducts();
    let products: UserProductListItem[] = [];
    //const isLoading = false;

    if (data?.data) {
        products = data.data;
    }

    const getGridWrapperClass = (count: number) => {
        if (count <= 3 && count >= 1) return "flex justify-center";
        return "";
    };



    return (
        <section
            aria-labelledby="featured-products-heading"
            className="w-full bg-[var(--bg-secondary)] py-16"
        >
            <div className="w-full px-4">
                {/* Section heading */}
                <SectionTitle label="FEATURED PRODUCTS" />

                {/* Loading */}
                {isLoading && (
                    <div className="flex justify-center">
                        <ul className="grid gap-6 grid-cols-2  sm:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <li key={index} className="text-center">
                                    <FeaturedProductSkeleton />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Error */}
                {!isLoading && isError && (
                    <EmptyState
                        title="Something went wrong"
                        description="We couldn’t load featured products right now. Please try again later."
                    />
                )}

                {/* Empty */}
                {!isLoading && !isError && products.length === 0 && <EmptyState title="No products found" description="Featured products will appear here once available." />}

                {/* Products grid */}
                {!isLoading && products.length > 0 && (
                    <div className={getGridWrapperClass(products.length)}>
                        <ul className={getGridClass(products.length)}>
                            {products.map((product) => (
                                <li
                                    onClick={() => navigate(`/productDetails?productId=${product.id}`)}
                                    key={product.id} className="text-center cursor-pointer">
                                    <figure>
                                        <img
                                            src={getOptimizedImageUrl(product.image, 440)}
                                            alt={product.name}
                                            className="mx-auto w-full max-w-[220px] rounded-xl object-cover"
                                            loading="lazy"
                                        />

                                        <figcaption className="mt-4">
                                            <p className="text-sm text-[#d4af37]">
                                                {product.name}
                                            </p>
                                            <p className="mt-1 text-sm text-white">
                                                {product.price}
                                            </p>
                                        </figcaption>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


            </div>
        </section>
    );
}

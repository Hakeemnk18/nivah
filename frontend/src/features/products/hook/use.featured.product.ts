import { useQuery } from "@tanstack/react-query";
import { getFeaturedProductsApi } from "../api/product.api";
import type { UserFeaturedProductListResponse } from "../type/product.type";

export const useFeaturedProducts = () => {

    return useQuery<
        UserFeaturedProductListResponse,
        Error
    >({
        queryKey: ["featured-products"],
        queryFn: () => getFeaturedProductsApi(),
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
};
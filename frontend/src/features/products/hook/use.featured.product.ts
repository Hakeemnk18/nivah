import { useQuery } from "@tanstack/react-query";
import { getFeaturedProductsApi } from "../api/product.api";
import type { UserProductListResponse } from "../type/product.type";

export const useFeaturedProducts = () => {

    return useQuery<
        UserProductListResponse,
        Error
    >({
        queryKey: ["featured-products"],
        queryFn: () => getFeaturedProductsApi(),
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
};
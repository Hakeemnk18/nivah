import { useQuery } from "@tanstack/react-query";
import { getRelatedProductsApi } from "../api/product.api";
import type { UserProductListResponse } from "../type/product.type";

export const useRelatedProducts = (categoryId: string | undefined) => {

    return useQuery<
        UserProductListResponse,
        Error
    >({
        queryKey: ["related-products", categoryId],
        queryFn: () => getRelatedProductsApi(categoryId!),
        retry: 1,
        refetchOnMount: false,
        enabled: !!categoryId,
        refetchOnWindowFocus: false,
    });
};
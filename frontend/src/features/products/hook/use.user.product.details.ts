import { useQuery } from "@tanstack/react-query";
import { getProductByIdForUserApi } from "../api/product.api";
import type { UserProductDetailsResponse } from "../type/product.type";

export const useUserProductDetails = (productId: string | null) => {

    return useQuery<
        UserProductDetailsResponse,
        Error
    >({
        queryKey: ["user-product-details", productId],
        queryFn: () => getProductByIdForUserApi(productId as string),
        enabled: !!productId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};
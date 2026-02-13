import { useQuery } from "@tanstack/react-query";
import { getProductVariantForUserApi } from "../api/product.api";
import type { UserProductVariantResponse } from "../type/product.type";

export const useUserProductVariantDetails = (productId: string | null, variantId: string | null) => {

    return useQuery<
        UserProductVariantResponse,
        Error
    >({
        queryKey: ["user-product-variant-details", productId, variantId],
        queryFn: () => getProductVariantForUserApi(productId as string, variantId as string),
        enabled: !!productId && !!variantId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};
import { useQuery } from "@tanstack/react-query";
import { getProductVariantForAdminApi } from "../api/product.api";
import type { VariantResponse } from "../type/product.type";

export const useAdminProductVariant = (productId: string | null, variantId: string | null) => {

    return useQuery<
        VariantResponse,
        Error
    >({
        queryKey: ["admin-product-variant", productId, variantId],
        queryFn: () => getProductVariantForAdminApi(productId as string, variantId as string),
        enabled: !!productId && !!variantId,
        staleTime: 0,
        gcTime: 0,
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
};
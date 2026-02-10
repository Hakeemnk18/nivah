import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVariantApi } from "../api/product.api";

export const useAddVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addVariantApi,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            queryClient.invalidateQueries({
                queryKey: ["admin-product-details", variables.productId],
            });
        },
    });
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVariantApi } from "../api/product.api";

export const useUpdateVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateVariantApi,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            queryClient.invalidateQueries({
                queryKey: ["admin-product-details", variables.productId],
            });
        },

    });
};
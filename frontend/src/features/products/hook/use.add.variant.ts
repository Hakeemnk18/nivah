import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVariantApi } from "../api/product.api";

export const useAddVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addVariantApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
        },
    });
};
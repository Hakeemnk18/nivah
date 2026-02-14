import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCartApi } from "../api/cart.api";

export const useAddItemToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addItemToCartApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};
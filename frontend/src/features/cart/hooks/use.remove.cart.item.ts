import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItemApi } from "../api/cart.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCartItemApi,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["cart-items", variables.guestId] });
        },
        onError: (e) => {
            handleApiError(e)
        }
    });
};  
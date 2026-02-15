import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartCountApi } from "../api/cart.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCartCountApi,
        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({ queryKey: ["cart-items", variables.guestId] });
        },
        onError: (e) => {
            handleApiError(e)
        }
    });
};
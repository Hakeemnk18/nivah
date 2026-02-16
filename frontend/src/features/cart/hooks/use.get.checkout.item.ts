import { useQuery } from "@tanstack/react-query";
import { getCheckoutApi } from "../api/cart.api";
import type { CheckoutResponse } from "../type/cart.type";

export const useGetCheckoutItems = (guestId: string | null) => {

    return useQuery<
        CheckoutResponse,
        Error
    >({
        queryKey: ["checkout-items", guestId],
        queryFn: () => getCheckoutApi(guestId as string),
        enabled: !!guestId,
        staleTime: 0,
        gcTime: 0,
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
};
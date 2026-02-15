import { useQuery } from "@tanstack/react-query";
import { getCartApi } from "../api/cart.api";
import type { GetCartResponse } from "../type/cart.type";

export const useGetCartItems = (guestId: string | null) => {

    return useQuery<
        GetCartResponse,
        Error
    >({
        queryKey: ["cart-items", guestId],
        queryFn: () => getCartApi(guestId as string),
        enabled: !!guestId,
        staleTime: 0,
        gcTime: 0,
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
};
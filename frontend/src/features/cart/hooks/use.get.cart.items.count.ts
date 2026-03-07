import { useQuery } from "@tanstack/react-query";
import { getCartItemsCountApi } from "../api/cart.api";
import type { GetCartItemsCountResponse } from "../type/cart.type";

export const useGetCartItemsCount = (guestId: string | null) => {
    return useQuery<
        GetCartItemsCountResponse,
        Error,
        number
    >({
        queryKey: ["cart-items-count", guestId],
        queryFn: () => getCartItemsCountApi(guestId as string),
        enabled: !!guestId,
        staleTime: 0,
        gcTime: 0,
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
        select: (data) => data.data ?? 0,
    });
};
import { useQuery } from "@tanstack/react-query";
import { getOrderSummaryApi } from "../api/order.api";

export const useOrderSummaryById = (orderId: string | null, guestId: string | null) => {
    return useQuery({
        queryKey: ["order-summary", orderId],
        queryFn: () => getOrderSummaryApi(orderId as string, guestId as string),
        enabled: !!orderId,
    });
};
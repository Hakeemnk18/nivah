import { useQuery } from "@tanstack/react-query";
import { getAdminOrderDetailsApi } from "../api/order.api";

export const useAdminOrderDetails = (orderId: string | null) => {
    return useQuery({
        queryKey: ["order-details", orderId],
        queryFn: () => getAdminOrderDetailsApi(orderId as string),
        enabled: !!orderId,
    });
};
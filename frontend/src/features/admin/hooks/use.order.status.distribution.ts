import { useQuery } from "@tanstack/react-query";
import { getOrderStatusDistributionApi } from "../api/admin.api";

export const useOrderStatusDistribution = () => {
    return useQuery({
        queryKey: ["order-status-distribution"],
        queryFn: () => getOrderStatusDistributionApi(),
        staleTime: 5 * 60 * 1000, 
        select: (data) => data?.data || null,
    });
};
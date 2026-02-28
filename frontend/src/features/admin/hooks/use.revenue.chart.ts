import { useQuery } from "@tanstack/react-query";
import type { RevenueRange } from "../types/admin.type";
import { getRevenueChartApi } from "../api/admin.api";



export const useRevenueChart = (range: RevenueRange) => {
    return useQuery({
        queryKey: ["revenue-chart", range],
        queryFn: () => getRevenueChartApi(range),
        enabled: !!range,
        staleTime: 5 * 60 * 1000,
        select: (data) => data?.data || null,
    });
};
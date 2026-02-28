import { useQuery } from "@tanstack/react-query";
import { getCategoryRankingsApi } from "../api/admin.api";

export const useTopSellingCategories = () => {
    return useQuery({
        queryKey: ["top-selling-categories"],
        queryFn: () => getCategoryRankingsApi(),
        staleTime: 5 * 60 * 1000, 
        select: (data) => data?.data || null,
    });
};
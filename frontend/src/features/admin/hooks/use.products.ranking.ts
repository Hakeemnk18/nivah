import { useQuery } from "@tanstack/react-query";
import { getProductRankingsApi } from "../api/admin.api";



export const useProductsRanking = () => {
    return useQuery({
        queryKey: ["product-rankings"],
        queryFn: () => getProductRankingsApi(),
        staleTime: 5 * 60 * 1000, 
        select: (data) => data?.data || null,
    });
};
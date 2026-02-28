import { useQuery } from "@tanstack/react-query";
import { getKpiCardsApi } from "../api/admin.api";



export const useKpiCards = () => {
    return useQuery({
        queryKey: ["kpi-cards"],
        queryFn: () => getKpiCardsApi(),
        staleTime: 5 * 60 * 1000, 
        select: (data) => data?.data || null,
    });
};
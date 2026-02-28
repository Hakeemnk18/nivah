import { useQuery } from "@tanstack/react-query";
import { getKpiCardsApi } from "../api/admin.api";



export const useKpiCards = () => {
    return useQuery({
        queryKey: ["kpi-cards"],
        queryFn: () => getKpiCardsApi(),
    });
};
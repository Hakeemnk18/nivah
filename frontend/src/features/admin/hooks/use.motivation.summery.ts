import { useQuery } from "@tanstack/react-query";
import { getMotivationSummaryApi } from "../api/admin.api";

export const useMotivationSummary = () => {
    return useQuery({
        queryKey: ["motivation-summary"],
        queryFn: () => getMotivationSummaryApi(),
        staleTime: 5 * 60 * 1000, 
        select: (data) => {
            if(data){
                return data.data;
            }else{ 
                return null;
            }
            
        },
    });
};
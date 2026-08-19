import { useQuery } from "@tanstack/react-query";
import { getAllCampaignForAdminApi } from "../api/campaign.api";

export const useGetAllAdminCampaign = () => {
    return useQuery({
        queryKey: ["admin-campaigns"],
        queryFn: () => getAllCampaignForAdminApi(),
        staleTime: 5 * 60 * 1000,
    });
};

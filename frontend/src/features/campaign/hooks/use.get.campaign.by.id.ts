import { useQuery } from "@tanstack/react-query";
import { getCampaignByIdApi } from "../api/campaign.api";

export const useGetAdminCampaignById = (id: string | null) => {
    return useQuery({
        queryKey: ["admin-campaign", id],
        queryFn: () => getCampaignByIdApi(id as string),
        enabled: !!id,
        retry: 1,
    });
};

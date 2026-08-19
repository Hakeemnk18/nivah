import { useQuery } from "@tanstack/react-query";
import { getCampaignBySlugApi } from "../api/campaign.api";

export const useGetCampaignBySlug = (slug: string | undefined) => {
    return useQuery({
        queryKey: ["campaign", slug],
        queryFn: () => getCampaignBySlugApi(slug as string),
        enabled: !!slug,
        staleTime: 1 * 60 * 1000,
        select: (data) => data.data || null,
        retry: 1,
    });
};

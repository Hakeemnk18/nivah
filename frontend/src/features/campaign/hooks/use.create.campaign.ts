import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCampaignApi } from "../api/campaign.api";
import type { CreateCampaignPayload } from "../types/campaign.type";

export const useCreateCampaign = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCampaignPayload) => createCampaignApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
        },
    });
};

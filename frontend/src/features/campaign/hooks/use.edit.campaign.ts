import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../../../shared/types/api.types";
import { editCampaignApi } from "../api/campaign.api";
import type { UpdateCampaignParams } from "../types/campaign.type";

export const useEditCampaign = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, UpdateCampaignParams>({
        mutationFn: ({ id, data }) => editCampaignApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
        },
    });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockCampaignApi } from "../api/campaign.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useBlockCampaign = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blockCampaignApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
            toast.success("Campaign blocked successfully");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
};

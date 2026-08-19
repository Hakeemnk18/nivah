import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockCampaignApi } from "../api/campaign.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useUnblockCampaign = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unblockCampaignApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
            toast.success("Campaign unblocked successfully");
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
};

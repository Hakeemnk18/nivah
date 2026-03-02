import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockBannerApi } from "../api/banner.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useBlockBanner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blockBannerApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
            toast.success("Banner blocked successfully");
        },
        onError: (error) => {
            handleApiError(error)
        },
    });
};
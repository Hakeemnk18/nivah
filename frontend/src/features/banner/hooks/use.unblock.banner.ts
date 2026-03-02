import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockBannerApi } from "../api/banner.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useUnblockBanner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unblockBannerApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
            toast.success("Banner unblocked successfully");
        },
        onError: (error) => {
            handleApiError(error)
        },
    });
}
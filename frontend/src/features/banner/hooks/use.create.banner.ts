import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBannerApi } from "../api/banner.api";
import type { CreateBannerPayload } from "../types/banner.type";

export const useCreateBanner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBannerPayload) => createBannerApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
        },
    });
};
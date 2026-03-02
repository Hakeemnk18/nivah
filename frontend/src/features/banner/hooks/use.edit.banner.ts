import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../../../shared/types/api.types";
import { editBannerApi } from "../api/banner.api";
import type { UpdateBannerParams } from "../types/banner.type";

export const useEditBanner = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, UpdateBannerParams>({
        mutationFn: ({ id, data }) => editBannerApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
        },
    });
};  
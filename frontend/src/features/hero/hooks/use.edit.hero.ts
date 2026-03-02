import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../../../shared/types/api.types";
import { editHeroApi } from "../api/hero.api";
import type { UpdateHeroParams } from "../types/hero.type";

export const useEditHero = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, UpdateHeroParams>({
        mutationFn: ({ id, data }) => editHeroApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-heroes"] });
        },
    });
};  
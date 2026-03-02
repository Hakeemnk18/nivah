import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHeroApi } from "../api/hero.api";
import type { CreateHeroPayload } from "../types/hero.type";

export const useCreateHero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateHeroPayload) => createHeroApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-heroes"] });
        },
    });
};
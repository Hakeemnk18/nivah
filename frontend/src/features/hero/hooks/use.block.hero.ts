import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockHeroApi } from "../api/hero.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useBlockHero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blockHeroApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-heroes"] });
            toast.success("Hero blocked successfully");
        },
        onError: (error) => {
            handleApiError(error)
        },
    });
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockHeroApi } from "../api/hero.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useUnblockHero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unblockHeroApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-heroes"] });
            toast.success("Hero unblocked successfully");
        },
        onError: (error) => {
            handleApiError(error)
        },
    });
}
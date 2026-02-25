import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptOrderApi } from "../api/order.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";


export const useAcceptOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptOrderApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
            toast.success(data.message);
        },
        onError: (error) => {
            handleApiError(error)
        }
    });
};
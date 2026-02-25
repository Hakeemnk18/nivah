import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliverOrderApi } from "../api/order.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";


export const useDeliverOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deliverOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
            toast.success("Order delivered successfully");
        },
        onError: (error) => {
            handleApiError(error)
        }
    });
};
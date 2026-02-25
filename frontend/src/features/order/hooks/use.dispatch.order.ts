import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dispatchOrderApi } from "../api/order.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useDispatchOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: dispatchOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
            toast.success("Order dispatched successfully");
        },
        onError: (error) => {
            handleApiError(error)
        }
    });
};
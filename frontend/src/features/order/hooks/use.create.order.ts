import { useMutation } from "@tanstack/react-query";
import { createOrderApi } from "../api/order.api";

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: createOrderApi,
    });
};
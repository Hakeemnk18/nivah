import { useMutation } from "@tanstack/react-query";
import { syncPaymentApi } from "../api/order.api";

export const useSyncPayment = () => {
    return useMutation({
        mutationFn: syncPaymentApi,
    });
};
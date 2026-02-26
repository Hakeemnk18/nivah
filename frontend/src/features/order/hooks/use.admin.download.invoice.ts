import { useMutation } from "@tanstack/react-query";
import { adminDownloadInvoiceApi } from "../api/order.api";

export const useAdminDownloadInvoice = () => {
    return useMutation({
        mutationFn: ({
            orderId,
        }: {
            orderId: string;
        }) => adminDownloadInvoiceApi(orderId),
    });
};
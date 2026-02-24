import { useMutation } from "@tanstack/react-query";
import { downloadInvoiceApi } from "../api/order.api";

export const useDownloadInvoice = () => {
    return useMutation({
        mutationFn: ({
            orderId,
            guestId,
        }: {
            orderId: string;
            guestId: string;
        }) => downloadInvoiceApi(orderId, guestId),
    });
};
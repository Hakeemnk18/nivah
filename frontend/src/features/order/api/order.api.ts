import api from "../../../api/axios.instance";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { CreateOrderResponse, OrderPlacementPayload, OrderSummaryResponse } from "../types/order.type";


/* ---------- CREATE ORDER ---------- */
export const createOrderApi = async (
    data: OrderPlacementPayload
): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>("/orders", data);
    return response.data;
};

/* ---------- GET ORDER SUMMARY ---------- */
export const getOrderSummaryApi = async (
    orderId: string,
    guestId: string
): Promise<OrderSummaryResponse> => {
    const response = await api.get<OrderSummaryResponse>(`/orders/${orderId}/order-summary?guestId=${guestId}`);
    return response.data;
};

/* ---------- DOWNLOAD INVOICE ---------- */
export const downloadInvoiceApi = async (
    orderId: string,
    guestId: string
): Promise<Blob> => {
    console.log("api called order id ", orderId)
    const response = await api.get<Blob>
        (`/orders/${orderId}/invoice?guestId=${guestId}`, {
            responseType: "blob",
        });
    return response.data;
};

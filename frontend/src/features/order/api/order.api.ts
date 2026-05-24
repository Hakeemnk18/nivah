import api from "../../../api/axios.instance";
import type { ApiResponse } from "../../../shared/types/api.types";
import type {
    AdminOrderFullResponse,
    AdminOrderListResponse,
    CreateOrderResponse,
    OrderPlacementPayload,
    OrderSummaryResponse,
    SyncPaymentResponse
} from "../types/order.type";


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
    const response = await api.get<Blob>
        (`/orders/${orderId}/invoice?guestId=${guestId}`, {
            responseType: "blob",
        });
    return response.data;
};

/* ---------- GET ADMIN ORDER LIST ---------- */
export const getAdminOrderListApi = async (
    query: Record<string, any>
): Promise<AdminOrderListResponse> => {
    const response = await api.get<AdminOrderListResponse>(`/orders`, {
        params: query
    });
    return response.data;
};

/* ---------- DISPATCH ORDER ---------- */
export const dispatchOrderApi = async (
    orderId: string
): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/orders/${orderId}/dispatch`);
    return response.data;
};

/* ---------- DELIVER ORDER ---------- */
export const deliverOrderApi = async (
    orderId: string
): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/orders/${orderId}/deliver`);
    return response.data;
};

/* ---------- ACCEPT ORDER ---------- */
export const acceptOrderApi = async (
    orderId: string
): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/orders/${orderId}/accept`);
    return response.data;
};

/* ---------- CANCEL ORDER ---------- */
export const cancelOrderApi = async (
    orderId: string
): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/orders/${orderId}/cancel`);
    return response.data;
};

/* ---------- GET ADMIN ORDER DETAILS ---------- */

export const getAdminOrderDetailsApi = async (
    orderId: string
): Promise<AdminOrderFullResponse> => {
    const response = await api.get<AdminOrderFullResponse>(`/orders/${orderId}`);
    return response.data;
};

/* ---------- DOWNLOAD INVOICE ---------- */
export const adminDownloadInvoiceApi = async (
    orderId: string,
): Promise<Blob> => {

    const response = await api.get<Blob>
        (`/orders/${orderId}/invoice/download`, {
            responseType: "blob",
        });
    return response.data;
};

export const syncPaymentApi = async (
    orderId: string
): Promise<SyncPaymentResponse> => {
    const response = await api.post<SyncPaymentResponse>(`/orders/${orderId}/sync-payment`);
    return response.data;
};

/* ---------- VERIFY PAYMENT (test mode only) ----------
   Confirms the order immediately after the Razorpay popup succeeds —
   bypasses the need for a webhook. Only used when VITE_PAYMENT_MODE=test.
-------------------------------------------------------- */
export const verifyPaymentApi = async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}): Promise<void> => {
    await api.post("/orders/verify-payment", data);
};



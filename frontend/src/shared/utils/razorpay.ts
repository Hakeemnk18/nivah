
import toast from "react-hot-toast";
import type { IRazorpayOrder, IRazorpayOptions } from "../../features/order/types/order.type";
import type { ApiResponse } from "../types/api.types";
import { handleApiError } from "./handle.api.error";
import api from "../../api/axios.instance"
const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;


export const openRazorpayCheckout = (options: IRazorpayOptions) => {
    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response);

        toast.error(response?.error?.description || "Payment failed");
    });
    rzp.open();
};

export const openRazorpayCheckoutFunction = (
    order: IRazorpayOrder,
    onHandle: (orderId: string, response: any) => {}
) => {
    if (!keyId) {
        toast.error("Payment configuration error");
        return;
    }
    openRazorpayCheckout({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Nivah",
        description: "Payment for order",
        order_id: order.id,
        notes: order.notes,
        handler: async (response: any) => {
            onHandle(order.notes.appOrderId, response)
        },
        prefill: {
            email: "user@example.com",
            contact: "9999999999",
        },

        modal: {
            ondismiss: () => {
                toast("Payment popup closed");
            }
        },
    });
}
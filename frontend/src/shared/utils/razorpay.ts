
import toast from "react-hot-toast";
import type { IRazorpayOrder, IRazorpayOptions } from "../../features/order/types/order.type";
const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;


export const openRazorpayCheckout = (options: IRazorpayOptions) => {
    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", (response: any) => {
        if (options.onPaymentFailed) {
            options.onPaymentFailed(response);
        }
    });
    rzp.open();
};

export const openRazorpayCheckoutFunction = (
    order: IRazorpayOrder,
    onHandle: (orderId: string) => {},
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
        handler: async () => {
            onHandle(order.notes.appOrderId)
        },
        prefill: {
            email: "user@example.com",
            contact: "9999999999",
        },

        modal: {
            ondismiss: () => {
                console.log("User closed payment popup");

            }
        },
        onPaymentFailed: () => {
            toast.error("Payment failed");
        }
    });
}
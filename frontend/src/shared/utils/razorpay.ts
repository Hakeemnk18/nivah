
import toast from "react-hot-toast";
import type { IRazorpayOrder, IRazorpayOptions } from "../../features/order/types/order.type";
const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
const testKeyId = import.meta.env.VITE_RAZORPAY_TEST_KEY_ID;

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

/* ─────────────────────────────────────────────────────────────────────────────
   TEST MODE — calls verify-payment immediately after the popup succeeds so
   the order is confirmed without waiting for a webhook (safe for localhost).
   Switch via VITE_PAYMENT_MODE=test in frontend/.env
   ───────────────────────────────────────────────────────────────────────────── */
type RazorpayPaymentResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

export const openRazorpayCheckoutTestFunction = (
    order: IRazorpayOrder,
    onHandle: (orderId: string) => void,
    onVerify: (paymentResponse: RazorpayPaymentResponse) => Promise<void>,
) => {
    if (!testKeyId) {
        toast.error("Payment configuration error");
        return;
    }
    openRazorpayCheckout({
        key: testKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "Nivah [TEST]",
        description: "Payment for order",
        order_id: order.id,
        notes: order.notes,
        handler: async (response: RazorpayPaymentResponse) => {
            try {
                await onVerify(response);
                onHandle(order.notes.appOrderId);
            } catch {
                toast.error("Payment verification failed");
            }
        },
        prefill: {
            email: "test@example.com",
            contact: "9999999999",
        },
        modal: {
            ondismiss: () => {
                console.log("[TEST] User closed payment popup");
            }
        },
        onPaymentFailed: () => {
            toast.error("[TEST] Payment failed");
        }
    });
}
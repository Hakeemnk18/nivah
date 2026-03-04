import type { ClientSession } from "mongoose";
export declare const PAYMENT_STATUS: readonly ["created", "authorized", "captured", "failed", "refunded"];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export declare const PAYMENT_MODE: readonly ["upi", "card", "netbanking", "wallet", "emi"];
export type PaymentMode = (typeof PAYMENT_MODE)[number];
export type ChangeStatusPayload = {
    orderId: string;
    status: PaymentStatus;
    session?: ClientSession;
    reason?: string;
};
export type FailPaymentPayload = {
    paymentId: string;
    providerPaymentId: string;
    reason: string;
    session?: ClientSession;
};
export type ConfirmPaymentPayload = {
    paymentId: string;
    paymentMode: PaymentMode;
    providerOrderId: string;
    providerPaymentId: string;
    currency: string;
    amount: number;
    session?: ClientSession;
};
//# sourceMappingURL=payment.type.d.ts.map
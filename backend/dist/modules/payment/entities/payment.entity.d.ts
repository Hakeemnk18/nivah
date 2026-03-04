import { type PaymentMode, type PaymentStatus } from "../types/payment.type.js";
export type PaymentProps = {
    id?: string | null;
    orderId: string;
    userId: string | null;
    guestId: string | null;
    provider: string | undefined;
    providerOrderId: string;
    providerPaymentId?: string | undefined;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMode: PaymentMode;
    failureReason?: string | undefined;
};
export declare class Payment {
    readonly id: string | null;
    readonly orderId: string;
    readonly userId: string | null;
    readonly guestId: string | null;
    readonly provider: string | undefined;
    readonly providerOrderId: string;
    readonly providerPaymentId?: string | undefined;
    readonly amount: number;
    readonly currency: string;
    readonly status: PaymentStatus;
    readonly paymentMode: PaymentMode;
    readonly failureReason?: string | undefined;
    constructor(props: PaymentProps);
    authorize(params: {
        providerPaymentId: string;
        providerSignature: string;
        paymentMode?: PaymentMode;
    }): Payment;
    capture(): Payment;
    fail(reason: string, paymentId: string): Payment;
    refund(): Payment;
}
//# sourceMappingURL=payment.entity.d.ts.map
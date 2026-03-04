declare const ALLOWED_PAYMENT_MODES: readonly ["upi", "card", "netbanking", "wallet", "emi"];
type PaymentMode = typeof ALLOWED_PAYMENT_MODES[number];
export declare const mapPaymentMode: (method: string) => PaymentMode;
export {};
//# sourceMappingURL=get.payment.method.d.ts.map
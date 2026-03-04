const ALLOWED_PAYMENT_MODES = [
    "upi",
    "card",
    "netbanking",
    "wallet",
    "emi",
];
export const mapPaymentMode = (method) => {
    if (ALLOWED_PAYMENT_MODES.includes(method)) {
        return method;
    }
    throw new Error(`Unsupported payment method: ${method}`);
};
//# sourceMappingURL=get.payment.method.js.map
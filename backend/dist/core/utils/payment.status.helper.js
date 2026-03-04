export function mapRazorpayStatus(status) {
    switch (status) {
        case "created":
            return "created";
        case "authorized":
            return "authorized";
        case "captured":
            return "captured";
        case "failed":
            return "failed";
        case "refunded":
            return "refunded";
        default:
            throw new Error(`Unknown Razorpay status: ${status}`);
    }
}
//# sourceMappingURL=payment.status.helper.js.map
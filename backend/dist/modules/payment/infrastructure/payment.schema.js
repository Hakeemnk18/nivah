import { Schema, model, Document, Types } from "mongoose";
import { PAYMENT_MODE, PAYMENT_STATUS } from "../types/payment.type.js";
/* ---------- SCHEMA ---------- */
const paymentSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        index: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    guestId: {
        type: String,
        trim: true,
        default: null
    },
    provider: {
        type: String,
        required: true,
        default: "razorpay",
        trim: true,
        index: true,
    },
    providerOrderId: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    providerPaymentId: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        default: "INR",
        uppercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: PAYMENT_STATUS,
        default: "created",
        index: true,
    },
    paymentMode: {
        type: String,
        enum: PAYMENT_MODE,
    },
    failureReason: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
export const PaymentModel = model("Payment", paymentSchema);
//# sourceMappingURL=payment.schema.js.map
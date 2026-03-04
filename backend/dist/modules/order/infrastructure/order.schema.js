import { Schema, model, Document, Types } from "mongoose";
/* ---------- SCHEMA ---------- */
const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
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
    /* ---------- USER SNAPSHOT ---------- */
    userSnapshot: {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        addressLine1: { type: String, required: true, trim: true },
        addressLine2: { type: String, default: "", trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        pincode: { type: String, required: true, trim: true },
    },
    /* ---------- PRICING ---------- */
    subtotal: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingFee: {
        type: Number,
        required: true,
        min: 0,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    /* ---------- STATUS ---------- */
    orderStatus: {
        type: String,
        enum: ["created", "confirmed", "accepted", "dispatched", "cancelled"],
        default: "created",
        index: true,
    },
    cancelReason: {
        type: String,
        trim: true,
    },
    confirmedAt: Date,
    acceptedAt: Date,
    dispatchedAt: Date,
    cancelledAt: Date,
    deliveredAt: Date,
    /* ---------- ITEMS SNAPSHOT ---------- */
    items: {
        type: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                variantId: {
                    type: Schema.Types.ObjectId,
                    ref: "ProductVariant",
                    required: true,
                },
                size: {
                    type: String,
                    required: true,
                    trim: true,
                },
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "Order must contain at least one item",
        },
    },
}, {
    timestamps: true,
});
export const OrderModel = model("Order", orderSchema);
//# sourceMappingURL=order.schema.js.map
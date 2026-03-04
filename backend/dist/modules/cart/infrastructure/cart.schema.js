import { Schema, model, Document, Types } from "mongoose";
const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index: true,
    },
    guestId: {
        type: String,
        default: null,
        index: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            variantId: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, {
    timestamps: true,
});
export const CartModel = model("Cart", cartSchema);
//# sourceMappingURL=cart.schema.js.map
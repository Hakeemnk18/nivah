import { Schema, model, Document, Types } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [
            {
                url: {
                    type: String,
                    required: true,
                    trim: true,
                },
                publicId: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "At least one image is required",
        },
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", // sub-category
        required: true,
    },
    /* ---------- Variants (Embedded) ---------- */
    variants: [
        {
            size: {
                type: String,
                required: true,
                uppercase: true,
                trim: true,
            },
            stock: {
                type: Number,
                required: true,
                min: 0,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    timestamps: true,
});
/* ---------- Indexes ---------- */
productSchema.index({ category: 1 });
productSchema.index({ "variants.size": 1 });
productSchema.index({ isDeleted: 1, isActive: 1 });
export const ProductModel = model("Product", productSchema);
//# sourceMappingURL=product.schema.js.map
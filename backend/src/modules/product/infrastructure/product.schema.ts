import { Schema, model, Document, Types } from "mongoose";
import type { IImage, IVariant } from "../types/product.type.js";

export interface IProduct extends Document {
  name: string;
  description: string;
  images: IImage[];
  category: Types.ObjectId; // sub-category
  variants: IVariant[];
  isActive: boolean;
  isFeatured: boolean;
}

const productSchema = new Schema<IProduct>(
  {
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
        validator: (v: { url: string; publicId: string }[]) => v.length > 0,
        message: "At least one image is required",
      },
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // sub-category
      required: true,
      index: true,
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

        isAvailable: {
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
  },
  {
    timestamps: true,
  },
);

/* ---------- Indexes ---------- */
productSchema.index({ category: 1 });
productSchema.index({ "variants.size": 1 });
productSchema.index({ isDeleted: 1, isActive: 1 });

export const ProductModel = model<IProduct>("Product", productSchema);

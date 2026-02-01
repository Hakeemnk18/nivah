import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  parentId: Types.ObjectId | null;
  isActive: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const CategoryModel = model<ICategory>("Category", categorySchema);

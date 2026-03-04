import { Schema, model, Document, Types } from "mongoose";
const categorySchema = new Schema({
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
}, {
    timestamps: true, // createdAt & updatedAt
});
export const CategoryModel = model("Category", categorySchema);
//# sourceMappingURL=category.schema.js.map
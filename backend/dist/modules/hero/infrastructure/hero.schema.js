import { Schema, model, Document } from "mongoose";
const heroSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subtitle: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, {
    timestamps: true,
});
export const HeroModel = model("Hero", heroSchema);
//# sourceMappingURL=hero.schema.js.map
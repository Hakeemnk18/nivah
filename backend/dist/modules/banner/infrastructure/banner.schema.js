import { Schema, model, Document } from "mongoose";
const bannerSchema = new Schema({
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
export const BannerModel = model("Banner", bannerSchema);
//# sourceMappingURL=banner.schema.js.map
import { Schema, model, Document } from "mongoose";

export interface IBanner extends Document {
    image: {
        url: string;
        publicId: string;
    };
    link?: string;
    isActive: boolean;
}

const bannerSchema = new Schema<IBanner>(
    {
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
        link: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BannerModel = model<IBanner>("Banner", bannerSchema);
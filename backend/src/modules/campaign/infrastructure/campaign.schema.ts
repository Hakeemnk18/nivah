import { Schema, model, Document } from "mongoose";

export interface ICampaign extends Document {
    title: string;
    subtitle: string;
    slug: string;
    image: {
        url: string;
        publicId: string;
    };
    isActive: boolean;
}

const campaignSchema = new Schema<ICampaign>(
    {
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
        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
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
    },
    {
        timestamps: true,
    }
);

export const CampaignModel = model<ICampaign>("Campaign", campaignSchema);

import { Schema, model, Document } from "mongoose";

export interface IHero extends Document {
    title: string;
    subtitle: string;
    image: {
        url: string;
        publicId: string;
    };
    isActive: boolean;
}

const heroSchema = new Schema<IHero>(
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

export const HeroModel = model<IHero>("Hero", heroSchema);
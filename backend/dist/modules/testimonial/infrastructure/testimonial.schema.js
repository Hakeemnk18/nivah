import { Schema, model, Document } from "mongoose";
const testimonialSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, {
    timestamps: true,
});
export const TestimonialModel = model("Testimonial", testimonialSchema);
//# sourceMappingURL=testimonial.schema.js.map
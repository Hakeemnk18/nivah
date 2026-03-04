import { Document } from "mongoose";
export interface ITestimonial extends Document {
    comment: string;
    author: string;
    isActive: boolean;
}
export declare const TestimonialModel: import("mongoose").Model<ITestimonial, {}, {}, {}, Document<unknown, {}, ITestimonial, {}, import("mongoose").DefaultSchemaOptions> & ITestimonial & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITestimonial>;
//# sourceMappingURL=testimonial.schema.d.ts.map
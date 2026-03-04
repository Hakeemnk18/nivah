import { Document, Types } from "mongoose";
import type { IImage, IVariant } from "../types/product.type.js";
export interface IProduct extends Document {
    name: string;
    description: string;
    images: IImage[];
    category: Types.ObjectId;
    variants: IVariant[];
    isActive: boolean;
    isFeatured: boolean;
}
export declare const ProductModel: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
//# sourceMappingURL=product.schema.d.ts.map
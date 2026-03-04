import { Document, Types } from "mongoose";
export interface ICart extends Document {
    userId: Types.ObjectId | null;
    guestId: string | null;
    items: {
        productId: Types.ObjectId;
        variantId: Types.ObjectId;
        quantity: number;
    }[];
    isActive: boolean;
}
export declare const CartModel: import("mongoose").Model<ICart, {}, {}, {}, Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICart>;
//# sourceMappingURL=cart.schema.d.ts.map
import { Document, Types } from "mongoose";
import type { OrderStatus } from "../types/order.type.js";
export interface IOrderItem {
    productId: Types.ObjectId;
    variantId: Types.ObjectId;
    size: string;
    name: string;
    price: number;
    quantity: number;
}
export interface IUserSnapshot {
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
}
export interface IOrder extends Document {
    orderNumber: string;
    userId: Types.ObjectId;
    guestId: string;
    userSnapshot: IUserSnapshot;
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    orderStatus: OrderStatus;
    cancelReason?: string;
    createdAt?: Date;
    confirmedAt?: Date;
    acceptedAt?: Date;
    dispatchedAt?: Date;
    deliveredAt?: Date;
    cancelledAt?: Date;
    items: IOrderItem[];
}
export declare const OrderModel: import("mongoose").Model<IOrder, {}, {}, {}, Document<unknown, {}, IOrder, {}, import("mongoose").DefaultSchemaOptions> & IOrder & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOrder>;
//# sourceMappingURL=order.schema.d.ts.map
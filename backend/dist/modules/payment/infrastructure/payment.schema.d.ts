import { Document, Types } from "mongoose";
import { type PaymentMode, type PaymentStatus } from "../types/payment.type.js";
export interface IPayment extends Document {
    orderId: Types.ObjectId;
    userId: Types.ObjectId;
    guestId: string;
    provider: string;
    providerOrderId: string;
    providerPaymentId?: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMode?: PaymentMode;
    failureReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PaymentModel: import("mongoose").Model<IPayment, {}, {}, {}, Document<unknown, {}, IPayment, {}, import("mongoose").DefaultSchemaOptions> & IPayment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPayment>;
//# sourceMappingURL=payment.schema.d.ts.map
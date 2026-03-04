import { Payment } from "../entities/payment.entity.js";
import type { IPaymentRepository } from "./payment.repository.interface.js";
import type { ChangeStatusPayload, ConfirmPaymentPayload, FailPaymentPayload } from "../types/payment.type.js";
import type { ClientSession } from "mongoose";
export declare class PaymentRepository implements IPaymentRepository {
    create(paymentEntity: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    save(paymentEntity: Payment, session?: ClientSession): Promise<Payment>;
    changeStatus(payload: ChangeStatusPayload): Promise<void>;
    findByProviderOrderId(providerOrderId: string, session?: ClientSession): Promise<Payment | null>;
    autoCancelPayment(orderIds: string[], session?: ClientSession): Promise<void>;
    failPayment(payload: FailPaymentPayload): Promise<void>;
    confirmPayment(payload: ConfirmPaymentPayload): Promise<void>;
}
//# sourceMappingURL=payment.repository.d.ts.map
import { Payment } from "../entities/payment.entity.js";
import type { PaymentStatus } from "../types/payment.type.js";

export interface IPaymentRepository {
    create(paymentEntity: Payment): Promise<Payment>;

    save(paymentEntity: Payment): Promise<Payment>;

    findById(id: string): Promise<Payment | null>;

    changeStatus(id: string, status: PaymentStatus): Promise<Payment>;
}

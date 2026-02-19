import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";

import { Payment } from "../entities/payment.entity.js";
import { PaymentModel } from "../infrastructure/payment.schema.js";
import { PaymentMapper } from "../mappers/payment.mapper.js";

import type { IPaymentRepository } from "./payment.repository.interface.js";
import type { PaymentStatus } from "../types/payment.type.js";

export class PaymentRepository implements IPaymentRepository {

    /* ---------- CREATE ---------- */
    async create(paymentEntity: Payment): Promise<Payment> {
        const persistenceData = PaymentMapper.toPersistence(paymentEntity);

        const created = await PaymentModel.create(persistenceData);

        const domainPayment = PaymentMapper.toDomain(created);

        if (!domainPayment) {
            throw new CustomError(
                ResponseMessages.FAILED_TO_MAP,
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }

        return domainPayment;
    }

    /* ---------- FIND BY ID ---------- */
    async findById(id: string): Promise<Payment | null> {
        const foundDocument = await PaymentModel.findOne({ _id: id }).lean();

        return PaymentMapper.toDomain(foundDocument);
    }

    /* ---------- SAVE FULL ENTITY ---------- */
    async save(paymentEntity: Payment): Promise<Payment> {
        if (!paymentEntity.id) {
            throw new CustomError(
                ResponseMessages.ID_MISSING,
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }

        const persistenceData = PaymentMapper.toPersistence(paymentEntity);

        const updatedDocument = await PaymentModel.findByIdAndUpdate(
            paymentEntity.id,
            { $set: persistenceData },
            { new: true },
        ).lean();

        if (!updatedDocument) {
            throw new CustomError(
                ResponseMessages.PAYMENT_NOT_FOUND,
                HttpStatusCode.NOT_FOUND,
            );
        }

        const domainPayment = PaymentMapper.toDomain(updatedDocument);

        if (!domainPayment) {
            throw new CustomError(
                ResponseMessages.FAILED_TO_MAP,
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }

        return domainPayment;
    }

    /* ---------- CHANGE STATUS ONLY ---------- */
    async changeStatus(
        id: string,
        status: PaymentStatus,
    ): Promise<Payment> {
        const updatedDocument = await PaymentModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true },
        ).lean();

        if (!updatedDocument) {
            throw new CustomError(
                ResponseMessages.PAYMENT_NOT_FOUND,
                HttpStatusCode.NOT_FOUND,
            );
        }

        const domainPayment = PaymentMapper.toDomain(updatedDocument);

        if (!domainPayment) {
            throw new CustomError(
                ResponseMessages.FAILED_TO_MAP,
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }

        return domainPayment;
    }
}

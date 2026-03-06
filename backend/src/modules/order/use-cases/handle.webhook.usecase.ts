import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { mapRazorpayStatus } from "../../../core/utils/payment.status.helper.js";
import type { IHandleRazorpayWebhookUseCase } from "./interfaces/handle.webhook.use-case.interface.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { RazorpayWebhookEvent } from "../types/order.type.js";
import { Payment } from "../../payment/entities/payment.entity.js";
import { mapPaymentMode } from "../../../core/utils/get.payment.method.js";

@injectable()
export class HandleRazorpayWebhookUseCase
    implements IHandleRazorpayWebhookUseCase {

    constructor(
        @inject("IPaymentRepository")
        private readonly _paymentRepository: IPaymentRepository,

        @inject("IOrderRepository")
        private readonly _orderRepository: IOrderRepository,

        @inject("IProductRepository")
        private readonly _productRepository: IProductRepository,

        @inject("ICartRepository")
        private readonly _cartRepository: ICartRepository,
    ) { }

    async execute(event: RazorpayWebhookEvent): Promise<void> {

        if (!event?.payload?.payment?.entity) {
            return; // ignore malformed webhook
        }

        const paymentEntity = event.payload.payment.entity;

        const session = await mongoose.startSession();
        try {
            const payment = await this._paymentRepository
                .findByProviderOrderId(paymentEntity.order_id, session);

            if (!payment) {
                await session.abortTransaction();
                return;

            }

            // STRONG IDEMPOTENCY
            const mappedStatus = mapRazorpayStatus(paymentEntity.status);

            if (payment.status === mappedStatus) {
                await session.abortTransaction();
                return;
            }


            session.startTransaction();

            switch (event.event) {

                case "payment.captured":
                    await this.handleCaptured(
                        payment,
                        paymentEntity,
                        session
                    );
                    break;
                default:
                    break;
            }
            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    private async handleCaptured(
        payment: Payment,
        entity: RazorpayWebhookEvent["payload"]["payment"]["entity"],
        session: mongoose.ClientSession
    ): Promise<void> {
        console.log("handle captured called")
        const order = await this._orderRepository
            .findById(payment.orderId, session);

        if (!order) return;

        if (order.orderStatus === "confirmed") return;

        const expectedAmount = order.totalAmount * 100;

        if (entity.amount !== expectedAmount) {
            return;
        }

        const newPayment = new Payment({
            id: payment.id,
            orderId: payment.orderId,
            userId: payment.userId,
            guestId: payment.guestId,
            provider: "razorpay",
            providerOrderId: entity.order_id,
            providerPaymentId: entity.id,
            amount: entity.amount,
            currency: entity.currency,
            status: mapRazorpayStatus(entity.status),
            paymentMode: mapPaymentMode(entity.method!),
        })

        await this._paymentRepository.save(newPayment, session);

        await this._orderRepository.changeStatus(
            payment.orderId,
            "confirmed",
            session
        );

        if (payment.guestId) {
            await this._cartRepository.emptyCart(
                payment.guestId,
                session
            );
        }
    }
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { mapRazorpayStatus } from "../../../core/utils/payment.status.helper.js";
import { Payment } from "../../payment/entities/payment.entity.js";
import { mapPaymentMode } from "../../../core/utils/get.payment.method.js";
let HandleRazorpayWebhookUseCase = class HandleRazorpayWebhookUseCase {
    _paymentRepository;
    _orderRepository;
    _productRepository;
    _cartRepository;
    constructor(_paymentRepository, _orderRepository, _productRepository, _cartRepository) {
        this._paymentRepository = _paymentRepository;
        this._orderRepository = _orderRepository;
        this._productRepository = _productRepository;
        this._cartRepository = _cartRepository;
    }
    async execute(event) {
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
                    await this.handleCaptured(payment, paymentEntity, session);
                    break;
                case "payment.failed":
                    await this.handleFailed(payment, session);
                    break;
                default:
                    break;
            }
            await session.commitTransaction();
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async handleCaptured(payment, entity, session) {
        const order = await this._orderRepository
            .findById(payment.orderId, session);
        if (!order)
            return;
        if (order.orderStatus === "confirmed")
            return;
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
            paymentMode: mapPaymentMode(entity.method),
        });
        await this._paymentRepository.save(newPayment, session);
        await this._orderRepository.changeStatus(payment.orderId, "confirmed", session);
        if (payment.guestId) {
            await this._cartRepository.emptyCart(payment.guestId, session);
        }
    }
    async handleFailed(payment, session) {
        // if (payment.status === "failed") return;
        // const order = await this._orderRepository
        //     .findById(payment.orderId, session);
        // if (!order) return;
        // if (order.orderStatus === "cancelled") return;
        // for (const item of order.items) {
        //     await this._productRepository.incrementStock({
        //         productId: item.productId,
        //         variantId: item.variantId,
        //         quantity: item.quantity,
        //         session,
        //     });
        // }
        // await this._orderRepository.changeStatus(
        //     payment.orderId,
        //     "cancelled",
        //     session
        // );
        // await this._paymentRepository.updateStatus(
        //     payment.id,
        //     "failed",
        //     session
        // );
    }
};
HandleRazorpayWebhookUseCase = __decorate([
    injectable(),
    __param(0, inject("IPaymentRepository")),
    __param(1, inject("IOrderRepository")),
    __param(2, inject("IProductRepository")),
    __param(3, inject("ICartRepository")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], HandleRazorpayWebhookUseCase);
export { HandleRazorpayWebhookUseCase };
//# sourceMappingURL=handle.webhook.usecase.js.map
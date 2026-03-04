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
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import mongoose from "mongoose";
import { Payment } from "../../payment/entities/payment.entity.js";
let HandlePaymentFailureUseCase = class HandlePaymentFailureUseCase {
    _paymentRepository;
    _orderRepository;
    _cartRepository;
    _productRepository;
    constructor(_paymentRepository, _orderRepository, _cartRepository, _productRepository) {
        this._paymentRepository = _paymentRepository;
        this._orderRepository = _orderRepository;
        this._cartRepository = _cartRepository;
        this._productRepository = _productRepository;
    }
    async execute(dto) {
        //LOAD PAYMENT BY PROVIDER ORDER ID
        const payment = await this._paymentRepository.findByProviderOrderId(dto.razorpay_order_id);
        if (!payment) {
            throw new CustomError(ResponseMessages.PAYMENT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        // STEP 2 — IDEMPOTENCY CHECK
        // If already failed or cancelled, exit safely
        if (payment.status === "failed") {
            return;
        }
        //if payment is already captured
        if (payment.status === "captured") {
            throw new CustomError(ResponseMessages.PAYMENT_ALREADY_CAPTURED, HttpStatusCode.BAD_REQUEST);
        }
        // STEP 3 — LOAD ORDER
        const order = await this._orderRepository.findById(payment.orderId);
        if (!order) {
            throw new CustomError(ResponseMessages.ORDER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (order.orderStatus === "cancelled") {
            return;
        }
        // STEP 4 — START DB TRANSACTION
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            // STEP 5 — RESTORE STOCK (CRITICAL)
            for (const item of order.items) {
                const product = await this._productRepository.findById(item.productId, session);
                if (!product) {
                    throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
                }
                const variant = product.variants.find((v) => v.id === item.variantId);
                if (!variant) {
                    throw new CustomError(ResponseMessages.PRODUCT_VARIANT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
                }
                await this._productRepository.incrementStock({
                    productId: product.id,
                    variantId: variant.id,
                    quantity: item.quantity,
                    session,
                });
            }
            // STEP 6 — UPDATE PAYMENT STATUS
            await this._paymentRepository.failPayment({
                paymentId: payment.id,
                reason: dto.failure_reason ?? "Payment failed",
                providerPaymentId: dto.razorpay_payment_id,
                session,
            });
            // STEP 7 — CANCEL ORDER 
            await this._orderRepository.cancelOrder(order.id, session);
            // STEP 8 — COMMIT TRANSACTION
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
};
HandlePaymentFailureUseCase = __decorate([
    injectable(),
    __param(0, inject("IPaymentRepository")),
    __param(1, inject("IOrderRepository")),
    __param(2, inject("ICartRepository")),
    __param(3, inject("IProductRepository")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], HandlePaymentFailureUseCase);
export { HandlePaymentFailureUseCase };
//# sourceMappingURL=failure.payment.use-case.js.map
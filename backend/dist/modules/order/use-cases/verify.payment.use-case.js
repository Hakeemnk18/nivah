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
import crypto from "crypto";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { mapRazorpayStatus } from "../../../core/utils/payment.status.helper.js";
import { Payment } from "../../payment/entities/payment.entity.js";
import { mapPaymentMode } from "../../../core/utils/get.payment.method.js";
import mongoose from "mongoose";
let VerifyPaymentUseCase = class VerifyPaymentUseCase {
    _paymentRepository;
    _orderRepository;
    _paymentGateway;
    _cartRepository;
    _productRepository;
    _notificationService;
    constructor(_paymentRepository, _orderRepository, _paymentGateway, _cartRepository, _productRepository, _notificationService) {
        this._paymentRepository = _paymentRepository;
        this._orderRepository = _orderRepository;
        this._paymentGateway = _paymentGateway;
        this._cartRepository = _cartRepository;
        this._productRepository = _productRepository;
        this._notificationService = _notificationService;
    }
    async execute(dto) {
        //  LOAD PAYMENT RECORD
        const payment = await this._paymentRepository.findByProviderOrderId(dto.razorpay_order_id);
        if (!payment) {
            throw new CustomError(ResponseMessages.PAYMENT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (payment.status === "captured") {
            return;
        }
        // VERIFY SIGNATURE (CRITICAL SECURITY)
        const body = `${dto.razorpay_order_id}|${dto.razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");
        if (expectedSignature !== dto.razorpay_signature) {
            throw new CustomError(ResponseMessages.INVALID_PAYMENT_SIGNATURE, HttpStatusCode.BAD_REQUEST);
        }
        // FETCH PAYMENT FROM RAZORPAY (SERVER TRUST)
        const razorpayPayment = await this._paymentGateway.fetchPayment(dto.razorpay_payment_id);
        if (razorpayPayment.order_id !== dto.razorpay_order_id) {
            throw new CustomError(ResponseMessages.INVALID_PAYMENT_ORDER_ID, HttpStatusCode.BAD_REQUEST);
        }
        if (!razorpayPayment || razorpayPayment.status !== "captured") {
            throw new CustomError(ResponseMessages.PAYMENT_NOT_CAPTURED, HttpStatusCode.BAD_REQUEST);
        }
        // LOAD ORDER
        const order = await this._orderRepository.findById(payment.orderId);
        if (!order) {
            throw new CustomError(ResponseMessages.ORDER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        // AMOUNT VALIDATION
        // (Razorpay returns amount in paise)
        const expectedAmount = order.totalAmount * 100;
        if (razorpayPayment.amount !== expectedAmount) {
            throw new CustomError(ResponseMessages.INVALID_PAYMENT_AMOUNT, HttpStatusCode.BAD_REQUEST);
        }
        if (order.orderStatus === "confirmed") {
            throw new CustomError(ResponseMessages.ORDER_ALREADY_CONFIRMED, HttpStatusCode.BAD_REQUEST);
        }
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            await this._paymentRepository.confirmPayment({
                paymentId: payment.id,
                providerOrderId: razorpayPayment.order_id,
                providerPaymentId: razorpayPayment.id,
                currency: razorpayPayment.currency,
                amount: razorpayPayment.amount,
                paymentMode: mapPaymentMode(razorpayPayment.method),
                session,
            });
            //  UPDATE ORDER STATUS
            await this._orderRepository.confirmOrder(payment.orderId, session);
            //empty cart
            await this._cartRepository.emptyCart(payment.guestId, session);
            await session.commitTransaction();
            await this._notificationService.sendBookingConfirmation(order.userSnapshot.phone, `✅ Your order has been successfully placed.\nRupees of ${order.totalAmount}\nOrder ID: ${order.id}\nWe will notify you about further updates soon.\nThank you for choosing Nivah!`);
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
VerifyPaymentUseCase = __decorate([
    injectable(),
    __param(0, inject("IPaymentRepository")),
    __param(1, inject("IOrderRepository")),
    __param(2, inject("IPaymentGateway")),
    __param(3, inject("ICartRepository")),
    __param(4, inject("IProductRepository")),
    __param(5, inject("INotificationService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Function])
], VerifyPaymentUseCase);
export { VerifyPaymentUseCase };
//# sourceMappingURL=verify.payment.use-case.js.map
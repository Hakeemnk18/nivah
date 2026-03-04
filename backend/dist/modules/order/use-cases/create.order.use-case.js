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
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { User } from "../../user/entities/user.entity.js";
import { Order } from "../entities/order.entity.js";
import { generateOrderNumber } from "../utils/generate.order.number.js";
import { Payment } from "../../payment/entities/payment.entity.js";
import { mapRazorpayStatus } from "../../../core/utils/payment.status.helper.js";
const SHIPPING_FEE = Number(process.env.DELIVERY_CHARGE);
let CreateOrderUseCase = class CreateOrderUseCase {
    _orderRepository;
    _cartRepository;
    _productRepository;
    _paymentRepository;
    _paymentGateway;
    constructor(_orderRepository, _cartRepository, _productRepository, _paymentRepository, _paymentGateway) {
        this._orderRepository = _orderRepository;
        this._cartRepository = _cartRepository;
        this._productRepository = _productRepository;
        this._paymentRepository = _paymentRepository;
        this._paymentGateway = _paymentGateway;
    }
    async execute(data) {
        /* =========================================================
       VALIDATE ACCEPTED TERMS
   ========================================================= */
        if (!data.acceptedTerms) {
            throw new CustomError(ResponseMessages.ACCEPTED_TERMS_REQUIRED, HttpStatusCode.BAD_REQUEST);
        }
        /* =========================================================
       LOAD USER CART
   ========================================================= */
        const cart = await this._cartRepository.findById(data.cartId);
        if (!cart || cart.guestId !== data.guestId) {
            throw new CustomError(ResponseMessages.CART_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
        }
        if (cart.items.length === 0) {
            throw new CustomError(ResponseMessages.CART_IS_EMPTY, HttpStatusCode.BAD_REQUEST);
        }
        /* =========================================================
           VALIDATE PRODUCTS & RECALCULATE PRICE
           NEVER trust frontend price
        ========================================================= */
        const validatedItems = [];
        let calculatedTotal = 0;
        for (const cartItem of cart.items) {
            // Load latest product from DB
            const product = await this._productRepository.findById(cartItem.productId);
            if (!product || !product.isActive) {
                throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
            }
            // Find selected variant
            const variant = product.variants.find((v) => v.id === cartItem.variantId);
            if (!variant || !variant.isActive) {
                throw new CustomError(ResponseMessages.PRODUCT_VARIANT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
            }
            /* ----- STOCK CHECK ----- */
            if (variant.stock < cartItem.quantity) {
                throw new CustomError(ResponseMessages.PRODUCT_OUT_OF_STOCK, HttpStatusCode.BAD_REQUEST);
            }
            const latestPrice = variant.price;
            const lineTotal = latestPrice * cartItem.quantity;
            calculatedTotal += lineTotal;
            validatedItems.push({
                productId: cartItem.productId,
                variantId: cartItem.variantId,
                size: variant.size,
                name: product.name,
                quantity: cartItem.quantity,
                price: latestPrice,
            });
            await this._productRepository.decrementStock({
                productId: cartItem.productId,
                variantId: cartItem.variantId,
                quantity: cartItem.quantity,
            });
        }
        /* =========================================================
           SAFETY CHECKS
        ========================================================= */
        if (validatedItems.length === 0) {
            throw new CustomError(ResponseMessages.CART_IS_EMPTY, HttpStatusCode.BAD_REQUEST);
        }
        if (calculatedTotal <= 0) {
            throw new CustomError(ResponseMessages.INVALID_ORDER_TOTAL, HttpStatusCode.BAD_REQUEST);
        }
        /* =========================================================
           CREATE DOMAIN ORDER
        ========================================================= */
        const totalRupees = calculatedTotal + SHIPPING_FEE;
        const orderNumber = generateOrderNumber();
        const orderEntity = new Order({
            userId: null,
            items: validatedItems,
            guestId: data.guestId,
            orderNumber,
            userSnapshot: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
            },
            subtotal: calculatedTotal,
            shippingFee: SHIPPING_FEE,
            totalAmount: totalRupees,
            orderStatus: "created",
        });
        /* =========================================================
           STEP 5 — SAVE ORDER
        ========================================================= */
        const createdOrder = await this._orderRepository.create(orderEntity);
        if (!createdOrder.id) {
            throw new CustomError(ResponseMessages.FAILED_TO_CREATE_ORDER, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        /* =========================================================
           CREATE RAZORPAY ORDER
           Amount must be in paise
        ========================================================= */
        const razorpayOrder = await this._paymentGateway.createOrder({
            amount: totalRupees * 100,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
        });
        const newPayment = new Payment({
            orderId: createdOrder.id,
            userId: null,
            guestId: data.guestId,
            provider: "razorpay",
            providerOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            status: mapRazorpayStatus(razorpayOrder.status),
            paymentMode: "upi",
        });
        await this._paymentRepository.create(newPayment);
        return {
            ...razorpayOrder,
            notes: {
                appOrderId: createdOrder.id,
            }
        };
    }
};
CreateOrderUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __param(1, inject("ICartRepository")),
    __param(2, inject("IProductRepository")),
    __param(3, inject("IPaymentRepository")),
    __param(4, inject("IPaymentGateway")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CreateOrderUseCase);
export { CreateOrderUseCase };
//# sourceMappingURL=create.order.use-case.js.map
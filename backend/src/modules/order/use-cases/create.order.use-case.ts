import { inject, injectable } from "tsyringe";
import type { ICreateOrderUseCase } from "./interfaces/create.order.use-case.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { CreateOrderRequestDto } from "../dtos/create.order.dto.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { IRazorpayOrder } from "../types/order.type.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import type { IUserRepository } from "../../user/repositories/user.repository.interface.js";
import { User } from "../../user/entities/user.entity.js";
import { Order, type OrderItem } from "../entities/order.entity.js";
import { generateOrderNumber } from "../utils/generate.order.number.js";
import { Payment } from "../../payment/entities/payment.entity.js";
import { mapRazorpayStatus } from "../../../core/utils/payment.status.helper.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
import type { IPaymentGateway } from "../../../core/ports/payment.service.interface.js";
const SHIPPING_FEE = Number(process.env.DELIVERY_CHARGE);

@injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
    constructor(
        @inject("IOrderRepository")
        private readonly _orderRepository: IOrderRepository,
        @inject("ICartRepository")
        private readonly _cartRepository: ICartRepository,
        @inject("IProductRepository")
        private readonly _productRepository: IProductRepository,

        @inject("IPaymentRepository")
        private readonly _paymentRepository: IPaymentRepository,

        @inject("IPaymentGateway")
        private readonly _paymentGateway: IPaymentGateway,
    ) { }
    async execute(data: CreateOrderRequestDto): Promise<IRazorpayOrder> {
        /* =========================================================
       LOAD USER CART
   ========================================================= */


        const cart = await this._cartRepository.findById(
            data.cartId,
        );


        if (!cart || cart.guestId !== data.guestId) {
            throw new CustomError(
                ResponseMessages.CART_NOT_FOUND,
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (cart.items.length === 0) {
            throw new CustomError(
                ResponseMessages.CART_IS_EMPTY,
                HttpStatusCode.BAD_REQUEST,
            );
        }



        /* =========================================================
           VALIDATE PRODUCTS & RECALCULATE PRICE
           NEVER trust frontend price
        ========================================================= */

        const validatedItems: OrderItem[] = [];
        let calculatedTotal = 0;

        for (const cartItem of cart.items) {

            // Load latest product from DB
            const product = await this._productRepository.findById(
                cartItem.productId,
            );

            if (!product || !product.isActive) {
                throw new CustomError(
                    ResponseMessages.PRODUCT_NOT_FOUND,
                    HttpStatusCode.BAD_REQUEST,
                );
            }

            // Find selected variant
            const variant = product.variants.find(
                (v) => v.id === cartItem.variantId,
            );

            if (!variant || !variant.isActive) {
                throw new CustomError(
                    ResponseMessages.PRODUCT_VARIANT_NOT_FOUND,
                    HttpStatusCode.BAD_REQUEST,
                );
            }

            /* ----- STOCK CHECK ----- */
            if (variant.stock < cartItem.quantity) {
                throw new CustomError(
                    ResponseMessages.PRODUCT_OUT_OF_STOCK,
                    HttpStatusCode.BAD_REQUEST,
                );
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
            throw new CustomError(
                ResponseMessages.CART_IS_EMPTY,
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (calculatedTotal <= 0) {
            throw new CustomError(
                ResponseMessages.INVALID_ORDER_TOTAL,
                HttpStatusCode.BAD_REQUEST,
            );
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
            paymentId: null,
        });

        /* =========================================================
           STEP 5 — SAVE ORDER
        ========================================================= */

        const createdOrder = await this._orderRepository.create(orderEntity);

        if (!createdOrder.id) {
            throw new CustomError(
                ResponseMessages.FAILED_TO_CREATE_ORDER,
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }

        /* =========================================================
           CREATE RAZORPAY ORDER
           Amount must be in paise
        ========================================================= */

        const razorpayOrder = await this._paymentGateway.createOrder({
            amount: totalRupees * 100,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
        })



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
        })

        await this._paymentRepository.create(newPayment);




        return razorpayOrder
    }
}
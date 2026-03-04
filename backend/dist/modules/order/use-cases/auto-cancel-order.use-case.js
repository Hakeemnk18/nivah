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
let AutoCancelOrderUseCase = class AutoCancelOrderUseCase {
    _orderRepository;
    _productRepository;
    _paymentRepository;
    constructor(_orderRepository, _productRepository, _paymentRepository) {
        this._orderRepository = _orderRepository;
        this._productRepository = _productRepository;
        this._paymentRepository = _paymentRepository;
    }
    async execute() {
        // 10 minutes ago
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        // Find pending orders older than 10 minutes
        const orders = await this._orderRepository.findPendingOlderThan(tenMinutesAgo);
        if (!orders.length)
            return;
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            let orderIds = [];
            for (const order of orders) {
                orderIds.push(order.id);
                for (const item of order.items) {
                    const product = await this._productRepository.findById(item.productId, session);
                    if (product) {
                        const variant = product.variants.find((v) => v.id === item.variantId);
                        if (variant) {
                            await this._productRepository.incrementStock({
                                productId: product.id,
                                variantId: variant.id,
                                quantity: item.quantity,
                                session,
                            });
                        }
                    }
                }
            }
            await this._paymentRepository.autoCancelPayment(orderIds, session);
            await this._orderRepository.autoCancelOlderThan(orderIds, session);
            console.log("auto cancel completed");
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
AutoCancelOrderUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __param(1, inject("IProductRepository")),
    __param(2, inject("IPaymentRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], AutoCancelOrderUseCase);
export { AutoCancelOrderUseCase };
//# sourceMappingURL=auto-cancel-order.use-case.js.map
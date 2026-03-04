import type { ICreateOrderUseCase } from "./interfaces/create.order.use-case.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { CreateOrderRequestDto } from "../dtos/create.order.dto.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { IRazorpayOrder } from "../types/order.type.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
import type { IPaymentGateway } from "../../../core/ports/payment.service.interface.js";
export declare class CreateOrderUseCase implements ICreateOrderUseCase {
    private readonly _orderRepository;
    private readonly _cartRepository;
    private readonly _productRepository;
    private readonly _paymentRepository;
    private readonly _paymentGateway;
    constructor(_orderRepository: IOrderRepository, _cartRepository: ICartRepository, _productRepository: IProductRepository, _paymentRepository: IPaymentRepository, _paymentGateway: IPaymentGateway);
    execute(data: CreateOrderRequestDto): Promise<IRazorpayOrder>;
}
//# sourceMappingURL=create.order.use-case.d.ts.map
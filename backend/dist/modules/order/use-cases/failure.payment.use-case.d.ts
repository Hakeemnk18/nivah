import type { IHandlePaymentFailureUseCase } from "./interfaces/failure.payment.use-case.interface.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { HandlePaymentFailureRequestDto } from "../dtos/failure.order.dto.js";
export declare class HandlePaymentFailureUseCase implements IHandlePaymentFailureUseCase {
    private readonly _paymentRepository;
    private readonly _orderRepository;
    private readonly _cartRepository;
    private readonly _productRepository;
    constructor(_paymentRepository: IPaymentRepository, _orderRepository: IOrderRepository, _cartRepository: ICartRepository, _productRepository: IProductRepository);
    execute(dto: HandlePaymentFailureRequestDto): Promise<void>;
}
//# sourceMappingURL=failure.payment.use-case.d.ts.map
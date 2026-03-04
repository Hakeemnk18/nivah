import type { IAutoCancelOrderUseCase } from "./interfaces/auto.cancel-order.use-case.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
export declare class AutoCancelOrderUseCase implements IAutoCancelOrderUseCase {
    private _orderRepository;
    private _productRepository;
    private _paymentRepository;
    constructor(_orderRepository: IOrderRepository, _productRepository: IProductRepository, _paymentRepository: IPaymentRepository);
    execute(): Promise<void>;
}
//# sourceMappingURL=auto-cancel-order.use-case.d.ts.map
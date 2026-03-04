import type { IHandleRazorpayWebhookUseCase } from "./interfaces/handle.webhook.use-case.interface.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { RazorpayWebhookEvent } from "../types/order.type.js";
export declare class HandleRazorpayWebhookUseCase implements IHandleRazorpayWebhookUseCase {
    private readonly _paymentRepository;
    private readonly _orderRepository;
    private readonly _productRepository;
    private readonly _cartRepository;
    constructor(_paymentRepository: IPaymentRepository, _orderRepository: IOrderRepository, _productRepository: IProductRepository, _cartRepository: ICartRepository);
    execute(event: RazorpayWebhookEvent): Promise<void>;
    private handleCaptured;
    private handleFailed;
}
//# sourceMappingURL=handle.webhook.usecase.d.ts.map
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IPaymentGateway } from "../../../core/ports/payment.service.interface.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { VerifyPaymentRequestDto } from "../dtos/verify.payment.dto.js";
import type { IVerifyPaymentUseCase } from "./interfaces/verify.payment.use-case.interface.js";
import type { INotificationService } from "../../../core/ports/notification.service.interface.js";
export declare class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
    private readonly _paymentRepository;
    private readonly _orderRepository;
    private readonly _paymentGateway;
    private readonly _cartRepository;
    private readonly _productRepository;
    private readonly _notificationService;
    constructor(_paymentRepository: IPaymentRepository, _orderRepository: IOrderRepository, _paymentGateway: IPaymentGateway, _cartRepository: ICartRepository, _productRepository: IProductRepository, _notificationService: INotificationService);
    execute(dto: VerifyPaymentRequestDto): Promise<void>;
}
//# sourceMappingURL=verify.payment.use-case.d.ts.map
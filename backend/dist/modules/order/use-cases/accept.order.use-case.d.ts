import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IAcceptOrderUseCase } from "./interfaces/accept.order.use-case.interface.js";
import type { INotificationService } from "../../../core/ports/notification.service.interface.js";
export declare class AcceptOrderUseCase implements IAcceptOrderUseCase {
    private readonly _orderRepository;
    private readonly _notificationService;
    constructor(_orderRepository: IOrderRepository, _notificationService: INotificationService);
    execute(orderId: string): Promise<void>;
}
//# sourceMappingURL=accept.order.use-case.d.ts.map
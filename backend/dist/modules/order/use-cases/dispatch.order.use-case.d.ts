import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IDispatchOrderUseCase } from "./interfaces/dispatch.order.use-case.interface.js";
import type { INotificationService } from "../../../core/ports/notification.service.interface.js";
export declare class DispatchOrderUseCase implements IDispatchOrderUseCase {
    private readonly _orderRepository;
    private readonly _notificationService;
    constructor(_orderRepository: IOrderRepository, _notificationService: INotificationService);
    execute(orderId: string): Promise<void>;
}
//# sourceMappingURL=dispatch.order.use-case.d.ts.map
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { ICancelOrderUseCase } from "./interfaces/cancel.order.use-case.interface.js";
export declare class CancelOrderUseCase implements ICancelOrderUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(orderId: string): Promise<void>;
}
//# sourceMappingURL=cancel.order.use-case.d.ts.map
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IDeliverOrderUseCase } from "./interfaces/deliver.order.use-case.interface.js";
export declare class DeliverOrderUseCase implements IDeliverOrderUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(orderId: string): Promise<void>;
}
//# sourceMappingURL=deliver.order.use-case.d.ts.map
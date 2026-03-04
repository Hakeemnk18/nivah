import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { OrderStatus } from "../types/order.type.js";
import type { IGetOrderStatusUseCase } from "./interfaces/get.order.status.use-case.interface.js";
export declare class GetOrderStatusUseCase implements IGetOrderStatusUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(orderId: string): Promise<OrderStatus>;
}
//# sourceMappingURL=get.order.status.use-case.d.ts.map
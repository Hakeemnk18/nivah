import type { IGetOrderSummaryUseCase } from "./interfaces/get.order.summery.use-case.interface.js";
import type { OrderSummaryView } from "../types/order.type.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
export declare class GetOrderSummaryUseCase implements IGetOrderSummaryUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(orderId: string, guestId: string): Promise<OrderSummaryView>;
}
//# sourceMappingURL=get.order.summery.use-case.d.ts.map
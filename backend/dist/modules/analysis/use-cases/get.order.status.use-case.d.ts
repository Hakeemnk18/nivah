import type { IGetOrderStatusDistributionUseCase } from "./interfaces/get.order.status.use-case.interface.js";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { OrderStatusDistribution } from "../types/analysis.type.js";
export declare class GetOrderStatusDistributionUseCase implements IGetOrderStatusDistributionUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(): Promise<OrderStatusDistribution>;
}
//# sourceMappingURL=get.order.status.use-case.d.ts.map
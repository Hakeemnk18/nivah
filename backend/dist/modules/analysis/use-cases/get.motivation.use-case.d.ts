import type { IGetMotivationUseCase } from "./interfaces/get.motivation.use-case.interface.js";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { DashboardMotivationSummary } from "../types/analysis.type.js";
export declare class GetMotivationUseCase implements IGetMotivationUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    private formatCurrency;
    private formatNumber;
    private calculatePercentage;
    private calculateNextTarget;
    execute(): Promise<DashboardMotivationSummary>;
}
//# sourceMappingURL=get.motivation.use-case.d.ts.map
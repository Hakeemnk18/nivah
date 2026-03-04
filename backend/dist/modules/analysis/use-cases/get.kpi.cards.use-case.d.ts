import type { IGetKpiCardsUseCase } from "./interfaces/get.kpi.cards.use-case.interface.js";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { DashboardKpiCardType } from "../types/analysis.type.js";
export declare class GetKpiCardsUseCase implements IGetKpiCardsUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    private calculateTrend;
    private formatCurrency;
    execute(): Promise<DashboardKpiCardType[]>;
}
//# sourceMappingURL=get.kpi.cards.use-case.d.ts.map
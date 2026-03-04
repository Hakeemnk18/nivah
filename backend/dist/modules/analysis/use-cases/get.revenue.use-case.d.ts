import type { GetRevenueQueryDto } from "../../analysis/dto/get.revenue.dto.js";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { RevenueChartData } from "../types/analysis.type.js";
import type { IGetRevenueChartUseCase } from "./interfaces/get.revenue.use-case.interface.js";
export declare class GetRevenueChartUseCase implements IGetRevenueChartUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(dto: GetRevenueQueryDto): Promise<RevenueChartData>;
}
//# sourceMappingURL=get.revenue.use-case.d.ts.map
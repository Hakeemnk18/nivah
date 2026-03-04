import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { RevenueReportQueryDto } from "../dto/request.revenue.data.dto.js";
import type { IRevenueReportUseCase } from "./interfaces/get.revenue.report.use-case.interface.js";
import type { RevenueReportSummary } from "../types/report.type.js";
export declare class RevenueReportUseCase implements IRevenueReportUseCase {
    private orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(query: RevenueReportQueryDto): Promise<RevenueReportSummary>;
}
//# sourceMappingURL=get.revenue.report.use-case.d.ts.map
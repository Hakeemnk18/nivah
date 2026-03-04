import type { GetRevenueQueryDto } from "../../dto/get.revenue.dto.js";
import type { RevenueChartData } from "../../types/analysis.type.js";
export interface IGetRevenueChartUseCase {
    execute(dto: GetRevenueQueryDto): Promise<RevenueChartData>;
}
//# sourceMappingURL=get.revenue.use-case.interface.d.ts.map
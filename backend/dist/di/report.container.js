import { container } from "tsyringe";
import { RevenueReportUseCase } from "../modules/reports/use-cases/get.revenue.report.use-case.js";
export const registerReportDependencies = () => {
    container.register("IRevenueReportUseCase", {
        useClass: RevenueReportUseCase,
    });
};
//# sourceMappingURL=report.container.js.map
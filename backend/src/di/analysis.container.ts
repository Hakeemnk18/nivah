import { container } from "tsyringe";
import type { IGetRevenueChartUseCase } from "../modules/analysis/use-cases/interfaces/get.revenue.use-case.interface.js";
import { GetRevenueChartUseCase } from "../modules/analysis/use-cases/get.revenue.use-case.js";

 
export const registerAnalysisDependencies = () => {
     container.register<IGetRevenueChartUseCase>("IGetRevenueChartUseCase", {
        useClass: GetRevenueChartUseCase,
    });
}
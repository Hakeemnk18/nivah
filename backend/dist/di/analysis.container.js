import { container } from "tsyringe";
import { GetRevenueChartUseCase } from "../modules/analysis/use-cases/get.revenue.use-case.js";
import { GetKpiCardsUseCase } from "../modules/analysis/use-cases/get.kpi.cards.use-case.js";
import { GetProductRankingsUseCase } from "../modules/analysis/use-cases/get.product.rankings.use-case.js";
import { GetCategoryRankingsUseCase } from "../modules/analysis/use-cases/get.category.rankings.use-case.js";
import { GetMotivationUseCase } from "../modules/analysis/use-cases/get.motivation.use-case.js";
import { GetOrderStatusDistributionUseCase } from "../modules/analysis/use-cases/get.order.status.use-case.js";
export const registerAnalysisDependencies = () => {
    container.register("IGetRevenueChartUseCase", {
        useClass: GetRevenueChartUseCase,
    });
    container.register("IGetKpiCardsUseCase", {
        useClass: GetKpiCardsUseCase,
    });
    container.register("IGetProductRankingsUseCase", {
        useClass: GetProductRankingsUseCase,
    });
    container.register("IGetCategoryRankingsUseCase", {
        useClass: GetCategoryRankingsUseCase,
    });
    container.register("IGetMotivationUseCase", {
        useClass: GetMotivationUseCase,
    });
    container.register("IGetOrderStatusDistributionUseCase", {
        useClass: GetOrderStatusDistributionUseCase,
    });
};
//# sourceMappingURL=analysis.container.js.map
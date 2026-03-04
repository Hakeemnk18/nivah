import type { IAnalysisController } from "./analysis.controller.interface.js";
import type { Request, Response } from "express";
import type { IGetRevenueChartUseCase } from "../use-cases/interfaces/get.revenue.use-case.interface.js";
import type { IGetKpiCardsUseCase } from "../use-cases/interfaces/get.kpi.cards.use-case.interface.js";
import type { IGetProductRankingsUseCase } from "../use-cases/interfaces/get.product.rankings.use-case.interface.js";
import type { IGetCategoryRankingsUseCase } from "../use-cases/interfaces/get.category.rankings.use-case.interface.js";
import type { IGetMotivationUseCase } from "../use-cases/interfaces/get.motivation.use-case.interface.js";
import type { IGetOrderStatusDistributionUseCase } from "../use-cases/interfaces/get.order.status.use-case.interface.js";
export declare class AnalysisController implements IAnalysisController {
    private _getRevenueChartUseCase;
    private readonly _getKpiCardsUseCase;
    private readonly _getProductRankingsUseCase;
    private readonly _getCategoryRankingsUseCase;
    private readonly _getMotivationUseCase;
    private readonly _getOrderStatusDistributionUseCase;
    constructor(_getRevenueChartUseCase: IGetRevenueChartUseCase, _getKpiCardsUseCase: IGetKpiCardsUseCase, _getProductRankingsUseCase: IGetProductRankingsUseCase, _getCategoryRankingsUseCase: IGetCategoryRankingsUseCase, _getMotivationUseCase: IGetMotivationUseCase, _getOrderStatusDistributionUseCase: IGetOrderStatusDistributionUseCase);
    getRevenueChart(req: Request, res: Response): Promise<void>;
    getKpiCards(req: Request, res: Response): Promise<void>;
    getProductRankings(req: Request, res: Response): Promise<void>;
    getCategoryRankings(req: Request, res: Response): Promise<void>;
    getMotivationSummary(req: Request, res: Response): Promise<void>;
    getOrderStatusDistribution(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=analysis.controller.d.ts.map
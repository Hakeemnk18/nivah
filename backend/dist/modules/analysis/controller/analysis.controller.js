var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { GetRevenueQuerySchema, } from "../dto/get.revenue.dto.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";
let AnalysisController = class AnalysisController {
    _getRevenueChartUseCase;
    _getKpiCardsUseCase;
    _getProductRankingsUseCase;
    _getCategoryRankingsUseCase;
    _getMotivationUseCase;
    _getOrderStatusDistributionUseCase;
    constructor(_getRevenueChartUseCase, _getKpiCardsUseCase, _getProductRankingsUseCase, _getCategoryRankingsUseCase, _getMotivationUseCase, _getOrderStatusDistributionUseCase) {
        this._getRevenueChartUseCase = _getRevenueChartUseCase;
        this._getKpiCardsUseCase = _getKpiCardsUseCase;
        this._getProductRankingsUseCase = _getProductRankingsUseCase;
        this._getCategoryRankingsUseCase = _getCategoryRankingsUseCase;
        this._getMotivationUseCase = _getMotivationUseCase;
        this._getOrderStatusDistributionUseCase = _getOrderStatusDistributionUseCase;
    }
    async getRevenueChart(req, res) {
        try {
            const dto = GetRevenueQuerySchema.parse({
                range: req.query.range ?? "Month",
            });
            const data = await this._getRevenueChartUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get revenue chart controller ", error);
        }
    }
    async getKpiCards(req, res) {
        try {
            const data = await this._getKpiCardsUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get kpi cards controller ", error);
        }
    }
    async getProductRankings(req, res) {
        try {
            const data = await this._getProductRankingsUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data, // Returns { topSelling, lowSelling }
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get product rankings controller ", error);
        }
    }
    async getCategoryRankings(req, res) {
        try {
            const data = await this._getCategoryRankingsUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get category rankings controller ", error);
        }
    }
    async getMotivationSummary(req, res) {
        try {
            const data = await this._getMotivationUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get motivation summary controller ", error);
        }
    }
    async getOrderStatusDistribution(req, res) {
        try {
            const data = await this._getOrderStatusDistributionUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get order status distribution controller ", error);
        }
    }
};
AnalysisController = __decorate([
    injectable(),
    __param(0, inject("IGetRevenueChartUseCase")),
    __param(1, inject("IGetKpiCardsUseCase")),
    __param(2, inject("IGetProductRankingsUseCase")),
    __param(3, inject("IGetCategoryRankingsUseCase")),
    __param(4, inject("IGetMotivationUseCase")),
    __param(5, inject("IGetOrderStatusDistributionUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], AnalysisController);
export { AnalysisController };
//# sourceMappingURL=analysis.controller.js.map
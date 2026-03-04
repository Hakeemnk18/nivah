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
import { RevenueReportQuerySchema } from "../dto/request.revenue.data.dto.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { handleError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
let ReportController = class ReportController {
    _reportUseCase;
    constructor(_reportUseCase) {
        this._reportUseCase = _reportUseCase;
    }
    async getRevenueReport(req, res) {
        try {
            const parsedQuery = RevenueReportQuerySchema.parse(req.query);
            const reportData = await this._reportUseCase.execute(parsedQuery);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.REVENUE_REPORT_FETCHED_SUCCESSFULLY,
                data: {
                    summary: reportData.summary,
                    dailyData: reportData.dailyData,
                },
                totalPages: reportData.totalPages,
                currentPage: parsedQuery.page,
            });
        }
        catch (error) {
            handleError(res, error);
        }
    }
    ;
};
ReportController = __decorate([
    injectable(),
    __param(0, inject("IRevenueReportUseCase")),
    __metadata("design:paramtypes", [Object])
], ReportController);
export { ReportController };
//# sourceMappingURL=report.controller.js.map
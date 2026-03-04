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
// src/modules/report/report.usecase.ts
import { inject, injectable } from "tsyringe";
let RevenueReportUseCase = class RevenueReportUseCase {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(query) {
        let startDate = null;
        let endDate = null;
        // 1. Calculate Date Ranges Based on Option
        switch (query.option) {
            case "daily": {
                const today = new Date();
                startDate = new Date(today.setHours(0, 0, 0, 0));
                endDate = new Date(today.setHours(23, 59, 59, 999));
                break;
            }
            case "this_week": {
                const today = new Date();
                const dayOfWeek = today.getDay(); // 0 is Sunday
                const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
                startDate = new Date(today.setDate(diff));
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date();
                break;
            }
            case "this_month": {
                const today = new Date();
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date();
                break;
            }
            case "last_6_months": {
                const today = new Date();
                startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1, 0, 0, 0, 0);
                endDate = new Date();
                break;
            }
            case "this_year": {
                const today = new Date();
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = new Date();
                break;
            }
            case "custom":
                startDate = new Date(query.customStartDate);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(query.customEndDate);
                endDate.setHours(23, 59, 59, 999);
                break;
            case "all_time":
            default:
                break;
        }
        // 2. Fetch from Repository
        const reportData = await this.orderRepository.getRevenueReport({
            startDate,
            endDate,
            page: query.page,
            limit: query.limit,
        });
        return reportData;
    }
};
RevenueReportUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __metadata("design:paramtypes", [Object])
], RevenueReportUseCase);
export { RevenueReportUseCase };
//# sourceMappingURL=get.revenue.report.use-case.js.map
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
let GetProductRankingsUseCase = class GetProductRankingsUseCase {
    _orderRepository;
    constructor(_orderRepository) {
        this._orderRepository = _orderRepository;
    }
    async execute() {
        const endDate = new Date();
        const startDate = new Date();
        // Set to exactly 1 year ago
        startDate.setFullYear(endDate.getFullYear() - 1);
        // Fetch Top 5 (Sort -1)
        const topProducts = await this._orderRepository.getProductRankings(startDate, endDate, -1, 5);
        // Fetch Bottom 5 (Sort 1)
        const lowProducts = await this._orderRepository.getProductRankings(startDate, endDate, 1, 5);
        // Format to match exact DTO expected by frontend
        const topSelling = {
            range: "1y",
            products: topProducts
        };
        const lowSelling = {
            range: "1y",
            products: lowProducts
        };
        return { topSelling, lowSelling };
    }
};
GetProductRankingsUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __metadata("design:paramtypes", [Object])
], GetProductRankingsUseCase);
export { GetProductRankingsUseCase };
//# sourceMappingURL=get.product.rankings.use-case.js.map
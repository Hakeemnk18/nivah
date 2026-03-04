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
let GetOrderStatusDistributionUseCase = class GetOrderStatusDistributionUseCase {
    _orderRepository;
    constructor(_orderRepository) {
        this._orderRepository = _orderRepository;
    }
    async execute() {
        // 1. Fetch the raw counts from the DB
        const rawCounts = await this._orderRepository.getOrderStatusCounts();
        // 2. Calculate the grand total of all orders
        const totalOrders = rawCounts.reduce((acc, curr) => acc + curr.count, 0);
        // 3. Define the strict visual order for the frontend donut chart colors
        const statusOrder = [
            "created",
            "confirmed",
            "accepted",
            "dispatched",
            "delivered",
            "cancelled"
        ];
        // 4. Map the data, calculate percentages, and enforce the sort order
        const statuses = rawCounts.map((item) => {
            const percentage = totalOrders > 0 ? Math.round((item.count / totalOrders) * 100) : 0;
            return {
                status: item._id,
                count: item.count,
                percentage: percentage
            };
        }).sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
        return {
            totalOrders,
            statuses
        };
    }
};
GetOrderStatusDistributionUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __metadata("design:paramtypes", [Object])
], GetOrderStatusDistributionUseCase);
export { GetOrderStatusDistributionUseCase };
//# sourceMappingURL=get.order.status.use-case.js.map
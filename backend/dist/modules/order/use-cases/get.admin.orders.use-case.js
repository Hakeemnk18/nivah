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
let GetAdminOrdersUseCase = class GetAdminOrdersUseCase {
    _orderRepository;
    constructor(_orderRepository) {
        this._orderRepository = _orderRepository;
    }
    async execute(dto) {
        const { page, search, limit, sortValue, filters } = dto;
        let query = {};
        let sort = {
            createdAt: -1,
        };
        /* ---------- sorting ---------- */
        if (sortValue && sortValue.trim() !== "") {
            if (sortValue === "oldest") {
                sort = { createdAt: 1 };
            }
            else if (sortValue === "newest") {
                sort = { createdAt: -1 };
            }
            else if (sortValue === "price_low_high") {
                sort = { totalAmount: 1 };
            }
            else if (sortValue === "price_high_low") {
                sort = { totalAmount: -1 };
            }
        }
        /* ---------- search (name + description) ---------- */
        if (search && search.trim() !== "") {
            const escapedSearch = search
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            query.$or = [
                { orderNumber: { $regex: escapedSearch, $options: "i" } },
                { "userSnapshot.name": { $regex: escapedSearch, $options: "i" } },
                { "userSnapshot.email": { $regex: escapedSearch, $options: "i" } },
                { "userSnapshot.phone": { $regex: escapedSearch, $options: "i" } },
                { "items.name": { $regex: escapedSearch, $options: "i" } },
            ];
        }
        ///* ---------- filters ---------- */
        if (filters && Object.keys(filters).length > 0) {
            for (const key in filters) {
                query[key] = filters[key];
            }
        }
        const allDoc = {
            page,
            limit,
            query,
            sort,
        };
        const documents = await this._orderRepository.getAdminOrderList(allDoc);
        const total = await this._orderRepository.countDocuments(query);
        return { data: documents, total };
    }
};
GetAdminOrdersUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __metadata("design:paramtypes", [Object])
], GetAdminOrdersUseCase);
export { GetAdminOrdersUseCase };
//# sourceMappingURL=get.admin.orders.use-case.js.map
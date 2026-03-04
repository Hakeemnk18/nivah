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
import { Types } from "mongoose";
let GetAllProductForUserUseCase = class GetAllProductForUserUseCase {
    _productRepository;
    _categoryRepository;
    constructor(_productRepository, _categoryRepository) {
        this._productRepository = _productRepository;
        this._categoryRepository = _categoryRepository;
    }
    async execute(dto) {
        const { search, limit, sortValue, filters, page } = dto;
        let query = {
            isActive: true,
        };
        let sort = { _id: -1 };
        /* ---------- category filter ---------- */
        if (filters.parentCategoryId) {
            const childCategories = await this._categoryRepository.findSubCategoriesForUser(filters.parentCategoryId);
            const childCategoryIds = childCategories.map((category) => category.id);
            const childCategoryObjectIds = childCategoryIds.map((id) => new Types.ObjectId(id));
            query.category = { $in: childCategoryObjectIds };
        }
        if (filters.childCategoryId) {
            query.category = filters.childCategoryId;
        }
        /* ---------- sorting ---------- */
        if (sortValue === "oldest") {
            sort = { _id: 1 };
        }
        else if (sortValue === "newest") {
            sort = { _id: -1 };
        }
        else if (sortValue === "price_low_high") {
            sort = { "variants.0.price": 1, _id: -1 };
        }
        else if (sortValue === "price_high_low") {
            sort = { "variants.0.price": -1, _id: -1 };
        }
        /* ---------- search ---------- */
        if (search && search.trim() !== "") {
            const escapedSearch = search
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            query.$or = [
                { name: { $regex: escapedSearch, $options: "i" } },
                { description: { $regex: escapedSearch, $options: "i" } },
            ];
        }
        return this._productRepository.findAllForUser({
            query,
            limit,
            sort,
            page,
        });
    }
};
GetAllProductForUserUseCase = __decorate([
    injectable(),
    __param(0, inject("IProductRepository")),
    __param(1, inject("ICategoryRepository")),
    __metadata("design:paramtypes", [Object, Object])
], GetAllProductForUserUseCase);
export { GetAllProductForUserUseCase };
//# sourceMappingURL=get.all.product.user.use-case.js.map
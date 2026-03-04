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
let GetAllProductForAdminUseCase = class GetAllProductForAdminUseCase {
    _productRepository;
    _categoryRepository;
    constructor(_productRepository, _categoryRepository) {
        this._productRepository = _productRepository;
        this._categoryRepository = _categoryRepository;
    }
    async execute(dto) {
        const { page, search, limit, sortValue, filters } = dto;
        let query = {};
        let sort = { createdAt: -1 };
        if (filters.parentCategoryId) {
            const { parentCategoryId } = filters;
            const childCategories = await this._categoryRepository.findSubCategoriesForAdmin(filters.parentCategoryId);
            const childCategoryIds = childCategories.map((category) => category.id);
            query.category = { $in: childCategoryIds };
        }
        /* ---------- sorting ---------- */
        if (sortValue === "oldest") {
            sort = { createdAt: 1 };
        }
        else if (sortValue === "newest") {
            sort = { createdAt: -1 };
        }
        else if (sortValue === "price_low_high") {
            sort = { "variants.0.price": 1 };
        }
        else if (sortValue === "price_high_low") {
            sort = { "variants.0.price": -1 };
        }
        /* ---------- search (name + description) ---------- */
        if (search && search.trim() !== "") {
            const escapedSearch = search
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            query.$or = [
                { name: { $regex: escapedSearch, $options: "i" } },
                { description: { $regex: escapedSearch, $options: "i" } },
            ];
        }
        /* ---------- filters ---------- */
        if (filters) {
            if (filters.isActive !== undefined) {
                query.isActive = filters.isActive;
            }
            if (filters.childCategoryId) {
                query.category = filters.childCategoryId;
            }
        }
        const allDoc = {
            page,
            limit,
            query,
            sort,
        };
        const [data, total] = await Promise.all([
            this._productRepository.findAllForAdmin(allDoc),
            this._productRepository.countDocument(query),
        ]);
        return { data, total };
    }
};
GetAllProductForAdminUseCase = __decorate([
    injectable(),
    __param(0, inject("IProductRepository")),
    __param(1, inject("ICategoryRepository")),
    __metadata("design:paramtypes", [Object, Object])
], GetAllProductForAdminUseCase);
export { GetAllProductForAdminUseCase };
//# sourceMappingURL=get.all.product.admin.use-case.js.map
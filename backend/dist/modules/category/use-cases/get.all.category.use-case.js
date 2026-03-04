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
let GetAllCategoryUseCase = class GetAllCategoryUseCase {
    _categoryRepository;
    constructor(_categoryRepository) {
        this._categoryRepository = _categoryRepository;
    }
    async execute(dto, parentId) {
        const { page, search, limit, sortValue, filters } = dto;
        let query = {
            parentId: parentId,
        };
        let sort = {
            createdAt: -1,
        };
        /* ---------- sorting ---------- */
        if (sortValue && sortValue.trim() !== "" && sortValue === "oldest") {
            sort = { createdAt: 1 };
        }
        else if (sortValue && sortValue.trim() !== "" && sortValue === "newest") {
            sort = { createdAt: -1 };
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
        ///* ---------- filters ---------- */
        if (filters && Object.keys(filters).length > 0) {
            const { isActive } = filters;
            if (isActive !== undefined && isActive !== null) {
                query.isActive = isActive;
            }
        }
        const allDoc = {
            page,
            limit,
            query,
            sort,
        };
        const [data, total] = await Promise.all([
            this._categoryRepository.findAllForAdmin(allDoc),
            this._categoryRepository.countDocument(query),
        ]);
        return { data, total };
    }
};
GetAllCategoryUseCase = __decorate([
    injectable(),
    __param(0, inject("ICategoryRepository")),
    __metadata("design:paramtypes", [Object])
], GetAllCategoryUseCase);
export { GetAllCategoryUseCase };
//# sourceMappingURL=get.all.category.use-case.js.map
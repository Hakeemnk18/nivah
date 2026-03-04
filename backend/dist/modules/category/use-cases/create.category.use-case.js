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
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { Category } from "../entities/category.entity.js";
let CreateCategoryUseCase = class CreateCategoryUseCase {
    _categoryRepository;
    constructor(_categoryRepository) {
        this._categoryRepository = _categoryRepository;
    }
    async execute(dto) {
        /* ---------- duplicate name validation (same parent) ---------- */
        const existingCategory = await this._categoryRepository.findByNameAndParent(dto.name, dto.parentId ?? null);
        if (existingCategory) {
            throw new CustomError(ResponseMessages.CATEGORY_NAME_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
        }
        /* ---------- create category entity ---------- */
        const categoryEntity = new Category({
            id: null,
            name: dto.name,
            description: dto.description,
            parentId: dto.parentId ?? null,
            isActive: true,
        });
        const category = await this._categoryRepository.create(categoryEntity);
        if (!category) {
            throw new CustomError(ResponseMessages.CATEGORY_CREATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
};
CreateCategoryUseCase = __decorate([
    injectable(),
    __param(0, inject("ICategoryRepository")),
    __metadata("design:paramtypes", [Object])
], CreateCategoryUseCase);
export { CreateCategoryUseCase };
//# sourceMappingURL=create.category.use-case.js.map
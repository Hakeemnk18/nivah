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
let GetAllSubCategoryForUserUseCase = class GetAllSubCategoryForUserUseCase {
    _categoryRepository;
    constructor(_categoryRepository) {
        this._categoryRepository = _categoryRepository;
    }
    async execute() {
        return await this._categoryRepository.findAllSubCategories({ parentId: { $ne: null }, isActive: true });
    }
};
GetAllSubCategoryForUserUseCase = __decorate([
    injectable(),
    __param(0, inject("ICategoryRepository")),
    __metadata("design:paramtypes", [Object])
], GetAllSubCategoryForUserUseCase);
export { GetAllSubCategoryForUserUseCase };
//# sourceMappingURL=get.all.sub.category.for.user.use-case.js.map
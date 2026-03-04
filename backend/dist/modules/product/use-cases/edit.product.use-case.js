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
import { deleteCloudinaryImage } from "../../../core/utils/delete.image.helper.js";
let EditProductUseCase = class EditProductUseCase {
    _productRepository;
    _categoryRepository;
    constructor(_productRepository, _categoryRepository) {
        this._productRepository = _productRepository;
        this._categoryRepository = _categoryRepository;
    }
    async execute(productId, dto) {
        const product = await this._productRepository.findById(productId);
        if (!product) {
            throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const category = await this._categoryRepository.findById(dto.categoryId);
        if (!category || category.isActive === false) {
            throw new CustomError(ResponseMessages.CATEGORY_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (category.parentId === null) {
            throw new CustomError(ResponseMessages.PARENT_CATEGORY_NOT_USE_FOR_PRODUCT, HttpStatusCode.BAD_REQUEST);
        }
        const publicIds = new Set(dto.images.map((image) => image.publicId));
        const removedImages = product.images.filter((image) => !publicIds.has(image.publicId));
        await Promise.all(removedImages.map((image) => deleteCloudinaryImage(image.publicId)));
        const updatedProduct = product.updateDetails({
            name: dto.name,
            description: dto.description,
            images: dto.images,
            categoryId: dto.categoryId,
            isFeatured: dto.isFeatured,
        });
        const saved = await this._productRepository.save(updatedProduct);
        if (!saved) {
            throw new CustomError(ResponseMessages.PRODUCT_UPDATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
};
EditProductUseCase = __decorate([
    injectable(),
    __param(0, inject("IProductRepository")),
    __param(1, inject("ICategoryRepository")),
    __metadata("design:paramtypes", [Object, Object])
], EditProductUseCase);
export { EditProductUseCase };
//# sourceMappingURL=edit.product.use-case.js.map
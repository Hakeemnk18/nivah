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
let UnblockProductUseCase = class UnblockProductUseCase {
    _productRepository;
    constructor(_productRepository) {
        this._productRepository = _productRepository;
    }
    async execute(id) {
        const product = await this._productRepository.findById(id);
        if (!product) {
            throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (product.isActive) {
            throw new CustomError(ResponseMessages.PRODUCT_ALREADY_ACTIVE, HttpStatusCode.BAD_REQUEST);
        }
        const activated = product.activate();
        await this._productRepository.save(activated);
    }
};
UnblockProductUseCase = __decorate([
    injectable(),
    __param(0, inject("IProductRepository")),
    __metadata("design:paramtypes", [Object])
], UnblockProductUseCase);
export { UnblockProductUseCase };
//# sourceMappingURL=unblock.product.use-case.js.map
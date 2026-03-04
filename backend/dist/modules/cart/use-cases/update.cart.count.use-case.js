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
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { inject, injectable } from "tsyringe";
let UpdateCartCountUseCase = class UpdateCartCountUseCase {
    _cartRepository;
    _productRepository;
    constructor(_cartRepository, _productRepository) {
        this._cartRepository = _cartRepository;
        this._productRepository = _productRepository;
    }
    async execute(dto) {
        const { guestId, cartId, itemId, action } = dto;
        const cart = await this._cartRepository.findByGuestId(guestId);
        if (!cart) {
            throw new CustomError(ResponseMessages.CART_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (cart.id !== cartId) {
            throw new CustomError(ResponseMessages.CART_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const item = cart.items.find((item) => item.id === itemId);
        if (!item) {
            throw new CustomError(ResponseMessages.ITEM_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const product = await this._productRepository.findById(item.productId);
        if (!product || !product.isActive) {
            throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const productVariant = await this._productRepository.findProductVariant(product.id, item.variantId);
        if (!productVariant || !productVariant.isActive) {
            throw new CustomError(ResponseMessages.PRODUCT_VARIANT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (action === "increment" && productVariant.stock < (item.quantity + 1)) {
            throw new CustomError(ResponseMessages.OUT_OF_STOCK, HttpStatusCode.BAD_REQUEST);
        }
        if (action === "decrement" && item.quantity === 1) {
            const removeUpdate = await this._cartRepository.removeItem({
                cartId,
                itemId,
                guestId,
            });
            if (!removeUpdate) {
                throw new CustomError(ResponseMessages.CART_UPDATE_FAILED, HttpStatusCode.NOT_FOUND);
            }
            return;
        }
        if (action === "increment") {
            const incrementUpdate = await this._cartRepository.incrementItemQuantity({
                cartId,
                itemId,
                guestId,
                quantity: 1,
                stock: productVariant.stock,
            });
            if (!incrementUpdate) {
                throw new CustomError(ResponseMessages.CART_UPDATE_FAILED, HttpStatusCode.NOT_FOUND);
            }
        }
        else if (action === "decrement") {
            const decrementUpdate = await this._cartRepository.decrementItemQuantity({
                cartId,
                itemId,
                guestId,
                quantity: 1,
                stock: productVariant.stock,
            });
            if (!decrementUpdate) {
                throw new CustomError(ResponseMessages.CART_UPDATE_FAILED, HttpStatusCode.NOT_FOUND);
            }
        }
    }
};
UpdateCartCountUseCase = __decorate([
    injectable(),
    __param(0, inject("ICartRepository")),
    __param(1, inject("IProductRepository")),
    __metadata("design:paramtypes", [Object, Object])
], UpdateCartCountUseCase);
export { UpdateCartCountUseCase };
//# sourceMappingURL=update.cart.count.use-case.js.map
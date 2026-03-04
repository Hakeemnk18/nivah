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
import { Cart } from "../entities/cart.entity.js";
let CreateCartUseCase = class CreateCartUseCase {
    _cartRepository;
    _productRepository;
    constructor(_cartRepository, _productRepository) {
        this._cartRepository = _cartRepository;
        this._productRepository = _productRepository;
    }
    async execute(dto) {
        /* ---------- product validation ---------- */
        const product = await this._productRepository.findById(dto.productId);
        if (!product || !product.isActive) {
            throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        /* ---------- variant + stock validation ---------- */
        const stockAvailable = await this._productRepository.findProductVariant(dto.productId, dto.variantId, true);
        if (!stockAvailable || stockAvailable.stock < dto.quantity) {
            throw new CustomError(ResponseMessages.OUT_OF_STOCK, HttpStatusCode.BAD_REQUEST);
        }
        const stock = stockAvailable.stock;
        /* ---------- find existing cart ---------- */
        let cart = await this._cartRepository.findByGuestId(dto.guestId);
        /* ---------- create cart if not exists ---------- */
        if (!cart) {
            const cartEntity = new Cart({
                id: null,
                userId: null,
                guestId: dto.guestId,
                isActive: true,
                items: [],
            });
            cart = await this._cartRepository.create(cartEntity);
            if (!cart) {
                throw new CustomError(ResponseMessages.CART_CREATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        }
        const sameItemInCart = cart.findSameItemInCart(dto.productId, dto.variantId);
        if (sameItemInCart) {
            const updatedQuantity = dto.quantity + sameItemInCart.quantity;
            if (updatedQuantity > stockAvailable.stock) {
                throw new CustomError(ResponseMessages.OUT_OF_STOCK, HttpStatusCode.BAD_REQUEST);
            }
            const updated = await this._cartRepository.incrementItemQuantity({
                cartId: cart.id,
                guestId: dto.guestId,
                itemId: sameItemInCart.id,
                quantity: dto.quantity,
                stock,
            });
            if (!updated) {
                throw new CustomError(ResponseMessages.CART_UPDATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            const updated = await this._cartRepository.pushNewItem({
                cartId: cart.id,
                guestId: dto.guestId,
                stock,
                item: {
                    productId: dto.productId,
                    variantId: dto.variantId,
                    quantity: dto.quantity,
                },
            });
            if (!updated) {
                throw new CustomError(ResponseMessages.CART_UPDATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
CreateCartUseCase = __decorate([
    injectable(),
    __param(0, inject("ICartRepository")),
    __param(1, inject("IProductRepository")),
    __metadata("design:paramtypes", [Object, Object])
], CreateCartUseCase);
export { CreateCartUseCase };
//# sourceMappingURL=create.cart.use-case.js.map
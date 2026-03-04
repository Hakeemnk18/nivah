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
let RemoveCartItemUseCase = class RemoveCartItemUseCase {
    _cartRepository;
    constructor(_cartRepository) {
        this._cartRepository = _cartRepository;
    }
    async execute(dto) {
        const { guestId, cartId, itemId } = dto;
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
        const removed = await this._cartRepository.removeItem({
            cartId,
            itemId,
            guestId,
        });
        if (!removed) {
            throw new CustomError(ResponseMessages.CART_UPDATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
};
RemoveCartItemUseCase = __decorate([
    injectable(),
    __param(0, inject("ICartRepository")),
    __metadata("design:paramtypes", [Object])
], RemoveCartItemUseCase);
export { RemoveCartItemUseCase };
//# sourceMappingURL=remove.cart.item.use-case.js.map
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
let GetCheckoutItemUseCase = class GetCheckoutItemUseCase {
    _cartRepository;
    constructor(_cartRepository) {
        this._cartRepository = _cartRepository;
    }
    async execute(guestId) {
        const cart = await this._cartRepository.getCheckoutViewByGuestId(guestId);
        if (!cart) {
            throw new CustomError(ResponseMessages.CART_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        return cart;
    }
};
GetCheckoutItemUseCase = __decorate([
    injectable(),
    __param(0, inject("ICartRepository")),
    __metadata("design:paramtypes", [Object])
], GetCheckoutItemUseCase);
export { GetCheckoutItemUseCase };
//# sourceMappingURL=get.checkout.item.use-case.js.map
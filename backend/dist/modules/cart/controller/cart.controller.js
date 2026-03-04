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
import { AddCartItemSchema } from "../dtos/create.cart.dto.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";
import { GuestIdSchema } from "../../../core/utils/guest.id.validation.js";
import { RemoveCartItemSchema } from "../dtos/remove.cart.dto.js";
import { UpdateCartItemQuantitySchema } from "../dtos/update.cart.dto.js";
let CartController = class CartController {
    _createCartUseCase;
    _getCartUseCase;
    _removeCartItemUseCase;
    _updateCartCountUseCase;
    _getCheckoutItemUseCase;
    constructor(_createCartUseCase, _getCartUseCase, _removeCartItemUseCase, _updateCartCountUseCase, _getCheckoutItemUseCase) {
        this._createCartUseCase = _createCartUseCase;
        this._getCartUseCase = _getCartUseCase;
        this._removeCartItemUseCase = _removeCartItemUseCase;
        this._updateCartCountUseCase = _updateCartCountUseCase;
        this._getCheckoutItemUseCase = _getCheckoutItemUseCase;
    }
    async addToCart(req, res) {
        try {
            const dto = AddCartItemSchema.parse(req.body);
            await this._createCartUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CART_ITEM_ADDED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in add cart controller", error);
        }
    }
    async getCart(req, res) {
        try {
            const guestId = req.params.guestId;
            const dto = GuestIdSchema.parse(guestId);
            const cart = await this._getCartUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: cart,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get cart controller", error);
        }
    }
    async removeCartItem(req, res) {
        try {
            const dto = RemoveCartItemSchema.parse(req.body);
            await this._removeCartItemUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CART_ITEM_REMOVED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in remove cart item controller", error);
        }
    }
    async updateCartCount(req, res) {
        try {
            const dto = UpdateCartItemQuantitySchema.parse(req.body);
            await this._updateCartCountUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CART_COUNT_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in update cart count controller", error);
        }
    }
    async getCheckoutItem(req, res) {
        try {
            const guestId = req.params.guestId;
            const dto = GuestIdSchema.parse(guestId);
            const checkoutItem = await this._getCheckoutItemUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: checkoutItem,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get checkout item controller", error);
        }
    }
};
CartController = __decorate([
    injectable(),
    __param(0, inject("ICreateCartUseCase")),
    __param(1, inject("IGetCartUseCase")),
    __param(2, inject("IRemoveCartItemUseCase")),
    __param(3, inject("IUpdateCartCountUseCase")),
    __param(4, inject("IGetCheckoutItemUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CartController);
export { CartController };
//# sourceMappingURL=cart.controller.js.map
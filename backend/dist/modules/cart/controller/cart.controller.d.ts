import type { ICartController } from "./cart.controller.interface.js";
import type { Request, Response } from "express";
import type { ICreateCartUseCase } from "../use-cases/interfaces/create.cart.use-case.interface.js";
import type { IGetCartUseCase } from "../use-cases/interfaces/get.cart.use-case.interface.js";
import type { IRemoveCartItemUseCase } from "../use-cases/interfaces/remove.cart.item.use-case.interface.js";
import type { IUpdateCartCountUseCase } from "../use-cases/interfaces/update.cart.count.use-case.interface.js";
import type { IGetCheckoutItemUseCase } from "../use-cases/interfaces/get.checkout.item.use-case.interface.js";
export declare class CartController implements ICartController {
    private _createCartUseCase;
    private _getCartUseCase;
    private _removeCartItemUseCase;
    private _updateCartCountUseCase;
    private _getCheckoutItemUseCase;
    constructor(_createCartUseCase: ICreateCartUseCase, _getCartUseCase: IGetCartUseCase, _removeCartItemUseCase: IRemoveCartItemUseCase, _updateCartCountUseCase: IUpdateCartCountUseCase, _getCheckoutItemUseCase: IGetCheckoutItemUseCase);
    addToCart(req: Request, res: Response): Promise<void>;
    getCart(req: Request, res: Response): Promise<void>;
    removeCartItem(req: Request, res: Response): Promise<void>;
    updateCartCount(req: Request, res: Response): Promise<void>;
    getCheckoutItem(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=cart.controller.d.ts.map
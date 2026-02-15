
import { inject, injectable } from "tsyringe";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import type { ICartRepository } from "../repositories/cart.repository.interface.js";
import type { CartView } from "../types/cart.type.js";
import type { IGetCartUseCase } from "./interfaces/get.cart.use-case.interface.js";

@injectable()
export class GetCartUseCase implements IGetCartUseCase {
    constructor(
        @inject("ICartRepository")
        private readonly _cartRepository: ICartRepository
    ) { }
    async execute(guestId: string): Promise<CartView> {
        const cart = await this._cartRepository.findCartForViewByGuestId(guestId);
        if (!cart) {
            throw new CustomError(
                ResponseMessages.CART_NOT_FOUND,
                HttpStatusCode.NOT_FOUND
            );
        }

        return cart;
    }
}
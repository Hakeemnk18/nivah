import { inject, injectable } from "tsyringe";
import type { ICartController } from "./cart.controller.interface.js";
import { AddCartItemSchema } from "../dtos/create.cart.dto.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";
import type { Request, Response } from "express";
import type { ICreateCartUseCase } from "../use-cases/interfaces/create.cart.use-case.interface.js";



@injectable()
export class CartController implements ICartController {

    constructor(
        @inject("ICreateCartUseCase") private _createCartUseCase: ICreateCartUseCase,
    ) { }

    async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const dto = AddCartItemSchema.parse(req.body);
            await this._createCartUseCase.execute(dto)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CART_ITEM_ADDED_SUCCESS,
            });
        } catch (error) {
            handleError(res, error)
            console.log("error in add cart controller", error)
        }
    }

    async getCart(req: Request, res: Response): Promise<void> {
        try {
            // const dto = GetCartSchema.parse(req.body);
            // await this._getCartUseCase.execute(dto)
            // res.status(HttpStatusCode.OK).json({
            //     success: true,
            //     message: ResponseMessages.SUCCESS,
            // });
        } catch (error) {
            handleError(res, error)
            console.log("error in get cart controller", error)
        }
    }

}

import { inject, injectable } from "tsyringe";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError, handleError } from "../../../core/errors/custom.error.js";
import type { Request, Response } from "express";
import { CreateOrderSchema } from "../dtos/create.order.dto.js";
import type { IOrderController } from "./order.controller.interface.js";
import type { ICreateOrderUseCase } from "../use-cases/interfaces/create.order.use-case.interface.js";

@injectable()
export class OrderController implements IOrderController {
    constructor(
        @inject("ICreateOrderUseCase")
        private readonly _createOrderUseCase: ICreateOrderUseCase,
    ) { }

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const validationResult = CreateOrderSchema.parse(req.body)
            const order = await this._createOrderUseCase.execute(validationResult);

            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.ORDER_CREATED_SUCCESS,
                data: order,
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in create order controller ", error)
        }
    }
}

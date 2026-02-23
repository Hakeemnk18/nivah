import { inject, injectable } from "tsyringe";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError, handleError } from "../../../core/errors/custom.error.js";
import type { Request, Response } from "express";
import { CreateOrderSchema } from "../dtos/create.order.dto.js";
import type { IOrderController } from "./order.controller.interface.js";
import type { ICreateOrderUseCase } from "../use-cases/interfaces/create.order.use-case.interface.js";
import { VerifyPaymentSchema } from "../dtos/verify.payment.dto.js";
import type { IVerifyPaymentUseCase } from "../use-cases/interfaces/verify.payment.use-case.interface.js";
import type { IGetOrderStatusUseCase } from "../use-cases/interfaces/get.order.status.use-case.interface.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";

@injectable()
export class OrderController implements IOrderController {
    constructor(
        @inject("ICreateOrderUseCase")
        private readonly _createOrderUseCase: ICreateOrderUseCase,

        @inject("IVerifyPaymentUseCase")
        private readonly _verifyPaymentUseCase: IVerifyPaymentUseCase,

        @inject("IGetOrderStatusUseCase")
        private readonly _getOrderStatusUseCase: IGetOrderStatusUseCase,
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

    async verifyPayment(req: Request, res: Response): Promise<void> {
        try {
            const validationResult = VerifyPaymentSchema.parse(req.body)
            console.log("validationResult", validationResult)
            const order = await this._verifyPaymentUseCase.execute(validationResult);

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

    async getOrderStatus(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            const orderStatus = await this._getOrderStatusUseCase.execute(orderId!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: orderStatus,
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in get order status controller ", error)
        }
    }
}

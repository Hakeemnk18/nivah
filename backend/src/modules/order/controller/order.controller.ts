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
import type { IHandlePaymentFailureUseCase } from "../use-cases/interfaces/failure.payment.use-case.interface.js";
import { HandlePaymentFailureSchema } from "../dtos/failure.order.dto.js";
import type { IGetOrderSummaryUseCase } from "../use-cases/interfaces/get.order.summery.use-case.interface.js";
import { GuestIdSchema } from "../../../core/utils/guest.id.validation.js";
import type { IDownloadInvoiceUseCase } from "../use-cases/interfaces/download.invoice.use-case.interface.js";

@injectable()
export class OrderController implements IOrderController {
    constructor(
        @inject("ICreateOrderUseCase")
        private readonly _createOrderUseCase: ICreateOrderUseCase,

        @inject("IVerifyPaymentUseCase")
        private readonly _verifyPaymentUseCase: IVerifyPaymentUseCase,

        @inject("IGetOrderStatusUseCase")
        private readonly _getOrderStatusUseCase: IGetOrderStatusUseCase,

        @inject("IHandlePaymentFailureUseCase")
        private readonly _handlePaymentFailureUseCase: IHandlePaymentFailureUseCase,

        @inject("IGetOrderSummaryUseCase")
        private readonly _getOrderSummaryUseCase: IGetOrderSummaryUseCase,

        @inject("IDownloadInvoiceUseCase")
        private readonly _downloadInvoiceUseCase: IDownloadInvoiceUseCase,
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

    async handlePaymentFailure(req: Request, res: Response): Promise<void> {
        try {
            const validationResult = HandlePaymentFailureSchema.parse(req.body)

            const order = await this._handlePaymentFailureUseCase.execute(validationResult);

            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.ORDER_CREATED_SUCCESS,
                data: order,
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in handle payment failure controller ", error)
        }
    }

    async getOrderSummary(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.orderId;
            const guestId = GuestIdSchema.parse(req.query.guestId as string);
            validateObjectId(orderId);
            const orderSummary = await this._getOrderSummaryUseCase.execute(orderId!, guestId);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: orderSummary,
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in get order summary controller ", error)
        }
    }

    async downloadInvoice(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside download invoice controller")
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            const guestId = GuestIdSchema.parse(req.query.guestId as string);
            const pdfBuffer =
                await this._downloadInvoiceUseCase.execute(orderId!, guestId);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=invoice-${orderId}.pdf`
            );

            res.status(200).send(pdfBuffer);

        } catch (error) {
            handleError(res, error);
            console.log("error in download invoice controller ", error)
        }
    }
}

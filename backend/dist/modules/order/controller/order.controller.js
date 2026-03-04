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
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError, handleError } from "../../../core/errors/custom.error.js";
import { CreateOrderSchema } from "../dtos/create.order.dto.js";
import { VerifyPaymentSchema } from "../dtos/verify.payment.dto.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";
import { HandlePaymentFailureSchema } from "../dtos/failure.order.dto.js";
import { GuestIdSchema } from "../../../core/utils/guest.id.validation.js";
import { GetAllQuerySchema } from "../../../core/shared/dtos/get.all.doc.dto.js";
import { parseReq } from "../../../core/utils/parse.query.helper.js";
let OrderController = class OrderController {
    _createOrderUseCase;
    _verifyPaymentUseCase;
    _getOrderStatusUseCase;
    _handlePaymentFailureUseCase;
    _getOrderSummaryUseCase;
    _downloadInvoiceUseCase;
    _getAdminOrdersUseCase;
    _dispatchOrderUseCase;
    _deliverOrderUseCase;
    _acceptOrderUseCase;
    _cancelOrderUseCase;
    _getAdminFullViewUseCase;
    _adminDownloadInvoiceUseCase;
    constructor(_createOrderUseCase, _verifyPaymentUseCase, _getOrderStatusUseCase, _handlePaymentFailureUseCase, _getOrderSummaryUseCase, _downloadInvoiceUseCase, _getAdminOrdersUseCase, _dispatchOrderUseCase, _deliverOrderUseCase, _acceptOrderUseCase, _cancelOrderUseCase, _getAdminFullViewUseCase, _adminDownloadInvoiceUseCase) {
        this._createOrderUseCase = _createOrderUseCase;
        this._verifyPaymentUseCase = _verifyPaymentUseCase;
        this._getOrderStatusUseCase = _getOrderStatusUseCase;
        this._handlePaymentFailureUseCase = _handlePaymentFailureUseCase;
        this._getOrderSummaryUseCase = _getOrderSummaryUseCase;
        this._downloadInvoiceUseCase = _downloadInvoiceUseCase;
        this._getAdminOrdersUseCase = _getAdminOrdersUseCase;
        this._dispatchOrderUseCase = _dispatchOrderUseCase;
        this._deliverOrderUseCase = _deliverOrderUseCase;
        this._acceptOrderUseCase = _acceptOrderUseCase;
        this._cancelOrderUseCase = _cancelOrderUseCase;
        this._getAdminFullViewUseCase = _getAdminFullViewUseCase;
        this._adminDownloadInvoiceUseCase = _adminDownloadInvoiceUseCase;
    }
    async createOrder(req, res) {
        try {
            const validationResult = CreateOrderSchema.parse(req.body);
            const order = await this._createOrderUseCase.execute(validationResult);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.ORDER_CREATED_SUCCESS,
                data: order,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in create order controller ", error);
        }
    }
    async verifyPayment(req, res) {
        try {
            console.log("called verify payment controller");
            const validationResult = VerifyPaymentSchema.parse(req.body);
            const order = await this._verifyPaymentUseCase.execute(validationResult);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.ORDER_CREATED_SUCCESS,
                data: order,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in create order controller ", error);
        }
    }
    async getOrderStatus(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            const orderStatus = await this._getOrderStatusUseCase.execute(orderId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: orderStatus,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get order status controller ", error);
        }
    }
    async handlePaymentFailure(req, res) {
        try {
            const validationResult = HandlePaymentFailureSchema.parse(req.body);
            const order = await this._handlePaymentFailureUseCase.execute(validationResult);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.ORDER_CREATED_SUCCESS,
                data: order,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in handle payment failure controller ", error);
        }
    }
    async getOrderSummary(req, res) {
        try {
            const orderId = req.params.orderId;
            const guestId = GuestIdSchema.parse(req.query.guestId);
            validateObjectId(orderId);
            const orderSummary = await this._getOrderSummaryUseCase.execute(orderId, guestId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: orderSummary,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get order summary controller ", error);
        }
    }
    async downloadInvoice(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            const guestId = GuestIdSchema.parse(req.query.guestId);
            const pdfBuffer = await this._downloadInvoiceUseCase.execute(orderId, guestId);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=invoice-${orderId}.pdf`);
            res.status(200).send(pdfBuffer);
        }
        catch (error) {
            handleError(res, error);
            console.log("error in download invoice controller ", error);
        }
    }
    async getAdminOrders(req, res) {
        try {
            const dto = GetAllQuerySchema.parse(parseReq(req, ["orderStatus"]));
            const { data, total } = await this._getAdminOrdersUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
                totalPages: Math.ceil(total / dto.limit),
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get admin orders controller ", error);
        }
    }
    async dispatchOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            await this._dispatchOrderUseCase.execute(orderId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.ORDER_DISPATCHED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in dispatch order controller ", error);
        }
    }
    async deliverOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            await this._deliverOrderUseCase.execute(orderId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.ORDER_DELIVERED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in deliver order controller ", error);
        }
    }
    async acceptOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            await this._acceptOrderUseCase.execute(orderId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.ORDER_ACCEPTED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in accept order controller ", error);
        }
    }
    async cancelOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            await this._cancelOrderUseCase.execute(orderId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.ORDER_CANCELLED_SUCCESS,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in cancel order controller ", error);
        }
    }
    async getAdminFullView(req, res) {
        try {
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            const order = await this._getAdminFullViewUseCase.execute(orderId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: order,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get admin full view controller ", error);
        }
    }
    async adminDownloadInvoice(req, res) {
        try {
            console.log("admin download invoice controller called");
            const orderId = req.params.orderId;
            validateObjectId(orderId);
            const pdfBuffer = await this._adminDownloadInvoiceUseCase.execute(orderId);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=invoice-${orderId}.pdf`);
            res.status(200).send(pdfBuffer);
        }
        catch (error) {
            handleError(res, error);
            console.log("error in download invoice controller ", error);
        }
    }
};
OrderController = __decorate([
    injectable(),
    __param(0, inject("ICreateOrderUseCase")),
    __param(1, inject("IVerifyPaymentUseCase")),
    __param(2, inject("IGetOrderStatusUseCase")),
    __param(3, inject("IHandlePaymentFailureUseCase")),
    __param(4, inject("IGetOrderSummaryUseCase")),
    __param(5, inject("IDownloadInvoiceUseCase")),
    __param(6, inject("IGetAdminOrdersUseCase")),
    __param(7, inject("IDispatchOrderUseCase")),
    __param(8, inject("IDeliverOrderUseCase")),
    __param(9, inject("IAcceptOrderUseCase")),
    __param(10, inject("ICancelOrderUseCase")),
    __param(11, inject("IGetAdminFullViewUseCase")),
    __param(12, inject("IAdminDownloadInvoiceUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], OrderController);
export { OrderController };
//# sourceMappingURL=order.controller.js.map
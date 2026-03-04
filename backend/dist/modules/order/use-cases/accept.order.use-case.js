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
import { CustomError } from "../../../core/errors/custom.error.js";
let AcceptOrderUseCase = class AcceptOrderUseCase {
    _orderRepository;
    _notificationService;
    constructor(_orderRepository, _notificationService) {
        this._orderRepository = _orderRepository;
        this._notificationService = _notificationService;
    }
    async execute(orderId) {
        const order = await this._orderRepository.findById(orderId);
        if (!order) {
            throw new CustomError(ResponseMessages.ORDER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (order.orderStatus !== "confirmed") {
            throw new CustomError(ResponseMessages.ORDER_NOT_CONFIRMED, HttpStatusCode.BAD_REQUEST);
        }
        await this._orderRepository.acceptOrder(orderId);
        await this._notificationService.sendBookingConfirmation(order.userSnapshot.phone, `✅ Your order has been successfully accepted.\nOrder ID: ${order.orderNumber}\nWe will notify you about further updates soon.`);
    }
};
AcceptOrderUseCase = __decorate([
    injectable(),
    __param(0, inject("IOrderRepository")),
    __param(1, inject("INotificationService")),
    __metadata("design:paramtypes", [Object, Function])
], AcceptOrderUseCase);
export { AcceptOrderUseCase };
//# sourceMappingURL=accept.order.use-case.js.map
import { inject, injectable } from "tsyringe";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IAcceptOrderUseCase } from "./interfaces/accept.order.use-case.interface.js";
import type { INotificationService } from "../../../core/ports/notification.service.interface.js";

@injectable()
export class AcceptOrderUseCase implements IAcceptOrderUseCase {
    constructor(
        @inject("IOrderRepository")
        private readonly _orderRepository: IOrderRepository,

        @inject("INotificationService")
        private readonly _notificationService: INotificationService,
    ) { }

    async execute(orderId: string): Promise<void> {

        const order = await this._orderRepository.findById(orderId);
        if (!order) {
            throw new CustomError(
                ResponseMessages.ORDER_NOT_FOUND,
                HttpStatusCode.NOT_FOUND
            )
        }
        if (order.orderStatus !== "confirmed") {
            throw new CustomError(
                ResponseMessages.ORDER_NOT_CONFIRMED,
                HttpStatusCode.BAD_REQUEST
            )
        }
        await this._orderRepository.acceptOrder(orderId);
        await this._notificationService.sendBookingConfirmation(
            order.userSnapshot.phone,
            `✅ Your order has been successfully accepted.\nOrder ID: ${order.orderNumber}\nWe will notify you about further updates soon.`
        );
    }
}
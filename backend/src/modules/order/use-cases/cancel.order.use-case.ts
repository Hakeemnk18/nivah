import { inject, injectable } from "tsyringe";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { ICancelOrderUseCase } from "./interfaces/cancel.order.use-case.interface.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";

@injectable()
export class CancelOrderUseCase implements ICancelOrderUseCase {
    constructor(
        @inject("IOrderRepository")
        private readonly _orderRepository: IOrderRepository,
    ) { }

    async execute(orderId: string): Promise<void> {
        const order = await this._orderRepository.findById(orderId);
        if (!order) {
            throw new CustomError(
                ResponseMessages.ORDER_NOT_FOUND,
                HttpStatusCode.NOT_FOUND,
            )
        }

        if (order.orderStatus === "delivered") {
            throw new CustomError(
                ResponseMessages.ORDER_DELIVERED,
                HttpStatusCode.BAD_REQUEST,
            )
        }
        if (order.orderStatus === "cancelled") {
            throw new CustomError(
                ResponseMessages.ORDER_CANCELLED,
                HttpStatusCode.BAD_REQUEST,
            )
        }
        await this._orderRepository.cancelOrder(orderId);
    }
}
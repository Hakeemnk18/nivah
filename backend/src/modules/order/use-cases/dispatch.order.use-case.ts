import { inject, injectable } from "tsyringe";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IDispatchOrderUseCase } from "./interfaces/dispatch.order.use-case.interface.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";

@injectable()
export class DispatchOrderUseCase implements IDispatchOrderUseCase {
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

        if (order.orderStatus !== "accepted") {
            throw new CustomError(
                ResponseMessages.ORDER_NOT_ACCEPTED,
                HttpStatusCode.BAD_REQUEST,
            )
        }
        await this._orderRepository.dispatchOrder(orderId);

    }
}
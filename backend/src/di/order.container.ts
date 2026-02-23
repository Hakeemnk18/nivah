import { container } from "tsyringe";
import type { IOrderRepository } from "../modules/order/repositories/order.repository.interface.js";
import type { ICreateOrderUseCase } from "../modules/order/use-cases/interfaces/create.order.use-case.interface.js";
import { CreateOrderUseCase } from "../modules/order/use-cases/create.order.use-case.js";
import { OrderRepository } from "../modules/order/repositories/order.repository.js";
import type { IVerifyPaymentUseCase } from "../modules/order/use-cases/interfaces/verify.payment.use-case.interface.js";
import { VerifyPaymentUseCase } from "../modules/order/use-cases/verify.payment.use-case.js";
import type { IHandleRazorpayWebhookUseCase } from "../modules/order/use-cases/interfaces/handle.webhook.use-case.interface.js";
import { HandleRazorpayWebhookUseCase } from "../modules/order/use-cases/handle.webhook.usecase.js";
import type { IGetOrderStatusUseCase } from "../modules/order/use-cases/interfaces/get.order.status.use-case.interface.js";
import { GetOrderStatusUseCase } from "../modules/order/use-cases/get.order.status.use-case.js";
import type { IAutoCancelOrderUseCase } from "../modules/order/use-cases/interfaces/auto.cancel-order.use-case.js";
import { AutoCancelOrderUseCase } from "../modules/order/use-cases/auto-cancel-order.use-case.js";

export const registerOrderDependencies = () => {
    container.register<IOrderRepository>("IOrderRepository", {
        useClass: OrderRepository,
    });

    container.register<ICreateOrderUseCase>("ICreateOrderUseCase", {
        useClass: CreateOrderUseCase,
    });

    container.register<IVerifyPaymentUseCase>("IVerifyPaymentUseCase", {
        useClass: VerifyPaymentUseCase,
    });

    container.register<IHandleRazorpayWebhookUseCase>("IHandleRazorpayWebhookUseCase", {
        useClass: HandleRazorpayWebhookUseCase,
    });

    container.register<IGetOrderStatusUseCase>("IGetOrderStatusUseCase", {
        useClass: GetOrderStatusUseCase,
    });

    container.register<IAutoCancelOrderUseCase>("IAutoCancelOrderUseCase", {
        useClass: AutoCancelOrderUseCase,
    });

};
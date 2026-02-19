import { container } from "tsyringe";
import type { IOrderRepository } from "../modules/order/repositories/order.repository.interface.js";
import type { ICreateOrderUseCase } from "../modules/order/use-cases/interfaces/create.order.use-case.interface.js";
import { CreateOrderUseCase } from "../modules/order/use-cases/create.order.use-case.js";
import { OrderRepository } from "../modules/order/repositories/order.repository.js";

export const registerOrderDependencies = () => {
    container.register<IOrderRepository>("IOrderRepository", {
        useClass: OrderRepository,
    });

    container.register<ICreateOrderUseCase>("ICreateOrderUseCase", {
        useClass: CreateOrderUseCase,
    });

};
import type { ICartRepository } from "../modules/cart/repositories/cart.repository.interface.js";
import { CartRepository } from "../modules/cart/repositories/cart.repository.js";
import { container } from "tsyringe";
import type { ICreateCartUseCase } from "../modules/cart/use-cases/interfaces/create.cart.use-case.interface.js";
import { CreateCartUseCase } from "../modules/cart/use-cases/create.cart.use-case.js";

export const registerCartDependencies = () => {
    container.register<ICartRepository>("ICartRepository", {
        useClass: CartRepository,
    });

    container.register<ICreateCartUseCase>("ICreateCartUseCase", {
        useClass: CreateCartUseCase,
    });

};
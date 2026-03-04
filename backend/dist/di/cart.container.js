import { CartRepository } from "../modules/cart/repositories/cart.repository.js";
import { container } from "tsyringe";
import { CreateCartUseCase } from "../modules/cart/use-cases/create.cart.use-case.js";
import { GetCartUseCase } from "../modules/cart/use-cases/get.cart.use-case.js";
import { RemoveCartItemUseCase } from "../modules/cart/use-cases/remove.cart.item.use-case.js";
import { UpdateCartCountUseCase } from "../modules/cart/use-cases/update.cart.count.use-case.js";
import { GetCheckoutItemUseCase } from "../modules/cart/use-cases/get.checkout.item.use-case.js";
export const registerCartDependencies = () => {
    container.register("ICartRepository", {
        useClass: CartRepository,
    });
    container.register("ICreateCartUseCase", {
        useClass: CreateCartUseCase,
    });
    container.register("IGetCartUseCase", {
        useClass: GetCartUseCase,
    });
    container.register("IRemoveCartItemUseCase", {
        useClass: RemoveCartItemUseCase,
    });
    container.register("IUpdateCartCountUseCase", {
        useClass: UpdateCartCountUseCase,
    });
    container.register("IGetCheckoutItemUseCase", {
        useClass: GetCheckoutItemUseCase,
    });
};
//# sourceMappingURL=cart.container.js.map
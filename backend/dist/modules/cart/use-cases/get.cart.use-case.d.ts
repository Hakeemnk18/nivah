import type { ICartRepository } from "../repositories/cart.repository.interface.js";
import type { CartView } from "../types/cart.type.js";
import type { IGetCartUseCase } from "./interfaces/get.cart.use-case.interface.js";
export declare class GetCartUseCase implements IGetCartUseCase {
    private readonly _cartRepository;
    constructor(_cartRepository: ICartRepository);
    execute(guestId: string): Promise<CartView>;
}
//# sourceMappingURL=get.cart.use-case.d.ts.map
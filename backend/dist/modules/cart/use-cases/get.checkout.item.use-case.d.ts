import type { ICartRepository } from "../repositories/cart.repository.interface.js";
import type { CheckoutView } from "../types/cart.type.js";
import type { IGetCheckoutItemUseCase } from "./interfaces/get.checkout.item.use-case.interface.js";
export declare class GetCheckoutItemUseCase implements IGetCheckoutItemUseCase {
    private readonly _cartRepository;
    constructor(_cartRepository: ICartRepository);
    execute(guestId: string): Promise<CheckoutView>;
}
//# sourceMappingURL=get.checkout.item.use-case.d.ts.map
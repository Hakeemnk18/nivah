import type { CartView } from "../../types/cart.type.js";
export interface IGetCartUseCase {
    execute(guestId: string): Promise<CartView>;
}
//# sourceMappingURL=get.cart.use-case.interface.d.ts.map
import type { CheckoutView } from "../../types/cart.type.js";
export interface IGetCheckoutItemUseCase {
    execute(guestId: string): Promise<CheckoutView | null>;
}
//# sourceMappingURL=get.checkout.item.use-case.interface.d.ts.map
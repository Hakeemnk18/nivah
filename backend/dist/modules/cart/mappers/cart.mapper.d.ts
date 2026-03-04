import { Cart } from "../entities/cart.entity.js";
import type { CartView, CheckoutView } from "../types/cart.type.js";
export declare class CartMapper {
    static toDomain(cartModelData: any): Cart | null;
    static toPersistence(cartEntity: Cart): any;
    static toView(raw: any): CartView;
    static toCheckoutView(raw: any): CheckoutView;
}
//# sourceMappingURL=cart.mapper.d.ts.map
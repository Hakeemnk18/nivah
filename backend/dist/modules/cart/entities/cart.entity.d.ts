import type { CartItem } from "../types/cart.type.js";
export type CartProps = {
    id?: string | null;
    userId?: string | null;
    guestId?: string | null;
    items?: CartItem[];
    isActive?: boolean;
};
export declare class Cart {
    readonly id: string | null;
    readonly userId: string | null;
    readonly guestId: string | null;
    readonly items: CartItem[];
    readonly isActive: boolean;
    constructor(props: CartProps);
    addItem(newItem: CartItem): Cart;
    updateQuantity(itemId: string, quantity: number): Cart;
    removeItem(itemId: string): Cart;
    clear(): Cart;
    findSameItemInCart(productId: string, variantId: string): CartItem | undefined;
}
//# sourceMappingURL=cart.entity.d.ts.map
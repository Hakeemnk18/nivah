import { Cart } from "../entities/cart.entity.js";
import type { ICartRepository } from "./cart.repository.interface.js";
import type { AddCartItemPayload, CartView, CheckoutView, FindSameItemInCartPayload, PushNewItemPayload, RemoveCartItemPayload } from "../types/cart.type.js";
import type { ClientSession } from "mongoose";
export declare class CartRepository implements ICartRepository {
    create(cartEntity: Cart): Promise<Cart>;
    findById(id: string): Promise<Cart | null>;
    findByGuestId(guestId: string): Promise<Cart | null>;
    findByUserId(userId: string): Promise<Cart | null>;
    save(cartEntity: Cart): Promise<Cart>;
    incrementItemQuantity(dto: AddCartItemPayload): Promise<boolean>;
    pushNewItem(dto: PushNewItemPayload): Promise<boolean>;
    findSameItemInCart(dto: FindSameItemInCartPayload): Promise<boolean>;
    findCartForViewByGuestId(guestId: string): Promise<CartView | null>;
    decrementItemQuantity(dto: AddCartItemPayload): Promise<boolean>;
    removeItem(dto: RemoveCartItemPayload): Promise<boolean>;
    getCheckoutViewByGuestId(guestId: string): Promise<CheckoutView | null>;
    emptyCart(guestId: string, session?: ClientSession): Promise<void>;
}
//# sourceMappingURL=cart.repository.d.ts.map
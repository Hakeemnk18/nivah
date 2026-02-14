import { Cart } from "../entities/cart.entity.js";
import type { AddCartItemPayload, CartView, FindSameItemInCartPayload, PushNewItemPayload } from "../types/cart.type.js";

export interface ICartRepository {
  create(cartEntity: Cart): Promise<Cart>;

  findById(id: string): Promise<Cart | null>;

  findByGuestId(guestId: string): Promise<Cart | null>;

  findByUserId(userId: string): Promise<Cart | null>;

  save(cartEntity: Cart): Promise<Cart>;

  findCartForViewByGuestId(guestId: string): Promise<CartView | null>;

  findCartForViewByUserId(userId: string): Promise<CartView | null>;
  findSameItemInCart(
    dto: FindSameItemInCartPayload
  ): Promise<boolean>;

  incrementItemQuantity(
    dto: AddCartItemPayload
  ): Promise<boolean>;

  pushNewItem(
    dto: PushNewItemPayload
  ): Promise<boolean>;
}

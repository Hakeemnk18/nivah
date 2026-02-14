import { Cart } from "../entities/cart.entity.js";
import type {
  CartView,
  CartItemView,
} from "../types/cart.type.js";

export class CartMapper {
  /* ================= DOMAIN ================= */

  static toDomain(cartModelData: any): Cart | null {
    if (!cartModelData) return null;

    const idString =
      cartModelData._id?.toString() || cartModelData.id?.toString();

    if (!idString) {
      console.error("Cart data missing ID:", cartModelData);
      return null;
    }

    return new Cart({
      id: idString,
      userId: cartModelData.userId?.toString() || null,
      guestId: cartModelData.guestId || null,

      items:
        cartModelData.items?.map((item: any) => ({
          id: item._id?.toString() || item.id?.toString(),
          productId: item.productId?.toString(),
          variantId: item.variantId?.toString(),
          quantity: item.quantity,
        })) ?? [],

      isActive: cartModelData.isActive,
    });
  }

  /* ================= PERSISTENCE ================= */

  static toPersistence(cartEntity: Cart): any {
    return {
      userId: cartEntity.userId,
      guestId: cartEntity.guestId,

      items: cartEntity.items.map((item) => ({
        _id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),

      isActive: cartEntity.isActive,
    };
  }

  /* ================= VIEW ================= */

  static toView(cartModelData: any): CartView | null {
    if (!cartModelData) return null;

    const id =
      cartModelData._id?.toString() || cartModelData.id?.toString();

    if (!id) {
      console.error("Cart data missing ID:", cartModelData);
      return null;
    }

    return {
      id,
      items:
        cartModelData.items?.map((item: any): CartItemView => ({
          itemId: item._id.toString(),
          productId: item.productId?.toString(),
          variantId: item.variantId?.toString(),
          quantity: item.quantity,
        })) ?? [],
    };
  }
}

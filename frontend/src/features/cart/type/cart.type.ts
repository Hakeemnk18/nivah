import type { ApiResponse } from "../../../shared/types/api.types";

export type AddCartItemPayload = {
    guestId: string;
    productId: string;
    variantId: string;
    quantity: number;
}

export type ProductView = {
    image: string
    price: number
    name: string
}

export type CartItemView = {
    itemId: string;
    product: ProductView;
    variantId: string;
    quantity: number;
}
export type CartView = {
    id: string;
    guestId: string;
    items: CartItemView[];
    totalItems: number;
    totalPrice: number;
}

export type ActionType = "increment" | "decrement";

export type UpdateCartCountPayload = {
    guestId: string;
    cartId: string;
    itemId: string;
    action: ActionType;
}
export type RemoveCartItemPayload = {
    guestId: string;
    cartId: string;
    itemId: string;
}

export type GetCartResponse = ApiResponse<CartView>



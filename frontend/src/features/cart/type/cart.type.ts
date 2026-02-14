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
    id: string;
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



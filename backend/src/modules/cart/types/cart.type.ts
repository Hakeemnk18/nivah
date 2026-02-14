export type CartItem = {
    productId: string;
    variantId: string;
    quantity: number;
    id: string
}

export type Cart = {
    userId: string | null;
    guestId: string | null;
    items: CartItem[];
    isActive: boolean;
    id: string
}

export type CartItemView = {
  itemId: string;      
  productId: string;
  variantId: string;
  quantity: number;
};



export type CartView = {
  id: string;
  items: CartItemView[];
};

export type AddCartItemPayload = {
  cartId: string;
  productId: string;
  variantId: string;
  quantity: number;
  stock: number;
};

export type FindSameItemInCartPayload = {
  cartId: string;
  productId: string;
  variantId: string;
};

export type PushNewItemPayload = {
  cartId: string;
  stock: number;
  item: {
    productId: string;
    variantId: string;
    quantity: number;
  }
}

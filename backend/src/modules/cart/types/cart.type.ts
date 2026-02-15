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

export type AddCartItemPayload = {
  guestId: string;
  cartId: string;
  itemId: string;
  quantity: number;
  stock: number;
};

export type RemoveCartItemPayload = {
  guestId: string;
  cartId: string;
  itemId: string;
}

export type FindSameItemInCartPayload = {
  cartId: string;
  itemId: string;
};

export type PushNewItemPayload = {
  guestId: string;
  cartId: string;
  stock: number;
  item: {
    productId: string;
    variantId: string;
    quantity: number;
  }
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

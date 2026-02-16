import api from "../../../api/axios.instance";
import type { ApiResponse, GetIdNameResponse, } from "../../../shared/types/api.types";
import type { AddCartItemPayload, CheckoutResponse, GetCartResponse, RemoveCartItemPayload, UpdateCartCountPayload } from "../type/cart.type";



/* ---------- Add Item to cart ---------- */
export const addItemToCartApi = async (
    data: AddCartItemPayload
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/cart", data);
    return response.data;
};

/* ---------- Get Cart ---------- */
export const getCartApi = async (
    guestId: string
): Promise<GetCartResponse> => {
    const response = await api.get<GetCartResponse>(`/cart/${guestId}`);
    return response.data;
};

/* ---------- Update Cart Count ---------- */
export const updateCartCountApi = async (
    data: UpdateCartCountPayload
): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/cart/update-cart-count`, data);
    return response.data;
};

/* ---------- Remove Cart Item ---------- */
export const removeCartItemApi = async (
    data: RemoveCartItemPayload
): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/cart/remove-cart-item`, data);
    return response.data;
};

export const getCheckoutApi = async (
    guestId: string
): Promise<CheckoutResponse> => {
    const response = await api.get<CheckoutResponse>(`/cart/checkout-item/${guestId}`);
    return response.data;
};


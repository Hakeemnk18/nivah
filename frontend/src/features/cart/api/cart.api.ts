import api from "../../../api/axios.instance";
import type { ApiResponse, GetIdNameResponse, } from "../../../shared/types/api.types";
import type { AddCartItemPayload } from "../type/cart.type";



/* ---------- Add Item to cart ---------- */
export const addItemToCartApi = async (
    data: AddCartItemPayload
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/cart", data);
    return response.data;
};

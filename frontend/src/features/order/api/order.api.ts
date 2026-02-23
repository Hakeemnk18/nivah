import api from "../../../api/axios.instance";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { CreateOrderResponse, OrderPlacementPayload } from "../types/order.type";


/* ---------- CREATE ORDER ---------- */
export const createOrderApi = async (
    data: OrderPlacementPayload
): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>("/orders", data);
    return response.data;
};
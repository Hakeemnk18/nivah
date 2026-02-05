import api from "../../../api/axios.instance";
import type {
  ApiResponse,
} from "../../../shared/types/api.types";

import type {
  CreateProductPayload,
  GetProductDetailsResponse,
  GetProductListResponse,
  AddVariantPayload,
  UpdateVariantParams,
} from "../type/product.type";

/* ---------- CREATE PRODUCT ---------- */
export const createProductApi = async (
  data: CreateProductPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/products", data);
  return response.data;
};

/* ---------- EDIT PRODUCT ---------- */
export const editProductApi = async (
  id: string,
  data: CreateProductPayload
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/products/${id}`, data);
  return response.data;
};

/* ---------- BLOCK PRODUCT ---------- */
export const blockProductApi = async (
  id: string
): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(`/products/${id}/block`);
  return response.data;
};

/* ---------- UNBLOCK PRODUCT ---------- */
export const unblockProductApi = async (
  id: string
): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(`/products/${id}/unblock`);
  return response.data;
};

/* ---------- ADMIN: GET ALL PRODUCTS ---------- */
export const getAllProductsForAdminApi = async (
  query: Record<string, any>
): Promise<GetProductListResponse> => {
  const response = await api.get<GetProductListResponse>("/products", {
    params: query,
  });

  return response.data;
};

/* ---------- GET PRODUCT BY ID ---------- */
export const getProductByIdForAdminApi = async (
  id: string
): Promise<GetProductDetailsResponse> => {
  console.log("api called ", id)
  const response = await api.get<GetProductDetailsResponse>(`/products/${id}`);
  return response.data;
};

/* ---------- ADD VARIANT ---------- */
export const addVariantApi = async (
  productId: string,
  data: AddVariantPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `/products/${productId}/variants`,
    data
  );
  return response.data;
};

/* ---------- EDIT VARIANT ---------- */
export const editVariantApi = async (
  params: UpdateVariantParams
): Promise<ApiResponse> => {
  const { productId, variantId, data } = params;

  const response = await api.put<ApiResponse>(
    `/products/${productId}/variants/${variantId}`,
    data
  );

  return response.data;
};
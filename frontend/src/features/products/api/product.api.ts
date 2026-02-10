import api from "../../../api/axios.instance";
import type {
  ApiResponse,
} from "../../../shared/types/api.types";

import type {
  CreateProductPayload,
  GetProductDetailsResponse,
  GetProductListResponse,
  UpdateVariantParams,
  UpdateProductParams,
  VariantResponse,
  AddVariantParams,
  UserProductListResponse,
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
  params: UpdateProductParams
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/products/${params.id}`, params.data);
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

  const response = await api.get<GetProductDetailsResponse>(`/products/${id}`);
  return response.data;
};

/* ---------- ADD VARIANT ---------- */
export const addVariantApi = async (
  params: AddVariantParams
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `/products/${params.productId}/variants`,
    params.data
  );
  return response.data;
};

/* ---------- EDIT VARIANT ---------- */
export const updateVariantApi = async (
  params: UpdateVariantParams
): Promise<ApiResponse> => {
  const { productId, variantId, data } = params;
  console.log("data ", data)
  const response = await api.put<ApiResponse>(
    `/products/${productId}/variants/${variantId}`,
    data
  );

  return response.data;
};

export const getProductVariantForAdminApi = async (
  productId: string,
  variantId: string
): Promise<VariantResponse> => {
  const response = await api.get<VariantResponse>(
    `/products/${productId}/variants/${variantId}`
  );

  return response.data;
};

export const getFeaturedProductsApi = async (): Promise<UserProductListResponse> => {
  const response = await api.get<UserProductListResponse>("/products/featured");
  return response.data;
};  
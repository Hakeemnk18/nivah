import api from "../../../api/axios.instance";
import type { ApiResponse, GetIdNameResponse, } from "../../../shared/types/api.types";
import type {  CreateCategoryPayload, GetCategoryDetailsResponse, GetCategoryListResponse } from "../type/category.type";



/* ---------- CREATE CATEGORY ---------- */
export const createCategoryApi = async (
  data: CreateCategoryPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/category", data);
  return response.data;
};

/* ---------- EDIT CATEGORY ---------- */
export const editCategoryApi = async (
  id: string,
  data: CreateCategoryPayload
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/category/${id}`, data);
  return response.data;
};

/* ---------- BLOCK CATEGORY ---------- */
export const blockCategoryApi = async (id: string): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(`/category/${id}/block`);
  return response.data;
};

/* ---------- UNBLOCK CATEGORY ---------- */
export const unblockCategoryApi = async (id: string): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(`/category/${id}/unblock`);
  return response.data;
};

/* ---------- ADMIN: GET ALL CATEGORIES ---------- */
export const getAllCategoriesForAdminApi = async (
  query: Record<string, any>
): Promise<GetCategoryListResponse> => {
   
  const response = await api.get<GetCategoryListResponse>("/categories", {
    params: query,
  });

  return response.data
};

/* ---------- GET CATEGORY BY ID ---------- */
export const getCategoryByIdApi = async (
  id: string
): Promise<GetCategoryDetailsResponse> => {
  const response = await api.get<GetCategoryDetailsResponse>(`/category/${id}`);
  return response.data;
};

/* ---------- USER: GET PARENT CATEGORIES ---------- */
export const getParentCategoriesApi = async (): Promise<GetIdNameResponse> => {
  const response = await api.get<GetIdNameResponse>("/category/parent");
  return response.data;
};

/* ---------- USER: GET SUB CATEGORIES ---------- */
export const getSubCategoriesApi = async (
  parentId: string
): Promise<GetIdNameResponse> => {
  const response = await api.get<GetIdNameResponse>(`/category/sub/${parentId}`);
  return response.data;
};

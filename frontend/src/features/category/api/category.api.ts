import api from "../../../api/axios.instance";
import type { ApiResponse, GetIdNameResponse, } from "../../../shared/types/api.types";
import type { CreateCategoryPayload, GetCategoryDetailsResponse, GetCategoryListResponse, GetSignatureCategoriesResponse } from "../type/category.type";



/* ---------- CREATE CATEGORY ---------- */
export const createCategoryApi = async (
  data: CreateCategoryPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/categories", data);
  return response.data;
};

/* ---------- EDIT CATEGORY ---------- */
export const editCategoryApi = async (
  id: string,
  data: CreateCategoryPayload
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/categories/${id}`, data);
  return response.data;
};

/* ---------- BLOCK CATEGORY ---------- */
export const blockCategoryApi = async (id: string): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(`/categories/${id}/block`);
  return response.data;
};

/* ---------- UNBLOCK CATEGORY ---------- */
export const unblockCategoryApi = async (id: string): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(`/categories/${id}/unblock`);
  return response.data;
};

/* ---------- ADMIN: GET ALL CATEGORIES ---------- */
export const getAllCategoriesForAdminApi = async (
  query: Record<string, any>,
  parentId: string | null = null
): Promise<GetCategoryListResponse> => {
  let url = "/categories";
  if (parentId) {
    url = `/categories/${parentId}/sub-categories`;
  }
  const response = await api.get<GetCategoryListResponse>(url, {
    params: query,
  });

  return response.data
};



/* ---------- GET CATEGORY BY ID ---------- */
export const getCategoryByIdApi = async (
  id: string
): Promise<GetCategoryDetailsResponse> => {
  const response = await api.get<GetCategoryDetailsResponse>(`/categories/${id}`);
  return response.data;
};

/* ---------- USER: GET PARENT CATEGORIES ---------- */
export const getParentCategoriesApi = async (): Promise<GetIdNameResponse> => {
  const response = await api.get<GetIdNameResponse>("/categories/parent");
  return response.data;
};

/* ---------- USER: GET SUB CATEGORIES ---------- */
export const getSubCategoriesApiById = async (
  parentId: string
): Promise<GetIdNameResponse> => {
  const response = await api.get<GetIdNameResponse>(`/categories/sub/${parentId}`);
  return response.data;
};

/* ---------- ADMIN: GET ALL SUB CATEGORIES ---------- */
export const getAllSubCategoriesForAdminApi = async (): Promise<GetIdNameResponse> => {
  const response = await api.get<GetIdNameResponse>(
    "/categories/sub-categories"
  );
  return response.data;
};

/* ---------- USER: GET ALL SUB CATEGORIES ---------- */
export const getAllSubCategoriesForUserApi = async (): Promise<GetIdNameResponse> => {
  const response = await api.get<GetIdNameResponse>(
    "/categories/sub-categories/list"
  );
  return response.data;
};

/* ---------- USER: GET SIGNATURE CATEGORIES ---------- */
export const getSignatureCategoriesApi = async (): Promise<GetSignatureCategoriesResponse> => {
  const response = await api.get<GetSignatureCategoriesResponse>(
    "/categories/signature"
  );
  return response.data;
};


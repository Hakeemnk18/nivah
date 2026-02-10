import type { ApiResponse, GetAllDocResponse } from "../../../shared/types/api.types";

export type CreateCategoryPayload = {
  name: string;
  description: string;
  parentId: string | null;
};

export type CategoryListItem = {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  isActive: boolean;
  createdAt: string;
};

export type GetCategoryListResponse = GetAllDocResponse<CategoryListItem[]>
export type GetCategoryDetailsResponse =
  ApiResponse<CategoryListItem>;

export type AdminCategoryQueryKey = [
  "admin-categories",
  {
    currentPage: number;
    search: string;
    sort: string;
    filters: Record<string, any>
    parentId: string | null;
  }
];

export type signatureCategories = {
  id: string;
  name: string;
  image: string;
}

export type GetSignatureCategoriesResponse = ApiResponse<signatureCategories[]>
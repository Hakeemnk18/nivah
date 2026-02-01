import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllCategoriesForAdminApi } from "../api/category.api";
import type { AdminCategoryQueryKey, GetCategoryListResponse } from "../type/category.type";

export const useAdminCategories = (
  currentPage: number,
  search: string,
  sort: string,
  filters: Record<string, any>
) => {
  const queryKey: AdminCategoryQueryKey = [
    "admin-categories",
    { currentPage, search, sort, filters },
  ];

  const queryFn = () =>
    getAllCategoriesForAdminApi({
      page: currentPage,
      search,
      sort,
      ...filters
    });

  return useQuery<
    GetCategoryListResponse, 
    Error,                   
    GetCategoryListResponse, 
    AdminCategoryQueryKey    
  >({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
  });
};

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProductsForAdminApi } from "../api/product.api";
import type {
  AdminProductQueryKey,
  GetProductListResponse,
} from "../type/product.type";

export const useAdminProducts = (
  currentPage: number,
  search: string,
  sort: string,
  filters: Record<string, any>
) => {

  const queryKey: AdminProductQueryKey = [
    "admin-products",
    { currentPage, search, sort, filters },
  ];

  const queryFn = () =>
    getAllProductsForAdminApi({
      page: currentPage,
      search,
      sort,
      ...filters,
    });

  return useQuery<
    GetProductListResponse,
    Error,
    GetProductListResponse,
    AdminProductQueryKey
  >({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

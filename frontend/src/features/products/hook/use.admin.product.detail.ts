import { useQuery } from "@tanstack/react-query";
import { getProductByIdForAdminApi } from "../api/product.api";
import type { GetProductDetailsResponse } from "../type/product.type";

export const useAdminProductDetails = (productId: string | null) => {

  return useQuery<
    GetProductDetailsResponse,
    Error
  >({
    queryKey: ["admin-product-details", productId],
    queryFn: () => getProductByIdForAdminApi(productId as string),
    enabled: !!productId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};
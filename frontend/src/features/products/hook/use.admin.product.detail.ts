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
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
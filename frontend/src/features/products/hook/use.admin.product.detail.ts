import { useQuery } from "@tanstack/react-query";
import { getProductByIdForAdminApi } from "../api/product.api";
import type { GetProductDetailsResponse } from "../type/product.type";

export const useAdminProductDetails = (productId: string) => {
  console.log("hook called ", productId)
  return useQuery<
    GetProductDetailsResponse,
    Error
  >({
    queryKey: ["admin-product-details", productId],
    queryFn: () => getProductByIdForAdminApi(productId),
    enabled: !!productId,
  });
};
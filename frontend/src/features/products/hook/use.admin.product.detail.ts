import { useQuery } from "@tanstack/react-query";
import { getProductByIdApi } from "../api/product.api";
import type { GetProductDetailsResponse } from "../type/product.type";

export const useAdminProductDetails = (productId: string) => {
  return useQuery<
    GetProductDetailsResponse,
    Error
  >({
    queryKey: ["admin-product-details", productId],
    queryFn: () => getProductByIdApi(productId),
    enabled: !!productId,
  });
};
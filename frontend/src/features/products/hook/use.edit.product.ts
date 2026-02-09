import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductApi } from "../api/product.api";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { UpdateProductParams } from "../type/product.type";

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, UpdateProductParams>({
    mutationFn: editProductApi,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};
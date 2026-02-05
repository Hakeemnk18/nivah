import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockProductApi } from "../api/product.api";

export const useBlockProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};
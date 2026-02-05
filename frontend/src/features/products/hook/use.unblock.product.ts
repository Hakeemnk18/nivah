import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockProductApi } from "../api/product.api";

export const useUnblockProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unblockProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockCategoryApi } from "../api/category.api";

export const useBlockCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
};
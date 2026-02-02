import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockCategoryApi } from "../api/category.api";

export const useUnblockCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unblockCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
};

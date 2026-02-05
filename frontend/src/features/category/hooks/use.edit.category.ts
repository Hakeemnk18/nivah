import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategoryApi } from "../api/category.api";

export const useEditCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => editCategoryApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
};
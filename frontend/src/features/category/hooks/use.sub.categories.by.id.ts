import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesApiById } from "../api/category.api";

export const useSubCategoriesByIdForUser = (id?: string) => {
  return useQuery({
    queryKey: ["user-sub-categories", id],
    queryFn: () => getSubCategoriesApiById(id as string),
    enabled: !!id, 
  });
};
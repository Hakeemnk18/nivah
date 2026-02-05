import { useQuery } from "@tanstack/react-query";
import { getParentCategoriesApi } from "../api/category.api";

export const useParentCategories = () => {
  return useQuery({
    queryKey: ["parent-categories"],
    queryFn: getParentCategoriesApi,
  });
};
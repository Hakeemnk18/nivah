import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdApi } from "../api/category.api";

export const useCategoryById = (id: string | null) => {
  return useQuery({
    queryKey: ["admin-category", id],
    queryFn: () => getCategoryByIdApi(id as string),
    enabled: !!id,
  });
};
import { useQuery } from "@tanstack/react-query";
import { getAllSubCategoriesForAdminApi } from "../api/category.api";

export const useAllSubCategoriesForAdmin = () => {
  return useQuery({
    queryKey: ["admin-sub-categories"],
    queryFn: getAllSubCategoriesForAdminApi,
  });
};
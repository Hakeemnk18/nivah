import { useQuery } from "@tanstack/react-query";
import { getAllSubCategoriesForUserApi } from "../api/category.api";

export const useAllSubCategoriesForUser = () => {
    return useQuery({
        queryKey: ["user-sub-categories"],
        queryFn: getAllSubCategoriesForUserApi,
    });
};
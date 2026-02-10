import { useQuery } from "@tanstack/react-query";
import type { GetSignatureCategoriesResponse } from "../type/category.type";
import { getSignatureCategoriesApi } from "../api/category.api";

export const useSignatureCategories = () => {

    return useQuery<
        GetSignatureCategoriesResponse,
        Error
    >({
        queryKey: ["signature-categories"],
        queryFn: () => getSignatureCategoriesApi(),
        retry: 1,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
};
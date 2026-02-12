import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProductsForUserApi } from "../api/product.api";
import type {
    UserProductQueryKey,
    UserProductListResponse,
} from "../type/product.type";

export const useUserProducts = (
    search: string,
    sort: string,
    filters: Record<string, any>
) => {
    const queryKey: UserProductQueryKey = [
        "user-products",
        { search, sort, filters },
    ];

    return useInfiniteQuery<
        UserProductListResponse,
        Error
    >({
        queryKey,

        queryFn: ({ pageParam = 1 }) =>
            getAllProductsForUserApi({
                search,
                sort,
                page: pageParam,
                ...filters,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) =>
            lastPage?.hasMore ? lastPage.nextPage : undefined,

        refetchOnWindowFocus: false,
        retry: false
    });
};

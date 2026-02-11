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
        Error,
        UserProductListResponse,
        UserProductQueryKey
    >({
        queryKey,

        queryFn: ({ pageParam }) =>
            getAllProductsForUserApi({
                search,
                sort,
                cursor: pageParam,
                ...filters,
            }),

        initialPageParam: undefined,

        getNextPageParam: (lastPage) =>
            lastPage?.data?.hasMore ? lastPage.data.nextCursor : undefined,

        refetchOnWindowFocus: false,
    });
};

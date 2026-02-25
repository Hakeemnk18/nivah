import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminOrderListApi } from "../api/order.api";
import type { AdminOrderListResponse, AdminOrderQueryKey } from "../types/order.type";

export const useAdminOrders = (
    currentPage: number,
    search: string,
    sort: string,
    filters: Record<string, any>
) => {
    const queryKey: AdminOrderQueryKey = [
        "admin-orders",
        { currentPage, search, sort, filters },
    ];

    const queryFn = () =>
        getAdminOrderListApi(
            {
                page: currentPage,
                search,
                sort,
                ...filters
            });

    return useQuery<
        AdminOrderListResponse,
        Error,
        AdminOrderListResponse,
        AdminOrderQueryKey
    >({
        queryKey,
        queryFn,
        placeholderData: keepPreviousData,
    });
};

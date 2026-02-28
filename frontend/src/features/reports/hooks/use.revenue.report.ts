import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { RevenueReportResponse } from "../types/reports.type";
import type { RevenueFilterState } from "../types/reports.type";
import { getAdminRevenueReportApi } from "../api/reports.api";

export type RevenueReportQueryKey = [
  "admin-revenue-report",
  {
    page: number;
    option: string;
    customStartDate: string | null | undefined;
    customEndDate: string | null | undefined;
  }
];

export const useRevenueReport = (
  page: number,
  filter: RevenueFilterState,
  enabled: boolean
) => {
  const queryKey: RevenueReportQueryKey = [
    "admin-revenue-report",
    {
      page,
      option: filter.option,
      customStartDate: filter.customStartDate,
      customEndDate: filter.customEndDate,
    },
  ];

  const queryFn = () =>
    getAdminRevenueReportApi({
      page,
      option: filter.option,
      customStartDate: filter.customStartDate,
      customEndDate: filter.customEndDate,
    });

  return useQuery<
    RevenueReportResponse,
    Error,
    RevenueReportResponse,
    RevenueReportQueryKey
  >({
    queryKey,
    queryFn,
    enabled, 
    placeholderData: keepPreviousData,
    
  });
};
import api from "../../../api/axios.instance"
import type { RevenueReportResponse } from "../types/reports.type";

/* ---------- GET ADMIN REVENUE REPORT ---------- */
export const getAdminRevenueReportApi = async (
    query: Record<string, any>
): Promise<RevenueReportResponse> => {
    const response = await api.get<RevenueReportResponse>(`/reports/revenue`, {
        params: query
    });
    return response.data;
};

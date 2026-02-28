import api from "../../../api/axios.instance"
import type { KpiCardsResponse, RevenueChartResponse, RevenueRange } from "../types/admin.type";

/* ---------- GET REVENUE CHART ---------- */
export const getRevenueChartApi = async (
    range: RevenueRange
): Promise<RevenueChartResponse> => {
    const response = await api.get<RevenueChartResponse>(`/analysis/revenue-chart?range=${range}`);
    return response.data;
};

/* ---------- GET KPI CARDS ---------- */
export const getKpiCardsApi = async (): Promise<KpiCardsResponse> => {
    const response = await api.get<KpiCardsResponse>("/analysis/kpis");
    return response.data;
};
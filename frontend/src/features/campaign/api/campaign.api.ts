import api from "../../../api/axios.instance";
import type { ApiResponse } from "../../../shared/types/api.types";
import type {
    AdminGetAllCampaignResponse,
    CreateCampaignPayload,
    GetCampaignDetailsResponse,
    GetCampaignUserResponse,
} from "../types/campaign.type";

/* ---------- CREATE CAMPAIGN ---------- */
export const createCampaignApi = async (
    data: CreateCampaignPayload
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/campaigns", data);
    return response.data;
};

/* ---------- EDIT CAMPAIGN ---------- */
export const editCampaignApi = async (
    id: string,
    data: CreateCampaignPayload
): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/campaigns/${id}`, data);
    return response.data;
};

/* ---------- BLOCK CAMPAIGN ---------- */
export const blockCampaignApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/campaigns/${id}/block`);
    return response.data;
};

/* ---------- UNBLOCK CAMPAIGN ---------- */
export const unblockCampaignApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/campaigns/${id}/unblock`);
    return response.data;
};

/* ---------- ADMIN: GET ALL CAMPAIGNS ---------- */
export const getAllCampaignForAdminApi = async (): Promise<AdminGetAllCampaignResponse> => {
    const response = await api.get<AdminGetAllCampaignResponse>("/campaigns");
    return response.data;
};

/* ---------- ADMIN: GET CAMPAIGN BY ID ---------- */
export const getCampaignByIdApi = async (
    id: string
): Promise<GetCampaignDetailsResponse> => {
    const response = await api.get<GetCampaignDetailsResponse>(`/campaigns/${id}`);
    return response.data;
};

/* ---------- USER: GET CAMPAIGN BY SLUG ---------- */
export const getCampaignBySlugApi = async (
    slug: string
): Promise<GetCampaignUserResponse> => {
    const response = await api.get<GetCampaignUserResponse>(`/campaigns/slug/${slug}`);
    return response.data;
};

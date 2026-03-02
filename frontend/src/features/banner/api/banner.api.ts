import api from "../../../api/axios.instance";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { AdminGetAllBannerResponse, CreateBannerPayload, GetBannerDetailsResponse, GetBannerUserResponse } from "../types/banner.type";



/* ---------- CREATE BANNER ---------- */
export const createBannerApi = async (
    data: CreateBannerPayload
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/banners", data);
    return response.data;
};

// /* ---------- EDIT BANNER ---------- */
export const editBannerApi = async (
    id: string,
    data: CreateBannerPayload
): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/banners/${id}`, data);
    return response.data;
};

// /* ---------- BLOCK BANNER ---------- */
export const blockBannerApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/banners/${id}/block`);
    return response.data;
};

// /* ---------- UNBLOCK BANNER ---------- */
export const unblockBannerApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/banners/${id}/unblock`);
    return response.data;
};

/* ---------- ADMIN: GET ALL BANNERS ---------- */
export const getAllBannerForAdminApi = async (): Promise<AdminGetAllBannerResponse> => {
    const response = await api.get<AdminGetAllBannerResponse>("/banners");
    return response.data
};

// /* ---------- GET BANNER BY ID ---------- */
export const getBannerByIdApi = async (
    id: string
): Promise<GetBannerDetailsResponse> => {
    const response = await api.get<GetBannerDetailsResponse>(`/banners/${id}`);
    return response.data;
};

// /* ---------- GET BANNER USER ---------- */
export const getBannerUserApi = async (): Promise<GetBannerUserResponse> => {
    const response = await api.get<GetBannerUserResponse>(`/banners/list`);
    return response.data;
};
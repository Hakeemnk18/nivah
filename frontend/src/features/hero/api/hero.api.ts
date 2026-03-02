import api from "../../../api/axios.instance";
import type { ApiResponse, GetIdNameResponse, } from "../../../shared/types/api.types";
import type { AdminGetAllHeroResponse, CreateHeroPayload, GetHeroDetailsResponse, GetHeroUserResponse } from "../types/hero.type";



/* ---------- CREATE HERO ---------- */
export const createHeroApi = async (
    data: CreateHeroPayload
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/heroes", data);
    return response.data;
};

// /* ---------- EDIT HERO ---------- */
export const editHeroApi = async (
    id: string,
    data: CreateHeroPayload
): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/heroes/${id}`, data);
    return response.data;
};

// /* ---------- BLOCK HERO ---------- */
export const blockHeroApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/heroes/${id}/block`);
    return response.data;
};

// /* ---------- UNBLOCK HERO ---------- */
export const unblockHeroApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/heroes/${id}/unblock`);
    return response.data;
};

/* ---------- ADMIN: GET ALL HEROES BANNER ---------- */
export const getAllHeroForAdminApi = async (): Promise<AdminGetAllHeroResponse> => {
    const response = await api.get<AdminGetAllHeroResponse>("/heroes");
    return response.data
};

// /* ---------- GET HERO BY ID ---------- */
export const getHeroByIdApi = async (
    id: string
): Promise<GetHeroDetailsResponse> => {
    const response = await api.get<GetHeroDetailsResponse>(`/heroes/${id}`);
    return response.data;
};

// /* ---------- GET HERO USER ---------- */
export const getHeroUserApi = async (): Promise<GetHeroUserResponse> => {
    console.log("getHeroUserApi");
    const response = await api.get<GetHeroUserResponse>(`/heroes/list`);
    return response.data;
};







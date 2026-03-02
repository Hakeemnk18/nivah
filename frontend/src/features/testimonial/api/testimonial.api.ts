import api from "../../../api/axios.instance";
import type { ApiResponse, GetIdNameResponse, } from "../../../shared/types/api.types";
import type { AdminGetAllTestimonialResponse, CreateTestimonialPayload, GetTestimonialDetailsResponse, GetTestimonialUserResponse } from "../type/testimonial.type";



/* ---------- CREATE TESTIMONIAL ---------- */
export const createTestimonialApi = async (
    data: CreateTestimonialPayload
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/testimonials", data);
    return response.data;
};

// /* ---------- EDIT TESTIMONIAL ---------- */
export const editTestimonialApi = async (
    id: string,
    data: CreateTestimonialPayload
): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/testimonials/${id}`, data);
    return response.data;
};

// /* ---------- BLOCK TESTIMONIAL ---------- */
export const blockTestimonialApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/testimonials/${id}/block`);
    return response.data;
};

// /* ---------- UNBLOCK TESTIMONIAL ---------- */
export const unblockTestimonialApi = async (id: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/testimonials/${id}/unblock`);
    return response.data;
};

/* ---------- ADMIN: GET ALL TESTIMONIAL ---------- */
export const getAllTestimonialForAdminApi = async (): Promise<AdminGetAllTestimonialResponse> => {
    const response = await api.get<AdminGetAllTestimonialResponse>("/testimonials");
    return response.data
};

// /* ---------- GET TESTIMONIAL BY ID ---------- */
export const getTestimonialByIdApi = async (
    id: string
): Promise<GetTestimonialDetailsResponse> => {
    const response = await api.get<GetTestimonialDetailsResponse>(`/testimonials/${id}`);
    return response.data;
};

// /* ---------- GET TESTIMONIAL USER ---------- */
export const getTestimonialUserApi = async (): Promise<GetTestimonialUserResponse> => {
    const response = await api.get<GetTestimonialUserResponse>(`/testimonials/list`);
    return response.data;
};
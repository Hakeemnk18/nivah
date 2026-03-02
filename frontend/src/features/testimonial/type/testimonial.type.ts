import type { ApiResponse } from "../../../shared/types/api.types";


export type TestimonialView = {
    id: string;
    comment: string;
    author: string;
    isActive: boolean;
};

export type UserTestimonialView = {
    id: string;
    comment: string;
    author: string;
};

export type CreateTestimonialPayload = {
    comment: string;
    author: string;
};

export type UpdateTestimonialParams = {
    id: string;
    data: CreateTestimonialPayload;
};

export type AdminGetAllTestimonialResponse = ApiResponse<TestimonialView[]>
export type GetTestimonialDetailsResponse = ApiResponse<TestimonialView>
export type GetTestimonialUserResponse = ApiResponse<UserTestimonialView[]>

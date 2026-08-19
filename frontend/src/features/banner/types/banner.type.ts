import type { ApiResponse } from "../../../shared/types/api.types";

export type IImage = {
    url: string;
    publicId: string;
};

export type BannerView = {
    id: string;
    image: IImage;
    link?: string;
    isActive: boolean;
};

export type UserBannerView = {
    id: string;
    image: {
        url: string;
    };
    link?: string;
};

export type CreateBannerPayload = {
    image: {
        url: string;
        publicId: string;
    };
    link?: string;
};

export type UpdateBannerParams = {
    id: string;
    data: CreateBannerPayload;
};

export type AdminGetAllBannerResponse = ApiResponse<BannerView[]>
export type GetBannerDetailsResponse = ApiResponse<BannerView>
export type GetBannerUserResponse = ApiResponse<UserBannerView>

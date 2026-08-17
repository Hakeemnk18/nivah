import type { ApiResponse } from "../../../shared/types/api.types";

export type IImage = {
    url: string;
    publicId: string;
};

export type CampaignView = {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    image: IImage;
    isActive: boolean;
};

export type UserCampaignView = {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    image: {
        url: string;
    };
};

export type CreateCampaignPayload = {
    title: string;
    subtitle: string;
    slug: string;
    image: {
        url: string;
        publicId: string;
    };
};

export type UpdateCampaignParams = {
    id: string;
    data: CreateCampaignPayload;
};

export type AdminGetAllCampaignResponse = ApiResponse<CampaignView[]>;
export type GetCampaignDetailsResponse = ApiResponse<CampaignView>;
export type GetCampaignUserResponse = ApiResponse<UserCampaignView>;

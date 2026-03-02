import type { ApiResponse } from "../../../shared/types/api.types";

export type IImage = {
    url: string;
    publicId: string;
};

export type HeroView = {
    id: string;
    title: string;
    subtitle: string;
    image: IImage;
    isActive: boolean;
};

export type UserHeroView = {
    id: string;
    title: string;
    subtitle: string;
    image: {
        url: string;
    };
};

export type CreateHeroPayload = {
    title: string;
    subtitle: string;
    image: {
        url: string;
        publicId: string;
    };
};

export type UpdateHeroParams = {
    id: string;
    data: CreateHeroPayload;
};

export type AdminGetAllHeroResponse = ApiResponse<HeroView[]>
export type GetHeroDetailsResponse = ApiResponse<HeroView>
export type GetHeroUserResponse = ApiResponse<UserHeroView>

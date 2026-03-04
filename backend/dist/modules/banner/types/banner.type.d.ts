export type IImage = {
    url: string;
    publicId: string;
};
export type BannerProps = {
    id?: string | null;
    image: IImage;
    isActive?: boolean;
};
export type BannerView = {
    id: string;
    image: IImage;
    isActive: boolean;
};
export type UserBannerView = {
    id: string;
    image: {
        url: string;
    };
};
//# sourceMappingURL=banner.type.d.ts.map
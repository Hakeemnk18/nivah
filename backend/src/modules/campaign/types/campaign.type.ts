export type IImage = {
    url: string;
    publicId: string;
};

export type CampaignProps = {
    id?: string | null;
    title: string;
    subtitle: string;
    slug: string;
    image: IImage;
    isActive?: boolean;
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

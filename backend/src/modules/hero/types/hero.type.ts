export type IImage = {
    url: string;
    publicId: string;
};

export type HeroProps = {
    id?: string | null;
    title: string;
    subtitle: string;
    image: IImage;
    isActive?: boolean;
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

import type { IImage, BannerProps } from "../types/banner.type.js";

export class Banner {
    public readonly id: string | null;
    public readonly image: IImage;
    public readonly link: string | undefined;
    public readonly isActive: boolean;

    constructor(props: BannerProps) {
        if (!props.image || !props.image.url || !props.image.publicId) {
            throw new Error("Banner image with url and publicId is required");
        }

        const link = props.link?.trim();

        if (link && !link.startsWith("/") && !/^https?:\/\//.test(link)) {
            throw new Error("Banner link must be a relative path (e.g. /collections/onam) or a full URL");
        }

        this.id = props.id ?? null;
        this.image = props.image;
        this.link = link || undefined;
        this.isActive = props.isActive ?? true;
    }

    activate(): Banner {
        if (this.isActive) {
            throw new Error("Banner is already active");
        }

        return new Banner({
            ...this,
            isActive: true,
        });
    }

    deactivate(): Banner {
        if (!this.isActive) {
            throw new Error("Banner is already inactive");
        }

        return new Banner({
            ...this,
            isActive: false,
        });
    }

    updateDetails(props: {
        image: IImage;
        link?: string | undefined;
    }): Banner {
        return new Banner({
            ...this,
            image: props.image,
            link: props.link,
        });
    }
}

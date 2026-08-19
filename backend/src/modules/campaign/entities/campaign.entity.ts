import type { IImage, CampaignProps } from "../types/campaign.type.js";

const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export class Campaign {
    public readonly id: string | null;
    public readonly title: string;
    public readonly subtitle: string;
    public readonly slug: string;
    public readonly image: IImage;
    public readonly isActive: boolean;

    constructor(props: CampaignProps) {
        const title = props.title.trim();
        const subtitle = props.subtitle.trim();
        const slug = props.slug.trim().toLowerCase();

        if (!title) {
            throw new Error("Campaign title cannot be empty");
        }

        if (title.length < 2 || title.length > 100) {
            throw new Error("Campaign title must be between 2 and 100 characters");
        }

        if (!subtitle) {
            throw new Error("Campaign subtitle cannot be empty");
        }

        if (subtitle.length < 5 || subtitle.length > 200) {
            throw new Error("Campaign subtitle must be between 5 and 200 characters");
        }

        if (!slug || !SLUG_REGEX.test(slug)) {
            throw new Error(
                "Campaign slug must contain only lowercase letters, numbers, and hyphens"
            );
        }

        if (!props.image || !props.image.url || !props.image.publicId) {
            throw new Error("Campaign image with url and publicId is required");
        }

        this.id = props.id ?? null;
        this.title = title;
        this.subtitle = subtitle;
        this.slug = slug;
        this.image = props.image;
        this.isActive = props.isActive ?? true;
    }

    activate(): Campaign {
        if (this.isActive) {
            throw new Error("Campaign is already active");
        }

        return new Campaign({
            ...this,
            isActive: true,
        });
    }

    deactivate(): Campaign {
        if (!this.isActive) {
            throw new Error("Campaign is already inactive");
        }

        return new Campaign({
            ...this,
            isActive: false,
        });
    }

    updateDetails(props: {
        title: string;
        subtitle: string;
        slug: string;
        image: IImage;
    }): Campaign {
        return new Campaign({
            ...this,
            title: props.title,
            subtitle: props.subtitle,
            slug: props.slug,
            image: props.image,
        });
    }
}

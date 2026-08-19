import { Campaign } from "../entities/campaign.entity.js";
import type { CampaignView, UserCampaignView } from "../types/campaign.type.js";

export class CampaignMapper {
    static toDomain(campaignModelData: any): Campaign | null {
        if (!campaignModelData) {
            return null;
        }

        const idString =
            campaignModelData._id?.toString() || campaignModelData.id?.toString();

        if (!idString) {
            console.error("Campaign data from DB is missing an ID:", campaignModelData);
            return null;
        }

        return new Campaign({
            id: idString,
            title: campaignModelData.title,
            subtitle: campaignModelData.subtitle,
            slug: campaignModelData.slug,
            image: {
                url: campaignModelData.image?.url,
                publicId: campaignModelData.image?.publicId,
            },
            isActive: campaignModelData.isActive,
        });
    }

    static toPersistence(campaignEntity: Campaign): any {
        return {
            title: campaignEntity.title,
            subtitle: campaignEntity.subtitle,
            slug: campaignEntity.slug,
            image: {
                url: campaignEntity.image.url,
                publicId: campaignEntity.image.publicId,
            },
            isActive: campaignEntity.isActive,
        };
    }

    static toAdminView(campaignModelData: any): CampaignView | null {
        if (!campaignModelData) return null;

        const id =
            campaignModelData._id?.toString() || campaignModelData.id?.toString();

        if (!id) {
            console.error("Campaign data missing ID:", campaignModelData);
            return null;
        }

        return {
            id,
            title: campaignModelData.title,
            subtitle: campaignModelData.subtitle,
            slug: campaignModelData.slug,
            image: {
                publicId: campaignModelData.image?.publicId,
                url: campaignModelData.image?.url,
            },
            isActive: campaignModelData.isActive,
        };
    }

    static toUserView(campaignModelData: any): UserCampaignView | null {
        if (!campaignModelData) return null;

        const id =
            campaignModelData._id?.toString() || campaignModelData.id?.toString();

        if (!id) {
            console.error("Campaign data missing ID:", campaignModelData);
            return null;
        }

        return {
            id,
            title: campaignModelData.title,
            subtitle: campaignModelData.subtitle,
            slug: campaignModelData.slug,
            image: {
                url: campaignModelData.image?.url,
            },
        };
    }
}

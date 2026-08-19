import { Campaign } from "../entities/campaign.entity.js";
import type { CampaignView, UserCampaignView } from "../types/campaign.type.js";

export interface ICampaignRepository {
    create(campaignEntity: Campaign): Promise<Campaign>;
    findById(id: string): Promise<Campaign | null>;
    findBySlug(slug: string): Promise<Campaign | null>;
    save(campaignEntity: Campaign): Promise<Campaign>;
    getAllForAdmin(): Promise<CampaignView[]>;
    getBySlugForUser(slug: string): Promise<UserCampaignView | null>;
    slugExists(slug: string, excludeId?: string): Promise<boolean>;
}

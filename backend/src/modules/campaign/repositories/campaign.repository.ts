import { injectable } from "tsyringe";
import type { ICampaignRepository } from "./campaign.repository.interface.js";
import { Campaign } from "../entities/campaign.entity.js";
import { CampaignModel } from "../infrastructure/campaign.schema.js";
import { CampaignMapper } from "../mappers/campaign.mapper.js";
import type { CampaignView, UserCampaignView } from "../types/campaign.type.js";

@injectable()
export class CampaignRepository implements ICampaignRepository {
    async create(campaignEntity: Campaign): Promise<Campaign> {
        const persistenceData = CampaignMapper.toPersistence(campaignEntity);
        const created = await CampaignModel.create(persistenceData);
        return CampaignMapper.toDomain(created)!;
    }

    async findById(id: string): Promise<Campaign | null> {
        const campaign = await CampaignModel.findById(id).lean();
        if (!campaign) return null;
        return CampaignMapper.toDomain(campaign);
    }

    async findBySlug(slug: string): Promise<Campaign | null> {
        const campaign = await CampaignModel.findOne({ slug: slug.toLowerCase() }).lean();
        if (!campaign) return null;
        return CampaignMapper.toDomain(campaign);
    }

    async save(campaignEntity: Campaign): Promise<Campaign> {
        const { id } = campaignEntity;
        if (!id) {
            throw new Error("Cannot save campaign without an ID");
        }

        const persistenceData = CampaignMapper.toPersistence(campaignEntity);
        const updated = await CampaignModel.findByIdAndUpdate(
            id,
            { $set: persistenceData },
            { new: true, runValidators: true }
        ).lean();

        if (!updated) {
            throw new Error("Campaign not found for update");
        }

        return CampaignMapper.toDomain(updated)!;
    }

    async getAllForAdmin(): Promise<CampaignView[]> {
        const campaigns = await CampaignModel.find().sort({ createdAt: -1 }).lean();
        return campaigns
            .map((campaign) => CampaignMapper.toAdminView(campaign))
            .filter((campaign): campaign is CampaignView => campaign !== null);
    }

    async getBySlugForUser(slug: string): Promise<UserCampaignView | null> {
        const campaign = await CampaignModel.findOne({
            slug: slug.toLowerCase(),
            isActive: true,
        }).lean();
        return CampaignMapper.toUserView(campaign);
    }

    async slugExists(slug: string, excludeId?: string): Promise<boolean> {
        const query: Record<string, any> = { slug: slug.toLowerCase() };
        if (excludeId) {
            query._id = { $ne: excludeId };
        }
        const count = await CampaignModel.countDocuments(query);
        return count > 0;
    }
}

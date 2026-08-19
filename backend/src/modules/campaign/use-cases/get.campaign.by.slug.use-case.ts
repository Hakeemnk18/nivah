import { inject, injectable } from "tsyringe";
import type { IGetCampaignBySlugUseCase } from "./interfaces/get.campaign.by.slug.use-case.interface.js";
import type { ICampaignRepository } from "../repositories/campaign.repository.interface.js";
import type { UserCampaignView } from "../types/campaign.type.js";

@injectable()
export class GetCampaignBySlugUseCase implements IGetCampaignBySlugUseCase {
    constructor(
        @inject("ICampaignRepository")
        private readonly _campaignRepository: ICampaignRepository
    ) { }

    async execute(slug: string): Promise<UserCampaignView | null> {
        return await this._campaignRepository.getBySlugForUser(slug);
    }
}

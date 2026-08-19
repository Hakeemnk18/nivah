import { inject, injectable } from "tsyringe";
import type { ICampaignRepository } from "../repositories/campaign.repository.interface.js";
import type { CampaignView } from "../types/campaign.type.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import type { IGetCampaignByIdUseCase } from "./interfaces/get.campaign.by.id.use-case.interface.js";

@injectable()
export class GetCampaignByIdUseCase implements IGetCampaignByIdUseCase {
    constructor(
        @inject("ICampaignRepository")
        private readonly _campaignRepository: ICampaignRepository
    ) { }

    async execute(id: string): Promise<CampaignView> {
        const campaign = await this._campaignRepository.findById(id);
        if (!campaign) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_NOT_FOUND,
                HttpStatusCode.NOT_FOUND
            )
        }
        return {
            id: campaign.id!,
            title: campaign.title,
            subtitle: campaign.subtitle,
            slug: campaign.slug,
            image: campaign.image,
            isActive: campaign.isActive,
        }
    }
}

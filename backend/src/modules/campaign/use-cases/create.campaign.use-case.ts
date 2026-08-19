import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { Campaign } from "../entities/campaign.entity.js";
import type { ICreateCampaignUseCase } from "./interfaces/create.campaign.use-case.interface.js";
import type { ICampaignRepository } from "../repositories/campaign.repository.interface.js";
import type { CreateCampaignRequestDto } from "../dtos/campaign.dto.js";

@injectable()
export class CreateCampaignUseCase implements ICreateCampaignUseCase {
    constructor(
        @inject("ICampaignRepository")
        private readonly _campaignRepository: ICampaignRepository
    ) { }

    async execute(dto: CreateCampaignRequestDto): Promise<void> {
        const slugTaken = await this._campaignRepository.slugExists(dto.slug);
        if (slugTaken) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_SLUG_ALREADY_EXISTS,
                HttpStatusCode.BAD_REQUEST
            );
        }

        const campaignEntity = new Campaign({
            id: null,
            title: dto.title,
            subtitle: dto.subtitle,
            slug: dto.slug,
            image: dto.image,
            isActive: true,
        });

        const campaign = await this._campaignRepository.create(campaignEntity);

        if (!campaign) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_CREATE_FAILED,
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}

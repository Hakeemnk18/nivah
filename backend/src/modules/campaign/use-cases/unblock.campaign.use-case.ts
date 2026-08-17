import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import type { IUnblockCampaignUseCase } from "./interfaces/unblock.campaign.use-case.interface.js";
import type { ICampaignRepository } from "../repositories/campaign.repository.interface.js";

@injectable()
export class UnblockCampaignUseCase implements IUnblockCampaignUseCase {
    constructor(
        @inject("ICampaignRepository")
        private readonly _campaignRepository: ICampaignRepository
    ) { }

    async execute(id: string): Promise<void> {
        const campaign = await this._campaignRepository.findById(id);

        if (!campaign) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_NOT_FOUND,
                HttpStatusCode.NOT_FOUND
            );
        }
        if (campaign.isActive) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_ALREADY_ACTIVATED,
                HttpStatusCode.BAD_REQUEST
            );
        }

        const updatedCampaign = campaign.activate();

        const saved = await this._campaignRepository.save(updatedCampaign);

        if (!saved) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_ACTIVATE_FAILED,
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}

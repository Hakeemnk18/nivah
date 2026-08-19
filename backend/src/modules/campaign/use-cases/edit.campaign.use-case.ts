import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import type { IEditCampaignUseCase } from "./interfaces/edit.campaign.use-case.interface.js";
import type { ICampaignRepository } from "../repositories/campaign.repository.interface.js";
import type { EditCampaignRequestDto } from "../dtos/campaign.dto.js";
import { deleteCloudinaryImage } from "../../../core/utils/delete.image.helper.js";

@injectable()
export class EditCampaignUseCase implements IEditCampaignUseCase {
    constructor(
        @inject("ICampaignRepository")
        private readonly _campaignRepository: ICampaignRepository
    ) { }

    async execute(
        id: string,
        dto: EditCampaignRequestDto
    ): Promise<void> {
        const campaign = await this._campaignRepository.findById(id);

        if (!campaign) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_NOT_FOUND,
                HttpStatusCode.NOT_FOUND
            );
        }

        if (campaign.slug !== dto.slug.toLowerCase()) {
            const slugTaken = await this._campaignRepository.slugExists(dto.slug, id);
            if (slugTaken) {
                throw new CustomError(
                    ResponseMessages.CAMPAIGN_SLUG_ALREADY_EXISTS,
                    HttpStatusCode.BAD_REQUEST
                );
            }
        }

        if (campaign.image.publicId !== dto.image.publicId) {
            await deleteCloudinaryImage(campaign.image.publicId);
        }

        const updatedCampaign = campaign.updateDetails({
            title: dto.title,
            subtitle: dto.subtitle,
            slug: dto.slug,
            image: dto.image,
        });

        const saved = await this._campaignRepository.save(updatedCampaign);

        if (!saved) {
            throw new CustomError(
                ResponseMessages.CAMPAIGN_UPDATE_FAILED,
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}

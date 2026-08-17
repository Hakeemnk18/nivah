import { inject, injectable } from "tsyringe";
import type { IGetAllCampaignAdminUseCase } from "./interfaces/get.all.campaign.admin.use-case.interface.js";
import type { ICampaignRepository } from "../repositories/campaign.repository.interface.js";
import type { CampaignView } from "../types/campaign.type.js";

@injectable()
export class GetAllCampaignAdminUseCase implements IGetAllCampaignAdminUseCase {
    constructor(
        @inject("ICampaignRepository")
        private readonly _campaignRepository: ICampaignRepository
    ) { }

    async execute(): Promise<CampaignView[]> {
        return await this._campaignRepository.getAllForAdmin();
    }
}

import type { CreateCampaignRequestDto } from "../../dtos/campaign.dto.js";

export interface ICreateCampaignUseCase {
    execute(dto: CreateCampaignRequestDto): Promise<void>;
}

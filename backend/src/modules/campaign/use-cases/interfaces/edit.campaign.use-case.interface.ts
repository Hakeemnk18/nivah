import type { EditCampaignRequestDto } from "../../dtos/campaign.dto.js";

export interface IEditCampaignUseCase {
    execute(id: string, dto: EditCampaignRequestDto): Promise<void>;
}

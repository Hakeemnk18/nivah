import type { CampaignView } from "../../types/campaign.type.js";

export interface IGetCampaignByIdUseCase {
    execute(id: string): Promise<CampaignView>;
}

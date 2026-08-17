import type { CampaignView } from "../../types/campaign.type.js";

export interface IGetAllCampaignAdminUseCase {
    execute(): Promise<CampaignView[]>;
}

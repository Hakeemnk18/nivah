import type { UserCampaignView } from "../../types/campaign.type.js";

export interface IGetCampaignBySlugUseCase {
    execute(slug: string): Promise<UserCampaignView | null>;
}

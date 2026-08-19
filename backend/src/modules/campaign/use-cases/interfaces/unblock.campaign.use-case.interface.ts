export interface IUnblockCampaignUseCase {
    execute(id: string): Promise<void>;
}

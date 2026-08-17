export interface IBlockCampaignUseCase {
    execute(id: string): Promise<void>;
}

import { container } from "tsyringe";
import type { ICreateCampaignUseCase } from "../modules/campaign/use-cases/interfaces/create.campaign.use-case.interface.js";
import { CreateCampaignUseCase } from "../modules/campaign/use-cases/create.campaign.use-case.js";
import type { IEditCampaignUseCase } from "../modules/campaign/use-cases/interfaces/edit.campaign.use-case.interface.js";
import { EditCampaignUseCase } from "../modules/campaign/use-cases/edit.campaign.use-case.js";
import type { IBlockCampaignUseCase } from "../modules/campaign/use-cases/interfaces/block.campaign.use-case.interface.js";
import { BlockCampaignUseCase } from "../modules/campaign/use-cases/block.campaign.use-case.js";
import type { IUnblockCampaignUseCase } from "../modules/campaign/use-cases/interfaces/unblock.campaign.use-case.interface.js";
import { UnblockCampaignUseCase } from "../modules/campaign/use-cases/unblock.campaign.use-case.js";
import type { IGetAllCampaignAdminUseCase } from "../modules/campaign/use-cases/interfaces/get.all.campaign.admin.use-case.interface.js";
import { GetAllCampaignAdminUseCase } from "../modules/campaign/use-cases/get.all.campaign.admin.use-case.js";
import type { IGetCampaignBySlugUseCase } from "../modules/campaign/use-cases/interfaces/get.campaign.by.slug.use-case.interface.js";
import { GetCampaignBySlugUseCase } from "../modules/campaign/use-cases/get.campaign.by.slug.use-case.js";
import type { IGetCampaignByIdUseCase } from "../modules/campaign/use-cases/interfaces/get.campaign.by.id.use-case.interface.js";
import { GetCampaignByIdUseCase } from "../modules/campaign/use-cases/get.campaign.by.id.use-case.js";
import type { ICampaignRepository } from "../modules/campaign/repositories/campaign.repository.interface.js";
import { CampaignRepository } from "../modules/campaign/repositories/campaign.repository.js";

export const registerCampaignDependencies = () => {
    container.register<ICampaignRepository>("ICampaignRepository", {
        useClass: CampaignRepository,
    });
    container.register<ICreateCampaignUseCase>("ICreateCampaignUseCase", {
        useClass: CreateCampaignUseCase,
    });
    container.register<IEditCampaignUseCase>("IEditCampaignUseCase", {
        useClass: EditCampaignUseCase,
    });
    container.register<IBlockCampaignUseCase>("IBlockCampaignUseCase", {
        useClass: BlockCampaignUseCase,
    });
    container.register<IUnblockCampaignUseCase>("IUnblockCampaignUseCase", {
        useClass: UnblockCampaignUseCase,
    });
    container.register<IGetAllCampaignAdminUseCase>("IGetAllCampaignAdminUseCase", {
        useClass: GetAllCampaignAdminUseCase,
    });
    container.register<IGetCampaignBySlugUseCase>("IGetCampaignBySlugUseCase", {
        useClass: GetCampaignBySlugUseCase,
    });
    container.register<IGetCampaignByIdUseCase>("IGetCampaignByIdUseCase", {
        useClass: GetCampaignByIdUseCase,
    });
}

import { container } from "tsyringe";
import { BannerRepository } from "../modules/banner/repositories/banner.repository.js";
import { CreateBannerUseCase } from "../modules/banner/use-cases/create.banner.use-case.js";
import { EditBannerUseCase } from "../modules/banner/use-cases/edit.banner.use-case.js";
import { BlockBannerUseCase } from "../modules/banner/use-cases/block.banner.use-case.js";
import { UnblockBannerUseCase } from "../modules/banner/use-cases/unblock.banner.use-case.js";
import { GetBannerUserUseCase } from "../modules/banner/use-cases/get.banner.user.use-case.js";
import { GetBannerAdminUseCase } from "../modules/banner/use-cases/get.banner.admin.use-case.js";
import { GetBannerByIdUseCase } from "../modules/banner/use-cases/get.banner.by.id.use-case.js";
export const registerBannerDependencies = () => {
    container.register("IBannerRepository", {
        useClass: BannerRepository,
    });
    container.register("ICreateBannerUseCase", {
        useClass: CreateBannerUseCase,
    });
    container.register("IEditBannerUseCase", {
        useClass: EditBannerUseCase,
    });
    container.register("IBlockBannerUseCase", {
        useClass: BlockBannerUseCase,
    });
    container.register("IUnblockBannerUseCase", {
        useClass: UnblockBannerUseCase,
    });
    container.register("IGetBannerUserUseCase", {
        useClass: GetBannerUserUseCase,
    });
    container.register("IGetBannerAdminUseCase", {
        useClass: GetBannerAdminUseCase,
    });
    container.register("IGetBannerByIdUseCase", {
        useClass: GetBannerByIdUseCase,
    });
};
//# sourceMappingURL=banner.container.js.map
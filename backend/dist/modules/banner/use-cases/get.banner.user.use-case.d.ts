import type { IGetBannerUserUseCase } from "./interfaces/get.banner.user.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
import type { UserBannerView } from "../types/banner.type.js";
export declare class GetBannerUserUseCase implements IGetBannerUserUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(): Promise<UserBannerView | null>;
}
//# sourceMappingURL=get.banner.user.use-case.d.ts.map
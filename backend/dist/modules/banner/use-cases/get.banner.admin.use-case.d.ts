import type { IGetBannerAdminUseCase } from "./interfaces/get.banner.admin.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
import type { BannerView } from "../types/banner.type.js";
export declare class GetBannerAdminUseCase implements IGetBannerAdminUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(): Promise<BannerView | null>;
}
//# sourceMappingURL=get.banner.admin.use-case.d.ts.map
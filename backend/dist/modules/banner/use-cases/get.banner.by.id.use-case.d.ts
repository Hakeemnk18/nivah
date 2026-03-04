import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
import type { IGetBannerByIdUseCase } from "./interfaces/get.banner.by.id.use-case.interface.js";
import type { BannerView } from "../types/banner.type.js";
export declare class GetBannerByIdUseCase implements IGetBannerByIdUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(id: string): Promise<BannerView>;
}
//# sourceMappingURL=get.banner.by.id.use-case.d.ts.map
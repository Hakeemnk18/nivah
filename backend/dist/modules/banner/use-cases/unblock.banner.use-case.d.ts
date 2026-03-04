import type { IUnblockBannerUseCase } from "./interfaces/unblock.banner.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
export declare class UnblockBannerUseCase implements IUnblockBannerUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=unblock.banner.use-case.d.ts.map
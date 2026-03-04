import type { IBlockBannerUseCase } from "./interfaces/block.banner.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
export declare class BlockBannerUseCase implements IBlockBannerUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=block.banner.use-case.d.ts.map
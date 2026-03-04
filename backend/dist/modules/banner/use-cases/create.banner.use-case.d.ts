import type { ICreateBannerUseCase } from "./interfaces/create.banner.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
import type { CreateBannerRequestDto } from "../dtos/banner.dto.js";
export declare class CreateBannerUseCase implements ICreateBannerUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(dto: CreateBannerRequestDto): Promise<void>;
}
//# sourceMappingURL=create.banner.use-case.d.ts.map
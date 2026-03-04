import type { IEditBannerUseCase } from "./interfaces/edit.banner.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
import type { EditBannerRequestDto } from "../dtos/banner.dto.js";
export declare class EditBannerUseCase implements IEditBannerUseCase {
    private readonly _bannerRepository;
    constructor(_bannerRepository: IBannerRepository);
    execute(id: string, dto: EditBannerRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.banner.use-case.d.ts.map